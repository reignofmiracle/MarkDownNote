import { dialog } from "electron"

function showSaveAsNewFileDialog() {
    return new Promise((resolve, reject) => {
        const file = dialog.showSaveDialog(
            {
                title: "save",
                filters: [{name: "mardown file", extensions: ["md"]}]
            }
        )
        if (file) {
            resolve(file)            
        }
        else {
            reject()
        }
    })
}

export default showSaveAsNewFileDialog