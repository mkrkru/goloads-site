import React from 'react';
import './Common.css';

interface ShadowTextProps {
    children : JSX.Element
    style ?: React.CSSProperties
}

export class ShadowText extends React.Component<ShadowTextProps> {
    
    render() {
        return <div 
        className = "Shadow-text" 
        style = {this.props.style}>
            {this.props.children}
        </div>
    }

}