import React from "react";
import { fetchBannerBuffer } from "../../back/Banner";
import { base64encode, bytesToBase64 } from "../../base64";
import './BannerConstructor.css';

interface BannerConstructorDropProps {
    callbackDrop : (arrayBuffer : ArrayBuffer) => void
}

export class BannerConstructorDrop extends React.Component<BannerConstructorDropProps> {

    drop(event: React.DragEvent) {
        event.preventDefault();
        var arrayBufferPromise : Promise<ArrayBuffer>
        var arrayBufferPromiseNullable : unknown
        console.log(event.dataTransfer)
        if (event.dataTransfer.items) {
            arrayBufferPromiseNullable = event.dataTransfer.items[0].getAsFile()?.arrayBuffer()
            if (arrayBufferPromiseNullable) {
                arrayBufferPromise = arrayBufferPromiseNullable as Promise<ArrayBuffer>
            }
            else {
                throw new Error("Bad file")
            }
        } else {
            arrayBufferPromiseNullable = event.dataTransfer.files[0].arrayBuffer()
            if (arrayBufferPromiseNullable) {
                arrayBufferPromise = arrayBufferPromiseNullable as Promise<ArrayBuffer>
            }
            else {
                throw new Error("Bad file")
            }
        }
        arrayBufferPromise.then(arrayBuffer => this.props.callbackDrop(arrayBuffer))
    }

    render() {
        return <div
            className="BannerConstructorDrop"
            onDrop={e => this.drop(e)} 
            onDragOver={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}    
        />
    }

}