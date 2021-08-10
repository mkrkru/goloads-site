import React from 'react';
import logo from './logo.svg';
import './App.css';
import './common/Common.css';
import { AdminPanelLayout } from './adminpanel/Layout';
import { BannerConstructorComponent } from './adminpanel/banner/BannerConstructorComponent'
import { FetchAnalyticsComponent } from './adminpanel/analytics/FetchAnalyticsComponent';
import cookie from 'cookie_js'

import AnalyticsIcon from './assets/analytics_icon.png'

function App() {
    if (!cookie.enabled()) {
      return <div className="Flex-center Error Bold" style={{
        fontSize: "300px"
      }}>
        Enable cookies for website to access it
      </div>
    }

    // cookie.defaults.secure = true // Uncomment it on production
    cookie.defaults.expires = 7

    return (
        <AdminPanelLayout barComponents={[
        {
            render: <FetchAnalyticsComponent />,
            icon: AnalyticsIcon,
            title: "Аналитика",
            path: "/analytics"
        },
        {
            render: <BannerConstructorComponent />,
            icon: "",
            title: "Конструктор",
            path: "/constructor"
        }
      ]}
      />
    );
}

export default App;
