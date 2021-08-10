import React from "react";
import { UserComponent } from "../common/UserComponent";
import './Layout.css';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import { Title } from "./TitleComponent";
import TelegramLoginButton from 'react-telegram-login';

const handleTelegramResponse = (response: any) => {
    console.log(response);
};

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

    render() {
        return <BrowserRouter>
            <Redirect exact from="/" to="/analytics"/>
            <div className="AdminLayout">
                <div className="AdminLayoutHeader">
                    {
                        this.props.barComponents.map((value, _, __) => <Route exact path={value.path}>
                            <Title title={value.title}/>
                        </Route>
                        )
                    }
                    <TelegramLoginButton dataOnauth={handleTelegramResponse} botName="goloads_auth_bot" />
                    {/* <UserComponent 
                    // icon = "https://avatars.githubusercontent.com/u/51133999?v=4" 
                    className = "AdminLayoutUserHeader"
                    /> */}
                    {/* <script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-login="goloads_auth_bot" data-size="large" data-auth-url="https://goloads-site.herokuapp.com/analytics" data-request-access="write"></script> */}
                </div>
                <div className="AdminLayoutBody">
                    <div className="AdminLayoutLeftBar">
                        <div className="AdminLayoutLeftBarMargin"/>
                            {
                                this.props.barComponents.map((component, _, __) => {
                                    return <Link to={component.path}>
                                                <div className="AdminLayoutButton">
                                                    <img src={component.icon} className="Circle AdminLayoutButtomImage"/>
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