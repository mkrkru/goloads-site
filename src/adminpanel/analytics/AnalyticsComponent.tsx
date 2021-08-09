import React from 'react';
import { AdminPanelBarComponent } from '../Layout';
import { Analytics } from './Analytics';
import './Analytics.css';
import AnalyticsIcon from './../../assets/analytics_icon.png';
import { AnalyticsData, FullAnalyticsData } from '../../back/AnalyticsData';

interface AnalyticsComponentProps {
    data : FullAnalyticsData
}

export class AnalyticsComponent extends React.Component<AnalyticsComponentProps>{

    icon() {
        return <img className="Circle" width="60px" height="60px" src={AnalyticsIcon}></img>
    }

    render() {
        return <div>
            <Analytics
            clicksCurrentWeekColor = "#00FF00" 
            clicksLastWeekColor = "#FF0000" 
            uniqueClicksCurrentWeekColor = "#FFFF00"
            uniqueClicksLastWeekColor = "#00FFFF"
            data = {this.props.data}
            columnStart = {0}
            />
            
            <Analytics
            clicksCurrentWeekColor = "#00FF00" 
            clicksLastWeekColor = "#FF0000" 
            uniqueClicksCurrentWeekColor = "#FFFF00"
            uniqueClicksLastWeekColor = "#00FFFF"
            data = {this.props.data}
            columnStart = {2}
            />
        </div>
    }
}