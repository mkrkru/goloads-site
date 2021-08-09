import React from 'react';
import { AnalyticsData, FullAnalyticsData } from '../../back/AnalyticsData';
import { AnalyticsChart } from './AnalyticsChart';
import { AnalyticsComparison } from './AnalyticsComparison';
import { AnalyticsText } from './AnalyticsText';

interface AnalyticsProps {
    data : FullAnalyticsData
    columnStart: number
    clicksLastWeekColor : string
    clicksCurrentWeekColor : string
    uniqueClicksLastWeekColor : string
    uniqueClicksCurrentWeekColor : string
}

export class Analytics extends React.Component<AnalyticsProps> {

    render() {
        return <div className = "ClickAnalyticsBox">
            <div className = "ClickAnalyticsColumnBox">
                <AnalyticsChart 
                lastWeekColor = {this.props.clicksLastWeekColor} 
                currentWeekColor = {this.props.clicksCurrentWeekColor} 
                data = {this.props.data}
                column = {this.props.columnStart}
                />
                <AnalyticsText
                lastWeekColor = {this.props.clicksLastWeekColor}
                currentWeekColor = {this.props.clicksCurrentWeekColor}
                data = {this.props.data}
                column = {this.props.columnStart}
                />
            </div>
            <div className = "ClickAnalyticsColumnBox">
                <AnalyticsComparison 
                data = {this.props.data}
                columnStart = {this.props.columnStart}
                />
            </div>
            <div className = "ClickAnalyticsColumnBox">
                <AnalyticsText
                lastWeekColor = {this.props.uniqueClicksLastWeekColor}
                currentWeekColor = {this.props.uniqueClicksCurrentWeekColor}
                data = {this.props.data}
                column = {this.props.columnStart + 1}
                />
                <AnalyticsChart
                lastWeekColor = {this.props.uniqueClicksLastWeekColor}
                currentWeekColor = {this.props.uniqueClicksCurrentWeekColor}
                data = {this.props.data}
                column = {this.props.columnStart + 1}    
                />
            </div>
        </div>
    }

}