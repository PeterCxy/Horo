export interface LoginDetails {
    server: string
    port: number // 1-65535
    nick: string
    channels: string[]
    secure: boolean
}