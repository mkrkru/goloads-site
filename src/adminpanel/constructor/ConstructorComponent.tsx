import React from 'react';
import { AbstractComponent } from './components/Component';
import { RealRectComponent } from './components/RectComponent';
import './Constructor.css'
import { ConstructorField } from './ConstructorField';

function getHeight() {
    return window.innerHeight - 91;
}

export class ConstructorComponent extends React.Component {

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
                    components={[
                        <RealRectComponent
                            x={0}
                            y={0}
                            width={1}
                            height={1}
                            background="cyan"
                        />
                    ]}
                />
            </div>
            <div className="ConstructorComponents">

            </div>
        </div>
    }

}