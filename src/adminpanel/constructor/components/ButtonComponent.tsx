import React from 'react'
import { AbstractComponent, ComponentProps, ComponentState, defaultSettings, integerParser } from './Component';

export function RealButtonComponent(props: {
    [value: string]: any
}) {

    return <ButtonComponent
        defaultValues = {props}
        settings = {[
            ...defaultSettings,
            {
                name : "borderRadius",
                group : "size",
                ...(integerParser(0)),
                inputField: 'text'
            },
            {
                name: "background",
                group: "color",
                inputField: 'text'
            },
            {
                name : 'redirect',
                group : 'click',
                inputField : 'text'
            }
        ]}
    />

}

export class ButtonComponent extends AbstractComponent<ComponentProps, ComponentState> {

    state = {
        ...this.generateState()
    }

    render() {
        return <div
            className="Component"
            style={{
                ...this.defaultStyle(),
                borderRadius: this.state.settingValues["borderRadius"] + "px",
                backgroundColor: this.state.settingValues["background"]
            }}
        >
            <div
                className="RealComponent"
                style={{
                    ...this.realDefaultStyle()
                }}
                onClick={() => this.toggleFocus()}
            />
            {this.state.focused ? this.settingsWindow() : <></>}
        </div>
    }

}