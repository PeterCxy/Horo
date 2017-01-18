import { getString as lang } from "../util/Lang"
import * as Electron from "electron"
import * as path from "path"
import { Globals } from "./App"

export class LoginDialog {
    private bWindow: Electron.BrowserWindow 
    constructor() {
        Electron.ipcMain.once("LOGIN_REQUEST_DETAILS", (event, args) => {
            event.sender.send("LOGIN_REQUEST_DETAILS", JSON.stringify(Globals.LOGIN))
        })
    }
    show() {
        this.bWindow = new Electron.BrowserWindow({ width: 400, height: 600, show: false})
        this.bWindow.setMenu(null)
        this.bWindow.loadURL("file://" + path.join(__dirname, "../../html/login/index.html"))
        this.bWindow.once("ready-to-show", () => {
            this.bWindow.setTitle(lang("LOGIN_LOGIN"))
            this.bWindow.show()
            this.bWindow.webContents.toggleDevTools()
        })
    }
}