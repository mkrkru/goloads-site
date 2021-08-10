import React from "react";
import { base64encode, bytesToBase64 } from "../../base64";
import { getExtension } from "../../files";
import './BannerConstructor.css';

interface BannerConstructorDropProps {
    callbackDrop: (file: File) => void
}

export class BannerConstructorDrop extends React.Component<BannerConstructorDropProps> {

    drop(event: React.DragEvent) {
        event.preventDefault();
        var file : File | null = null
        if (event.dataTransfer.items) {
            file = event.dataTransfer.items[0].getAsFile()
        } else {
            file = event.dataTransfer.files[0]
        }
        if (file === null) {
            throw new Error("Bad file")
        }
        this.props.callbackDrop(file)
    }

    render() {
        return <div
            className="BannerConstructorDrop Flex-Center"
            onDrop={e => this.drop(e)}
            onDragOver={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
        >
            Drag and drop to upload
        </div>
    }

}