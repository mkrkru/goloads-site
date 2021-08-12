import React, { useState } from "react";
import { start } from "repl";
import { InputType } from "zlib";
import { InputOption } from "../../../common/InputOption";
import { fieldX, fieldY } from "../ConstructorField";
import './Component.css'
import { SingleInput } from "./Inputs";

/**
 * Text - string
 * File - file
 */
export type InputField = "text" | "file"

export const integerParser = (
    min?: number,
    max?: number
) => {
    return {
        canParse: (value: string) => {
            if (!value) return true
            var num = parseInt(value)
            return num !== NaN &&
                (min ? num >= min : true) &&
                (max ? num <= max : true)
        },
        parse: (value: string) => {
            if (!value) return 0
            var parsed = parseInt(value)
            if (parsed === NaN) return min
            return parsed
        }
    }
}

export const coordinateParser = (
    // coordinate : string,
    sizeCoordinate: string,
    max: number,
    min?: number
) => ({
    canParse: (value: any, values: { [state: string]: any }) => {
        if (!value) return true
        var num = parseInt(value)
        return num !== NaN &&
            num >= 0 &&
            (min ? num >= min : true) &&
            num <= max
            - values[sizeCoordinate]
        // - values[coordinate]
    },
    parse: (value: any, _: { [state: string]: any }) => {
        if (!value) return 0
        var parsed = parseInt(value)
        if (parsed === NaN) return 0
        return parsed
    }
})

export type RenderReturn = (JSX.Element | React.Component | Element)
const defaultDirectoryName = "default"
export const defaultSettings: ComponentSettingProps[] = [
    {
        name: "x",
        group: "location",
        inputField: 'text',
        // render: (setSelf, getSelf, _) => {
        //     return <>
        //         <div className="XCoordinateNegative" onClick={() => setSelf(getSelf() - 1)} />
        //         <div className="XCoordinatePositive" onClick={() => setSelf(getSelf() + 1)} />
        //     </>
        // },
        ...(coordinateParser("width", fieldX, 0))
    },
    {
        name: "y",
        group: "location",
        inputField: 'text',
        // render: (setSelf, getSelf, _) => {
        //     return <>
        //         <div className="YCoordinateNegative" onClick={() => setSelf(getSelf() - 1)} />
        //         <div className="YCoordinatePositive" onClick={() => setSelf(getSelf() + 1)} />
        //     </>
        // },
        ...(coordinateParser("height", fieldY, 0))
    },
    {
        name: "z",
        group: "location",
        inputField: 'text',
        ...(integerParser(0))
    },
    {
        name: "width",
        group: "size",
        inputField: 'text',
        ...(coordinateParser("x", fieldX, 1))
    },
    {
        name: "height",
        group: "size",
        inputField: 'text',
        ...(coordinateParser("y", fieldY, 1))
    }
]

export interface ComponentProps {
    settings: ComponentSettingProps[],
    defaultValues?: {
        [state: string]: any
    }
}

export interface ComponentState {
    settingValues: {
        [state: string]: any
    }
    settingDirectories: {
        [directories: string]: number[]
    }
    focused?: boolean
}

export abstract class AbstractComponent<
    T extends ComponentProps,
    V extends ComponentState
    >
    extends React.Component<T, V> {

    readonly cellSize = 40

    constructor(props: T) {
        super(props)
    }

    readonly generateState = (): ComponentState => {
        return {
            settingValues: { ...this.props.defaultValues },
            settingDirectories: (() => {
                var result: { [directories: string]: number[] } = {}
                this.props.settings.forEach((value, index, __) =>
                    result[value.group ? value.group : defaultDirectoryName] ?
                        result[value.group ? value.group : defaultDirectoryName].push(index) :
                        result[value.group ? value.group : defaultDirectoryName] = [index]
                )
                return result
            })()
        }
    }

    readonly defaultStyle = (): React.CSSProperties => {
        return {
            left: this.state.settingValues["x"] * this.cellSize + "px",
            top: this.state.settingValues["y"] * this.cellSize + "px",
            zIndex: this.state.settingValues["z"],
            ...this.realDefaultStyle(),
            border : this.state.focused ? "1px solid red" : "transparent"
        }
    }

    readonly realDefaultStyle = (): React.CSSProperties => {
        return {
            width: this.state.settingValues["width"] * this.cellSize + "px",
            height: this.state.settingValues["height"] * this.cellSize + "px"
        }
    }

    // readonly childrens = (): (RenderReturn | undefined)[] => {
    //     if (this.state.focused) {
    //         return this.props.settings.map((value, index, _) => {
    //             if (value.render) {
    //                 return value.render(
    //                     (setValue) => this.setState((oldState, _) => {
    //                         var copy = Object.assign(Object.create(oldState), oldState)
    //                         copy.settingValues[value.name] = setValue
    //                         return copy
    //                     }),
    //                     () => this.state.settingValues[value.name],
    //                     this
    //                 )
    //             }
    //         })
    //     }
    //     return []
    // }

    readonly toggleFocus = (): void => {
        this.setState((oldState, _) => {
            return {
                ...oldState,
                focused: !oldState.focused
            }
        })
    }

    readonly settingsWindow = (): RenderReturn => {
        return <div
            className="SettingsWindow"
            style={{
                top: this.cellSize + "px",
                left: this.cellSize + "px"
            }}
        >
            {
                (() => {
                    var array: RenderReturn[] = []
                    console.log(this.state);

                    for (const key in this.state.settingDirectories) {
                        array.push(
                            <SettingsDirectory
                                values={this.state.settingValues}
                                name={key}
                                setValue={(name, value) => this.setState((oldState, _) => {
                                    var newObject: any = { ...oldState }
                                    newObject.settingValues[name] = value
                                    console.log(newObject);
                                    return newObject
                                })}
                                settings={
                                    this.state.settingDirectories[key].map((value, _, __) =>
                                        this.props.settings[value]
                                    )
                                }
                            />
                        )
                    }
                    return array
                })()
            }
        </div>
    }

}

export interface ComponentSettingProps {
    name: string
    group?: string
    tabs?: InputOption[]
    isAvailableAnother?: boolean
    inputField?: InputField
    // render?: (
    //     setSelf: (value: any) => void,
    //     getSelf: () => any,
    //     component: AbstractComponent<any, any>
    // ) => RenderReturn
    parse?: (value: any, values: { [state: string]: any }) => any | Promise<any> // If promise then function is async
    canParse?: (value: any, values: { [state: string]: any }) => boolean
}

function SettingsDirectory(props: {
    name: string,
    settings: ComponentSettingProps[],
    values: {
        [state: string]: any
    },
    setValue: (name: string, value: any) => void
}) {
    const [state, setState] = useState({
        hidden: false
    })

    if (state.hidden) {
        return (
            <div
                className="SettingsDirectory"
                onClick={() => setState({
                    hidden: false
                })}
            >
                <span className="SettingsDirectoryTitle">
                    {">" + props.name}
                </span>
            </div>
        )
    }
    return (
        <div
            className="SettingsDirectory"
        >
            <span
                className="SettingsDirectoryNotHidden SettingsDirectoryTitle"
                onClick={() => setState({
                    hidden: true
                })}
            >
                {"> " + props.name}
            </span>
            <div className="SettingsDirectoryContainer">
                <div className="SettingsDirectoryContainerBorder">
                    {
                        props.settings.map((value, index, __) => <div
                            className="SettingsDirectoryContainerDataName"
                            key={index}
                        >
                            {value.name}
                        </div>
                        )
                    }
                </div>
                <div className="SettingsDirectoryContainerData">
                    {props.settings.map((setting, index, __) => {
                        var inputProps : any = {
                            component: setting,
                            callback: (callbackValue : any) => {
                                if (!setting.canParse || setting.canParse(callbackValue, props.values)) {
                                    var parsed = setting.parse ? setting.parse(callbackValue, props.values) : callbackValue
                                    if (parsed instanceof Promise) {
                                        parsed.then((value) => props.setValue(setting.name, value))
                                        return callbackValue
                                    }
                                    else {
                                        props.setValue(setting.name, parsed)
                                        return parsed
                                    }
                                }
                                return undefined
                            },
                            value: props.values[setting.name],
                            key: index
                        }
                        if (setting.inputField == 'file') {
                            return <FileInput {...inputProps}/>
                        }
                        // else text
                        return <TextInput {...inputProps}/>
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export interface InputProps {
    callback: (value: any) => any | undefined
    component: ComponentSettingProps,
    value: any
}

function TextInput(props: InputProps) {
    const [state, setState] = useState({
        inputValue: props.value,
        error: false
    })
    return (
        <div className="Settings">
            <SingleInput
                menuIsOpen={false}
                inputValue={state.inputValue !== undefined ? state.inputValue.toString() : ""}
                placeholder=""
                isClearable
                callback={(_) => {
                    // console.log(value);
                    // setState({ inputValue: state.inputValue, right: props.callback(value.value) })
                }}
                callbackInputChange={(value, meta) => {
                    // console.log(value, meta);
                    if (meta.action != 'menu-close' && meta.action != 'input-blur') {
                        var callbackValue = props.callback(value)
                        if (callbackValue !== undefined) {
                            setState({ inputValue: callbackValue, error: false })
                        }
                        else {
                            setState({ inputValue: value, error: true })
                        }
                    }
                }}
            />
        </div>
    )
}

function FileInput(props: InputProps) {
    const [state, setState] = useState({
        failed: false
    })
    return (
        <div className="FileInputContainer">
            <input
                type="File"
                className="FileInput"
                style={{
                    backgroundColor: state.failed ? "tomato" : "white"
                }}
                onChange={(event) => {
                    var callbackValue = props.callback(event.target.files)
                    if (callbackValue === undefined) {
                        setState({ failed: true })
                    }
                    else {
                        setState({ failed: false })
                    }
                }}
            />
            Upload file
        </div>
    )
}

export const inputFields: {
    [state: string]: (props: InputProps) => RenderReturn
} = {
    text: (props: InputProps) => <TextInput {...props} />,
    file: (props: InputProps) => <FileInput {...props} />
}