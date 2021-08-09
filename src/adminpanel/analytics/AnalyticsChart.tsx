import React from 'react';
import { AnalyticsData, columnById, columnNameById } from '../../back/AnalyticsData';
import Chart from 'react-google-charts';

interface AnalyticsChartProps {
    data: AnalyticsData
    lastWeekColor: string
    currentWeekColor: string
    column : number
}

const format = "px"

function width() {
    return (window.innerWidth-120) * 0.35
}

function height() {
    return width() * 0.55
}

export class AnalyticsChart extends React.Component<AnalyticsChartProps> {

    handleResize(_ : any) {
        this.forceUpdate()
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this))
    }

    render() {
        return <Chart
            width={width() + format}
            height={height() + format}
            chartType="AreaChart"
            loader={
                <div 
                className="Center" 
                style = {{
                    width : (width() - 10) + format,
                    height : (height() - 9) + format,
                    padding: 4 + format,
                    border : `1${format} solid black`,
                    borderTop : "0px solid black"
                }}
                >
                    Loading click stats...
                </div>
            }
            data={[
                ['Day', 'Current', 'Last'],
                ...(() => {
                    var array = []
                    var arrayLength = this.props.data.clicks.length / 2
                    for (var i = 0; i < arrayLength; ++i) {        
                        array.push([
                            i.toString(), 
                            columnById(this.props.column, this.props.data)[i], 
                            columnById(this.props.column, this.props.data)[i + arrayLength]
                        ])
                    }
                    return array
                })()
            ]}
            options={{
                backgroundColor : "#1C1C1C",
                colors: [
                    this.props.currentWeekColor,
                    this.props.lastWeekColor,
                ],
                legend : {
                    position : 'top'
                },
                title : columnNameById(this.props.column),
                titleTextStyle : {
                    color : "#FFFFFF",
                    fontSize : 18
                },
                hAxis: {
                    title: 'Week',
                    titleTextStyle: {
                        color: '#FFFFFF'
                    }
                },
                vAxis: {
                    title: columnNameById(this.props.column),
                    titleTextStyle: {
                        color: '#FFFFFF'
                    }
                },
                chartArea: { width: '80%', height: '80%' }
            }}
        />
    }

}