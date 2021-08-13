import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './common/Common.css';
import { AdminPanelLayout } from './adminpanel/Layout';
import { BannerConstructorComponent } from './adminpanel/banner/BannerConstructorComponent'
import { FetchAnalyticsComponent } from './adminpanel/analytics/FetchAnalyticsComponent';
import cookie from 'cookie_js'

import AnalyticsIcon from './assets/analytics_icon.png'
import UploadIcon from './assets/upload_icon.png'
import { ConstructorComponent } from './adminpanel/constructor/ConstructorComponent';
import { BannerListComponent } from './adminpanel/bannerlist/BannerListComponent';
import { FetchBannerListComponent } from './adminpanel/bannerlist/FetchBannerListComponent';

function App() {

  const [state, setState] = useState({
    id: ""
  })

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
        render: <FetchBannerListComponent callback={id => setState({ id: id })} />,
        icon: "",
        title: "Баннеры",
        path: "/banners"
      },
      {
        render: <FetchAnalyticsComponent id={state.id} />,
        icon: AnalyticsIcon,
        title: "Аналитика",
        path: "/analytics"
      },
      {
        render: <BannerConstructorComponent />,
        icon: UploadIcon,
        title: "Конструктор",
        path: "/constructor"
      }
      // {
      //     render: <ConstructorComponent/>,
      //     icon : "",
      //     title : "ConstructIt",
      //     path : "/construct"
      // }
    ]}
    />
  );
}

export default App;
