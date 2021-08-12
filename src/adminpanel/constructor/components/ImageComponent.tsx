import React from 'react';
import { AbstractComponent, ComponentProps, ComponentState, defaultSettings } from './Component';

export const imageParser = (
    base64?: boolean
) => ({
    canParse: (value: FileList, values: { [state: string]: any }) => {
        return value.length > 0 ? value[0].type.startsWith('image/') : false
    },
    parse: (fileList: FileList, values: { [state: string]: any }) => {
        var file = fileList[0]
        if (base64) {
            return new Promise<String | ArrayBuffer>((resolve, reject) => {
                let fileReader = new FileReader();
                fileReader.onload = (event) => {
                    event?.target?.result ?
                        resolve(event.target.result) :
                        reject(new Error("Result is null"))
                };
                fileReader.readAsDataURL(file);
            })
        }
        return file.arrayBuffer() // Promise<ArrayBuffer>
    }
})

export function RealImageComponent(props: {
    [value: string]: any
}) {
    return <ImageComponent
        defaultValues={props}
        settings={[
            ...defaultSettings,
            {
                name: "image",
                group: "image",
                inputField: 'file',
                ...(imageParser(true))
            }
        ]}
    />
}

export class ImageComponent extends AbstractComponent<ComponentProps, ComponentState> {

    state = {
        ...this.generateState()
    }

    render() {
        return (
            <div
                className="Component"
                style={{
                    ...this.defaultStyle()
                }}
            >
                <img
                    className="RealComponent"
                    style={{
                        ...this.realDefaultStyle(),
                    }}
                    onClick={() => this.toggleFocus()}
                    src={this.state.settingValues["image"]}
                />
                {this.state.focused ? this.settingsWindow() : <></>}
            </div>
        )
    }

}