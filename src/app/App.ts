import { app } from "electron"
import { LoginDetails } from "../util/DataTypes"
import { UserData } from "../util/UserData"
import { Observable } from "rxjs/Rx"
import { LoginDialog } from "./LoginDialog"

export module App {
    export function main() {
        // Main entry of the main process
        app.on("window-all-closed", () => {
            app.quit() // TODO: Add dock icon and background feature.
        })
        Observable.fromEvent(app, "window-all-closed")
            .subscribe(null, null, () => app.quit())
        Observable.fromEvent(app, "ready")
            .flatMap (() => UserData.config<LoginDetails>("login"))
            .subscribe((data) => {
                Globals.LOGIN = data
                if (Globals.LOGIN == null || Globals.LOGIN.nick == "") {
                    // Need Login.
                    // TODO: Show login dialog also if login failed.
                    showLoginDialog()
                } else {
                    showMainWindow()
                }
            }, (err) => {
                Globals.LOGIN = {
                    server: "irc.freenode.net",
                    port: 6697,
                    nick: "",
                    channels: [],
                    secure: true
                }
                showLoginDialog()
            })
    }

    export function showLoginDialog() {
        new LoginDialog().show()
    }

    export function showMainWindow() {

    }
}

export module Globals {
    export var LOGIN: LoginDetails = null
}