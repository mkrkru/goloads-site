import cookie from 'cookie_js'; 

export interface TelegramUser {
    id : number
    photo_url : string
}

export function isTelegramUserDefined() : boolean{
    return cookie.get("tg_user") !== undefined
}

export function getTelegramUser() : number {
    return cookie.get("tg_user")
}

export function getTelegramIcon() : string {
    return cookie.get("tg_icon")
}

export function setTelegramId(id : number) {
    cookie.set("tg_user", id, { path: "/" })
}

export function setTelegramIcon(icon : string) {
    cookie.set("tg_icon", icon, { path: "/" })
}

export function setTelegramUser(telegramUser : TelegramUser) {
    setTelegramId(telegramUser.id)
    setTelegramIcon(telegramUser.photo_url)
}