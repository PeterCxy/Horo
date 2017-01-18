export function getString(key: string) {
    // TODO: Multi-lang support
    return DEFAULT_LANG[key]
}

interface Lang {
    [key: string]: string
}

const DEFAULT_LANG: Lang = {
    // Login Page
    "LOGIN_LOGIN": "Login",
    "LOGIN_SERVER": "IRC Server",
    "LOGIN_PORT": "Port",
    "LOGIN_NICK": "Nickname",
    "LOGIN_SECURE": "SSL"
}