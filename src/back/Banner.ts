export interface Banner {
    url : string,
    domains : string[]
}

export function fetchBanner(banner : Banner, fn : (response : any) => void) {
    promiseBanner(banner).then(fn)
}

export function promiseBanner(buffer : Banner) : Promise<any> {
    return fetch('https://doats.ml:8080/add', {
        method : "POST",
        headers : {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body : JSON.stringify({
            url : buffer.url,
            domains : buffer.domains
        })
    })
}

export function sendBannerImage(image : ArrayBuffer, type : string, fn : (response : any) => void) {
    promiseBannerImage(image, type).then(fn)
}

export async function promiseBannerImage(image : ArrayBuffer, type : string) : Promise<any> {
    var request = new XMLHttpRequest()
    request.open("POST", "https://doats.ml:8080/add/image", false)
    request.setRequestHeader("Access-Control-Allow-Origin", "*")
    request.setRequestHeader("Accept", "application/json")
    request.setRequestHeader("Content-type", `image/${type}`)
    request.send(image)
    return new Promise(request.response)
}