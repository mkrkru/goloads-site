import React from 'react';
import { AnalyticsData, fetchAnalyticsData, toFullAnalyticsData } from '../../back/AnalyticsData';
import { AdminPanelBarComponent } from '../Layout';
import { AnalyticsComponent } from './AnalyticsComponent';
import AnalyticsIcon from './../../assets/analytics_icon.png';

interface FetchAnalyticsComponentState {
    data ?: AnalyticsData,
    failed : boolean
}

export class FetchAnalyticsComponent extends React.Component<{}, FetchAnalyticsComponentState>{

    constructor(props : {}) {
        super(props)
        this.state = {
            failed : false
        }
    }

    componentDidMount() {
        fetchAnalyticsData("nbn9ewnd", data => this.setState((_, __) => { 
            if (!data) {
                return {failed : true}
            }
            return {data : data, failed : false} 
        }))
    }

    render() {
        if (this.state.data) {
            return <AnalyticsComponent data = {toFullAnalyticsData(this.state.data)}/>
        }
        else if (this.state.failed) {
            return <div className="Center Error Bold">Failed get data from server</div>
        }
        return <div className="Center">Getting data from server...</div>
    }

}