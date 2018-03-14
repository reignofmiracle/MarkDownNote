import { app, console } from "electron"
import createMainWindow from "./createMainWindow"
import setAppMenu from "./setAppMenu"
import createFileManager from "./createFileManager"
import showSaveAsNewFileDialog from "./showSaveAsNewFileDialog"
import showOpenFileDialog from "./showOpenFileDialog"

let mainWindow = null
let fileManager = null

function openFile() {
    showOpenFileDialog()
        .then((filePath) => fileManager.readFile(filePath))
        .then((text) => mainWindow.sendText(text))
        .catch((error) => {
            console.log(error)
        })
}

function saveFile() {
    if (!fileManager.filePath) {
        saveAsNewFile()
    }
    mainWindow.requestText()
        .then((text) => fileManager.overwriteFile(text))
        .catch((error) => {
            console.log(error)
        })
}

function saveAsNewFile() {
    return Promise.all([showSaveAsNewFileDialog(), mainWindow.requestText()])
        .then(([filePath, text]) => fileManager.saveFile(filePath, text))
        .catch((error) => {
            console.log(error)
        })
}

function closeFile() {
    if (fileManager.filePath) {
        fileManager.closeFile()
        mainWindow.sendText("")
    }
}

app.on("ready", () => {
    mainWindow = createMainWindow()
    fileManager = createFileManager()
    setAppMenu({ openFile, saveFile, saveAsNewFile, closeFile })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", (_e, hasVisibleWindows) => {
    if (!hasVisibleWindows) {
        mainWindow = createMainWindow()
    }
})