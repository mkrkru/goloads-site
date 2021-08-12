import React from 'react';
import { AbstractComponent, RenderReturn } from './components/Component';
import { RealImageComponent } from './components/ImageComponent';
import { RealRectComponent } from './components/RectComponent';
import './Constructor.css'
import { ConstructorComponentsList } from './ConstructorComponentsList';
import { ConstructorField } from './ConstructorField';

function getHeight() {
    return window.innerHeight - 91;
}

interface ConstructorComponentState {
    components : RenderReturn[]
}

export class ConstructorComponent extends React.Component<{}, ConstructorComponentState> {

    state = {
        components : []
    }

    render() {
        return <div
            className="Constructor"
            style={{
                maxHeight: getHeight() + "px"
            }}
        >
            <div
                style={{
                    height: getHeight() + "px"
                }}
                className="ConstructorField"
            >
                <ConstructorField
                    components={this.state.components}
                />
            </div>
            <ConstructorComponentsList
                elements={[
                    {
                        createNew: () => <RealRectComponent
                            x={0}
                            y={0}
                            width={1}
                            height={1}
                            background="white"
                        />,
                        title : "Rectangle",
                        example : <div style={{width: "100%", height:"inherit", backgroundColor:"cyan"}}/>
                    },
                    {
                        createNew: () => <RealImageComponent
                            x={0}
                            y={0}
                            width={1}
                            height={1}
                            image="https://i.ytimg.com/vi/XPslNL9Ysfw/maxresdefault.jpg"
                        />,
                        title: "Image",
                        example : <img style={{width: "100%", height:"inherit"}} src="https://i.ytimg.com/vi/XPslNL9Ysfw/maxresdefault.jpg"/>
                    }
                ]}
                callbackAdd = {(render) => this.setState((oldState, _) => {
                    var newArray = Array.from(oldState.components)
                    newArray.push(render)
                    return {
                        components : newArray
                    }
                })}
            />
        </div>
    }

}