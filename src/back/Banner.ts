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
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            url : buffer.url,
            domains : buffer.domains
        })
    }).then(response => response.json())
}

export function sendSyncBannerImage(image : ArrayBuffer, type : string, id : string, fn : (response : any) => void) : any {
    var request = new XMLHttpRequest()
    request.open("POST", `https://doats.ml:8080/add/image?id=${id}`, false)
    request.onload = () => {
        fn(request.response)
    }
    request.setRequestHeader("Access-Control-Allow-Origin", "*")
    request.setRequestHeader("Accept", "application/json")
    request.setRequestHeader("Content-Type", `image/${type}`)
    request.send(image)
}