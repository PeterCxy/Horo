import * as fs from "fs"
import * as appdirs from "appdirs"
import * as mkdirp from "mkdirp"
import { FileSystem } from "./rx/FileSystem"
import { Observable } from "rxjs/Rx"

const APP_NAME = "Horo"
const APP_AUTHOR = "PeterCxy"
const APP_VERSION: string = require("../../package.json").version

const CONFIG_DIR = appdirs.userConfigDir(APP_NAME, APP_AUTHOR)
const DATA_DIR = appdirs.userDataDir(APP_NAME, APP_AUTHOR)

function checkDir(dir: string) {
    if (!fs.existsSync(dir)) {
        mkdirp.sync(dir)
    }
}

checkDir(CONFIG_DIR)
checkDir(DATA_DIR)

export module UserData {
    export function config<T>(name: string): Observable<T> {
        let filename = `${CONFIG_DIR}/${name}.json`
        return FileSystem.exists(filename)
            .flatMap((exists) => {
                if (!exists) {
                    throw new Error(`Config ${filename} does not exist`)
                } else {
                    return FileSystem.readFile(filename, "utf8")
                }
            })
            .map((data: string) => <T>JSON.parse(data))
    }
}