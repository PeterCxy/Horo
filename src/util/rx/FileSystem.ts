import * as fs from "fs"
import { Observable, Observer } from "rxjs/Rx"

export module FileSystem {
    export function exists(path: string | Buffer): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            fs.exists(path, (exists) => {
                observer.next(exists)
                observer.complete()
            })
        })
    }
    export function readFile(filename: string, encoding?: string): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            fs.readFile(filename, encoding, (err, data) => {
                if (err != null) {
                    observer.error(err)
                } else {
                    observer.next(data)
                    observer.complete()
                }
            })
        })
    }
}