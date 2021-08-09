import React from 'react';
import { AnalyticsData, fetchAnalyticsData, toFullAnalyticsData } from '../../back/AnalyticsData';
import { AdminPanelBarComponent } from '../Layout';
import { AnalyticsComponent } from './AnalyticsComponent';
import AnalyticsIcon from './../../assets/analytics_icon.png';

interface FetchAnalyticsComponentState {
    data : AnalyticsData
}

export class FetchAnalyticsComponent extends React.Component<{}, FetchAnalyticsComponentState>{

    constructor(props : {}) {
        super(props)
    }

    componentDidMount() {
        fetchAnalyticsData("nbn9ewnd", data => this.setState((_, __) => { 
            if (!data) {
                throw new Error("Fetch Error")
            }
            return {data : data} 
        }))
    }

    render() {
        if (this.state) {
            return <AnalyticsComponent data = {toFullAnalyticsData(this.state.data)}/>
        }
        return <div className="Center">Getting data from server...</div>
    }

}