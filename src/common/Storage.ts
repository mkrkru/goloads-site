import cookie from 'cookie_js';

export interface TelegramUser {
    id: number
    photo_url: string
}

export function isTelegramUserDefined(): boolean {
    return getTelegramUser() !== undefined
}

export function isUserCookieDefined(): boolean {
    return getUserCookie() !== undefined
}

export function isTelegramIconDefined(): boolean {
    return getTelegramIcon() !== undefined
}

export function isAllDefined(): boolean {
    return isTelegramUserDefined()
        //&& isUserCookieDefined()
        && isTelegramIconDefined()
}

export function getTelegramUser(): number {
    return cookie.get("tg_user");
}

export function getTelegramIcon(): string {
    return cookie.get("tg_icon")
}

export function getUserCookie(): string {
    return cookie.get("user_cookie")
}

export function setTelegramId(id: number) {
    sessionStorage.tg_user = id;
    cookie.set("tg_user", id)
}

export function setTelegramIcon(icon: string) {
    cookie.set("tg_icon", icon)
}

export function setUserCookie(userCookie: string) {
    cookie.set("user_cookie", userCookie)
}

export function setTelegramUser(telegramUser: TelegramUser) {
    setTelegramId(telegramUser.id)
    setTelegramIcon(telegramUser.photo_url)
}
