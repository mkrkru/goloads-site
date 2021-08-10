import cache from 'js-cache';

export interface TelegramUser {
    id : number
    photo_url : string
}

export function isTelegramUserDefined() : boolean{
    return cache.get("tg_user") !== undefined
}

export function getTelegramUser() : number {
    return cache.get("tg_user")
}

export function getTelegramIcon() : string {
    return cache.get("tg_icon")
}

export function setTelegramId(id : number) {
    cache.set("tg_user", id)
}

export function setTelegramIcon(icon : string) {
    cache.set("tg_icon", icon)
}

export function setTelegramUser(telegramUser : TelegramUser) {
    setTelegramId(telegramUser.id)
    setTelegramIcon(telegramUser.photo_url)
}