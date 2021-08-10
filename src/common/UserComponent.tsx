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
        return <script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-login="goloads_auth_bot" data-size="large" data-auth-url="https://goloads-site.herokuapp.com/analytics" data-request-access="write"></script>
    }

}