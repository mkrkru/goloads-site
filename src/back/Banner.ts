import { bytesToBase64 } from "../base64";

export interface Banner {
    url : string,
    image : string,
    domains : string[]
}

export function fetchBanner(banner : Banner, fn : (response : any) => void) {
    promiseBanner(banner).then(fn)
}

function promiseBanner(buffer : Banner) : Promise<any> {
    return fetch('https://doats.ml:8080/add', {
        method : "POST",
        headers : {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body : JSON.stringify(buffer)
    })
}