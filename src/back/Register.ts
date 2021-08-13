import { setUserCookie } from "../common/Storage";

export interface TelegramCallbackUser {
    authDate: number,
    firstName: string,
    lastName: string,
    hash: string,
    id: number,
    photoUrl: string,
    username: string
}

export function toTelegramCallbackUser(user: any): TelegramCallbackUser {
    return {
        authDate: user.auth_date,
        firstName: user.first_name,
        lastName: user.last_name,
        hash: user.hash,
        id: user.id,
        photoUrl: user.photo_url,
        username: user.username
    }
}

export function promiseCallbackUser(user: TelegramCallbackUser): Promise<any> {
    return fetch("https://doats.ml:8080/register", {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return null;
        })
        .then(response => setUserCookie(response.userCookie))
        ;
}