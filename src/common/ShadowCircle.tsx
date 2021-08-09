import React from 'react';
import './Common.css';

interface ShadowProps {
    style? : React.CSSProperties
    width : string
    height : string
    children? : JSX.Element
}

export class ShadowCircle extends React.Component<ShadowProps> {

    render() {
        // console.log(this.props.children);
        return <div className = "Circle Shadow" style = {{
            width : this.props.width,
            height : this.props.height,
            ...this.props.style
        }}>{this.props.children}</div>
    }

}