import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AdminPanelLayout } from './adminpanel/Layout';
import { BannerConstructorComponent } from './adminpanel/banner/BannerConstructorComponent'
import { FetchAnalyticsComponent } from './adminpanel/analytics/FetchAnalyticsComponent';

import AnalyticsIcon from './assets/analytics_icon.png'

function App() {
  return (
    <AdminPanelLayout barComponents={[
      // {
      //   render : <RegComponent/>,
      //   icon : "",
      //   title : "Registration",
      //   path : "/"
      // },
      {
        render : <FetchAnalyticsComponent/>,
        icon : AnalyticsIcon,
        title : "Аналитика",
        path : "/analytics"
      },
      {
        render : <BannerConstructorComponent/>,
        icon : "",
        title : "Конструктор",
        path : "/constructor"
      }
    ]}/>
  );
}

export default App;

/*
<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-login="goloads_auth_bot"
    data-size="small" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
<script type="text/javascript">
    function onTelegramAuth(user) {
        alert(`First name: ${user.first_name}
        Last name: ${user.last_name}
        ID: ${user.id}
        Username: @${user.username}
        `);
        // alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    }
</script>
*/