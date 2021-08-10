import React from "react";
import { UserComponent } from "../common/UserComponent";
import './Layout.css';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Title } from "./TitleComponent";
import TelegramLoginButton from 'react-telegram-login';
import cookie from 'cookie_js'
import { getTelegramIcon, isTelegramUserDefined, setTelegramUser } from "../common/Cookie";

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
        setTelegramUser(user)
        this.forceUpdate()
    }

    render() {
        if (!isTelegramUserDefined()) {
            return <div
                className="Flex-center Center"
                style={{
                    width: "100%",
                    height: "100vh",
                    backgroundColor: "#1C1C1C"
                }}
            >
                Login to access
                <TelegramLoginButton dataOnauth={(user: any) => this.handleResponse(user)} botName="goloads_auth_bot" />
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