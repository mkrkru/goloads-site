import React from "react";
import { fetchBannerBuffer } from "../../back/Banner";
import { base64encode, bytesToBase64 } from "../../base64";
import './BannerConstructor.css';

interface BannerConstructorDropProps {



}

export class BannerConstructorDrop extends React.Component {

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
        console.log(arrayBufferPromise)
        arrayBufferPromise
            .then(arrayBuffer => {
                fetchBannerBuffer({
                    url : "https://www.google.com",
                    image : arrayBuffer,
                    domains : [
                        "https://www.yandex.ru"
                    ]
                }, (response) => console.log("HI321"))
            })
    }

    render() {
        return <div
            className="BannerConstructorDrop"
            onDrop={this.drop} 
            onDragOver={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}    
        />
    }

}