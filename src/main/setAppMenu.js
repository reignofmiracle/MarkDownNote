import { app, Menu, BrowserWindow } from "electron"

function setAppMenu(options) {
    const template = [
        {
            label: "File",
            submenu: [
                { label: "Open", accelerator: "CmdOrCtrl+O", click: () => options.openFile() },
                { label: "Save", accelerator: "CmdOrCtrl+S", click: () => options.saveFile() },
                { label: "Save As", click: () => options.saveAsNewFile() },
                { label: "Close", click: () => options.closeFile() }
            ]
        },
        {
            label: "DevTools",
            submenu: [
                {
                    label: "Toggle DevTools",
                    click: () => BrowserWindow.getFocusedWindow().toggleDevTools()
                }
            ]
        }
    ]

    if (process.platform === "darwin") {
        template.unshift(
            {
                label: "MarkdownNote",
                submenu: [
                    { label: "Quit", accelerator: "CmdOrCtrl+Q", click: () => app.quit() }
                ]
            }
        )
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

export default setAppMenu