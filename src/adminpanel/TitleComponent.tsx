import React from 'react'
import { ShadowText } from '../common/ShadowText'
import './Layout.css'

interface TitleProps {
    title : string
}

export class Title extends React.Component<TitleProps> {

    render() {
        return <span className="AdminLayoutTitle">
            <strong>{this.props.title}</strong>
        </span>
    }

}