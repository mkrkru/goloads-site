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
