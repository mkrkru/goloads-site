import React from 'react';

export interface ConstructorCellProps {
    isFloating ?: boolean
    callbackHoverEnter ?: (event : React.MouseEvent) => void
    callbackHoverEnd ?: (event : React.MouseEvent) => void
}

const floatingColor = "#0011FF"
const notFloatingColor = "inherit"

export class ConstructorCell extends React.Component<ConstructorCellProps> {
    
    render() {
        return <div 
        className = "ConstructorCell"
        style = {{
            backgroundColor : this.props.isFloating ? floatingColor : notFloatingColor
        }}
        onMouseOver = {(event) => {
            if (this.props.callbackHoverEnter) this.props.callbackHoverEnter(event)
        }}
        onMouseOut = {(event) => {
            if (this.props.callbackHoverEnd) this.props.callbackHoverEnd(event)
        }}
        />
    }

}