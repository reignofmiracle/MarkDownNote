import fs from "fs"

class FileManager {

    constructor() {
        this.filePath = ""
    }

    saveFile(filePath, text) {
        return new Promise((resolve) => {
            fs.writeFileSync(filePath, text)
            this.filePath = filePath
            resolve()
        })
    }

    readFile(filePath) {
        return new Promise((resolve) => {
            const text = fs.readFileSync(filePath, "utf8")
            this.filePath = filePath
            resolve(text)
        })
    }

    overwriteFile(text) {
        return new Promise((resolve) => {
            this.saveFile(this.filePath, text).then(resolve())
        })
    }

    closeFile() {
        return new Promise((resolve) => {
            this.filePath = ""            
        })
    }
}

function createFileManager() {
    return new FileManager()
}

export default createFileManager