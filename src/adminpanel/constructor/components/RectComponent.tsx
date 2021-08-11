import { AbstractComponent, ComponentProps, ComponentState, defaultSettings } from "./Component";

export function RealRectComponent(
    defaultValues?: {
        [state: string]: any
    }
) {
    return <RectComponent
        settings={[
            ...defaultSettings,
            {
                name: "background",
                group: "color"
            }
        ]}
        defaultValues={defaultValues}
    />
}

export class RectComponent extends AbstractComponent<ComponentProps, ComponentState> {

    state = {
        ...this.generateState()
    }

    render() {
        return <div
            className="Component"
            style={{
                ...this.defaultStyle(),
                backgroundColor: this.state.settingValues["background"]
            }}
        >
            <div 
            onClick={this.toggleFocus}
            style={{
                ...this.defaultStyle(),
                backgroundColor: "transparent"
            }}
            />
            {this.childrens()}
            {this.state.focused ? this.settingsWindow() : <></>}
        </div>
    }

}