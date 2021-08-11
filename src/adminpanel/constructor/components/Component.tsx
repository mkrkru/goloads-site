import React, { useState } from "react";
import { start } from "repl";
import { InputOption } from "../../../common/InputOption";
import { fieldX, fieldY } from "../ConstructorField";
import './Component.css'
import { SingleInput } from "./Inputs";

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

export type RenderReturn = (JSX.Element | React.Component | Element)
const defaultDirectoryName = "default"
export const defaultSettings: ComponentSettingProps[] = [
    {
        name: "x",
        group: "location",
        render: (setSelf, getSelf, _) => {
            return <>
                <div className="XCoordinateNegative" onClick={() => setSelf(getSelf() - 1)} />
                <div className="XCoordinatePositive" onClick={() => setSelf(getSelf() + 1)} />
            </>
        },
        ...(integerParser(0, fieldX - 1))
    },
    {
        name: "y",
        group: "location",
        render: (setSelf, getSelf, _) => {
            return <>
                <div className="YCoordinateNegative" onClick={() => setSelf(getSelf() - 1)} />
                <div className="YCoordinatePositive" onClick={() => setSelf(getSelf() + 1)} />
            </>
        },
        ...(integerParser(0, fieldY - 1))
    },
    {
        name: "z",
        group: "location",
        ...(integerParser(0))
    },
    {
        name: "width",
        group: "size",
        ...(integerParser(1, fieldX - 1))
    },
    {
        name: "height",
        group: "size",
        ...(integerParser(1, fieldY - 1))
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
            width: this.state.settingValues["width"] * this.cellSize + "px",
            height: this.state.settingValues["height"] * this.cellSize + "px",
        }
    }

    readonly childrens = (): (RenderReturn | undefined)[] => {
        if (this.state.focused) {
            return this.props.settings.map((value, index, _) => {
                if (value.render) {
                    return value.render(
                        (setValue) => this.setState((oldState, _) => {
                            var copy = Object.assign(Object.create(oldState), oldState)
                            copy.settingValues[value.name] = setValue
                            return copy
                        }),
                        () => this.state.settingValues[value.name],
                        this
                    )
                }
            })
        }
        return []
    }

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
    render?: (
        setSelf: (value: any) => void,
        getSelf: () => any,
        component: AbstractComponent<any, any>
    ) => RenderReturn
    parse?: (value: string) => any
    canParse?: (value: string) => boolean
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
                {">" + props.name}
            </div>
        )
    }
    return (
        <div
            className="SettingsDirectory"
        >
            <span
                className="SettingsDirectoryNotHidden"
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
                    {props.settings.map((value, index, __) => <SettingInput
                        component={value}
                        callback={(callbackValue) => {
                            if (!value.canParse || value.canParse(callbackValue)) {
                                var parsed = value.parse ? value.parse(callbackValue) : callbackValue
                                props.setValue(value.name, parsed)
                                return parsed
                            }
                            return undefined
                        }}
                        value={props.values[value.name]}
                        key={index}
                    />
                    )}
                </div>
            </div>
        </div>
    )
}

function SettingInput(props: {
    callback: (value: string) => any | undefined
    component: ComponentSettingProps,
    value: any
}) {

    const [state, setState] = useState({
        inputValue: props.value
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
                    console.log(value, meta);
                    
                    if (meta.action != 'menu-close' && meta.action != 'input-blur') {
                        var callbackValue = props.callback(value)
                        if (callbackValue !== undefined) {
                            setState({ inputValue: callbackValue })
                        }
                    }
                }}
            />
        </div>
    )
}