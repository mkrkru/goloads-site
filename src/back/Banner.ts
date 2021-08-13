import { getTelegramUser, getUserCookie, setUserCookie } from "../common/Storage"

export interface Banner {
    url: string,
    domains: string[]
}

export interface ResponseBanner {
    redirect : string,
    id : string,
    domains: string[],
    image : string
}

export function fetchBanner(banner: Banner, fn: (response: any) => void) {
    promiseBanner(banner).then(fn)
}

export function promiseBanner(buffer: Banner): Promise<any> {
    return fetch('https://doats.ml:8080/add', {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tgId: getTelegramUser(),
            userCookie: getUserCookie(),
            url: buffer.url,
            domains: buffer.domains
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return null
        })
        .then(response => setUserCookie(response.userCookie))
}

export function sendSyncBannerImage(image: ArrayBuffer, type: string, id: string, fn: (response: any) => void): any {
    var request = new XMLHttpRequest()
    request.open("POST", `https://doats.ml:8080/add/image?id=${id}`, false)
    request.onload = () => {
        fn(request.response)
    }
    request.setRequestHeader("Access-Control-Allow-Origin", "*")
    request.setRequestHeader("Accept", "application/json")
    request.setRequestHeader("Content-Type", `image/${type}`)
    request.setRequestHeader('tg-id', getTelegramUser().toString())
    request.setRequestHeader('user-cookie', getUserCookie())
    request.send(image)
}

export function promiseBanners(): Promise<ResponseBanner[]> {
    return fetch("https://doats.ml:8080/banners", {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "tg-id": getTelegramUser().toString(),
            "user-cookie": getUserCookie()
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return null
        })
        .then(response => {
            setUserCookie(response.userCookie)
            return response.banners
        })
}