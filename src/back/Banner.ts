import { bytesToBase64 } from "../base64";

export interface Banner {
    url : string,
    image : string,
    domains : string[]
}

export interface BannerBuffer {
    url : string,
    image : ArrayBuffer,
    domains : string[]
}

export function toBanner(bannerBuffer : BannerBuffer) : Banner {
    return {
        url : bannerBuffer.url,
        image : bytesToBase64(new Array(bannerBuffer.image)),
        domains : bannerBuffer.domains
    }
}

export function fetchBannerBuffer(buffer : BannerBuffer, fn : (response : any) => void) {
    fetchBanner(toBanner(buffer), fn)
}

export function fetchBanner(banner : Banner, fn : (response : any) => void) {
    promiseBanner(banner).then(fn)
}

function promiseBanner(buffer : Banner) : Promise<any> {
    return fetch('http://192.168.239.18:8080/banner', {
        method : "POST",
        headers : {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body : JSON.stringify(buffer)
    })
}