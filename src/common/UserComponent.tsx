import React from 'react';
import './Common.css';

interface UserComponentProps {
    className?: string
}

interface UserComponentState {
    icon?: string
}

export class UserComponent extends React.Component<UserComponentProps, UserComponentState> {

    state = {
        icon: undefined
    }

    render() {
        return <div></div>
    }

}