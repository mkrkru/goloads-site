import React from "react";
import { UserComponent } from "../common/UserComponent";
import './Layout.css';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import { Title } from "./TitleComponent";
import TelegramLoginButton from 'react-telegram-login';
import cookie from 'cookie_js';
import { getTelegramIcon, isAllDefined, isTelegramUserDefined, setTelegramUser, setUserCookie } from "../common/Storage";
// import { promiseRegister } from "../back/Register";

export interface AdminPanelBarComponent {
    render: JSX.Element | React.Component | Element
    icon: string
    path: string
    title: string
}

interface AdminPanelLayoutProps {
    barComponents: AdminPanelBarComponent[]
}

export class AdminPanelLayout extends React.Component<AdminPanelLayoutProps> {

    constructor(props: AdminPanelLayoutProps) {
        super(props)
    }

    handleResponse(user: any) {
        setTelegramUser(user);
        fetch("https://doats.ml:8080/register", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authDate: user.auth_date,
                firstName: user.first_name,
                lastName: user.last_name,
                hash: user.hash,
                id: user.id,
                photoUrl: user.photo_url,
                username: user.username
            })
        }); // .then(data => data ? setUserCookie(data) : null);

        this.forceUpdate();
    }

render() {
    if (!isAllDefined()) {
        return <div
            className="Flex-center Center"
            style={{
                color: "white",
                fontSize: "200px",
                width: "100%",
                height: "100vh",
                backgroundColor: "#1C1C1C"
            }}
        >
            Login to access
            <TelegramLoginButton dataOnauth={this.handleResponse} botName="goloads_auth_bot" />
        </div>
    }
    return <BrowserRouter>
        <Redirect exact from="/" to="/analytics" />
        <div className="AdminLayout">
            <div className="AdminLayoutHeader">
                {
                    this.props.barComponents.map((value, _, __) => <Route exact path={value.path}>
                        <Title title={value.title} />
                    </Route>
                    )
                }
                <UserComponent
                    icon={getTelegramIcon()}
                    className="AdminLayoutUserHeader"
                />
            </div>
            <div className="AdminLayoutBody">
                <div className="AdminLayoutLeftBar">
                    <div className="AdminLayoutLeftBarMargin" />
                    {
                        this.props.barComponents.map((component, _, __) => {
                            return <Link to={component.path}>
                                <div className="AdminLayoutButton">
                                    <img src={component.icon} className="Circle AdminLayoutButtomImage" />
                                </div>
                            </Link>
                        })
                    }
                </div>
                <div className="AdminLayoutContentBody">
                    {
                        this.props.barComponents.map((component, _, __) => {
                            return <Route exact path={component.path}>
                                {component.render}
                            </Route>
                        })
                    }
                </div>
            </div>
        </div>
    </BrowserRouter>
}

}