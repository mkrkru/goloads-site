import React from 'react';
import './Common.css';

interface UserComponentProps {
    icon : string,
    className? : string
}

export class UserComponent extends React.Component<UserComponentProps> {

    render() {
        return <img
        className = {"Circle UserHeader " + this.props.className} 
        src={this.props.icon}
        />
    }
    
}