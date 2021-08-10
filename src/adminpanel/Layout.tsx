import React from "react";
import { UserComponent } from "../common/UserComponent";
import './Layout.css';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Title } from "./TitleComponent";
import TelegramLoginButton from 'react-telegram-login';
import cookie from 'cookie_js'

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
        cookie.set({
            'tg_user' : user.id,
            'tg_icon' : user.photo_url
        })
        console.log(user);
        this.forceUpdate()
    }

    render() {
        if (cookie.get("tg_user") === undefined) {
            return <div
                className="Flex-center Center"
                style={{
                    width: "100%",
                    height: "100vh",
                    backgroundColor: "#1C1C1C"
                }}
            >
                <TelegramLoginButton dataOnauth={(response: any) => this.handleResponse(response)} botName="goloads_auth_bot" />
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
                        icon={cookie.get('tg_icon')}
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