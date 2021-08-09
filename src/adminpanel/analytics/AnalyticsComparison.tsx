import React from 'react'
import { dataById, FullAnalyticsData } from '../../back/AnalyticsData';

interface AnalyticsComparisonProps {
    data : FullAnalyticsData
    columnStart : number
}

export class AnalyticsComparison extends React.Component<AnalyticsComparisonProps> {

    render() {
        var just = dataById(this.props.columnStart, this.props.data)
        var unique = dataById(this.props.columnStart + 1, this.props.data)
        var currentComparison = just.current / unique.current
        var lastComparison = just.last / unique.last
        return <div className = "ClickAnalyticsTextBox Center">
            <div className = "ClickAnalyticsAddInformation">
                {Math.floor(currentComparison * 100) / 100}    
            </div>
            <div>
                {currentComparison > lastComparison ? ">" : "<"}
                <div className = "ClickAnalyticsAddInformation">
                    {Math.floor(currentComparison / lastComparison * 100) / 100}
                </div>
            </div>
            <div className = "ClickAnalyticsAddInformation">
                {Math.floor(lastComparison * 100) / 100}    
            </div>  
        </div>
    }

}