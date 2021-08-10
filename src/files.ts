export function getExtension(path: string): string {
    let baseName = path.split(/[\\/]/).pop()
    if (!baseName) throw new Error("Bad path")
    let pos = baseName.lastIndexOf(".");
    if (baseName === "" || pos < 1)
        return "";
    return baseName.slice(pos + 1);
}

export function loadFile(buffer : ArrayBuffer) : Array<number> {
    var uint8Array = new Uint8Array(buffer)
    var end = new Array(uint8Array.length);
    uint8Array.forEach(byte => end.push(byte))
    return end
}