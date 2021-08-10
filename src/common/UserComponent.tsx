import React from 'react';
import './Common.css';

interface UserComponentProps {
    className?: string
    icon : string
}   

export class UserComponent extends React.Component<UserComponentProps> {

    render() {
        return <img
        className = {"Circle UserHeader " + this.props.className} 
        src={this.props.icon}
        /> 
    }

}