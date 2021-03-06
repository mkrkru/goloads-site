import React from 'react';
import { RenderReturn } from './components/Component';

interface ConstructorComponentsListProps {
    elements: ConstructorComponentListElement[]
    callbackAdd: (render: RenderReturn) => void
}

export interface ConstructorComponentListElement {
    title: string
    example: RenderReturn
    createNew: () => RenderReturn
}

export class ConstructorComponentsList extends React.Component<ConstructorComponentsListProps> {

    render() {
        return <div className="ConstructorComponents">
            {
                this.props.elements.map((value, index, __) => {
                    return <div
                        key={index}
                        className="ConstructorComponentsElement FlexCenter"
                        onClick={() => {
                            this.props.callbackAdd(value.createNew())
                        }}
                    >
                        <div className="ConstructorComponentsElementExample">
                            {value.example}
                        </div>
                        <div className="ConstructorComponentsElementTitle">
                            {value.title}
                        </div>
                    </div>
                })
            }
        </div>
    }

}