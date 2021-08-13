import { getTelegramUser, getUserCookie, setUserCookie } from "../common/Storage";

export interface AnalyticsData {
    id: string,
    clicks: number[],
    uniqueClicks: number[],
    views: number[],
    uniqueViews: number[]
}

export interface FullAnalyticsData extends AnalyticsData {
    currentWeekClicks : number
    lastWeekClicks : number
    currentWeekUniqueClicks : number
    lastWeekUniqueClicks : number
    currentWeekViews : number
    lastWeekViews : number
    currentWeekUniqueViews : number
    lastWeekUniqueViews : number
}

export function toFullAnalyticsData(data : AnalyticsData) : FullAnalyticsData {

    var clicks = asTwoWeeks(data.clicks);
    var uniqueClicks = asTwoWeeks(data.uniqueClicks)
    var views = asTwoWeeks(data.views)
    var uniqueViews = asTwoWeeks(data.uniqueViews)

    return {
        ...data,
        currentWeekClicks : clicks[0],
        lastWeekClicks : clicks[1],
        currentWeekUniqueClicks : uniqueClicks[0],
        lastWeekUniqueClicks : uniqueClicks[1],
        currentWeekViews : views[0],
        lastWeekViews : views[1],
        currentWeekUniqueViews : uniqueViews[0],
        lastWeekUniqueViews : uniqueViews[1] 
    }
}

interface CurrentLastContainer {
    current : number,
    last : number
}

export function dataById(id : number, data : FullAnalyticsData) : CurrentLastContainer {
    switch(id) {
        case 0:
            return {
                current : data.currentWeekClicks,
                last : data.lastWeekClicks
            }
        case 1:
            return {
                current : data.currentWeekUniqueClicks,
                last : data.lastWeekUniqueClicks
            }
        case 2:
            return {
                current : data.currentWeekViews,
                last : data.lastWeekViews
            }
        case 3:
            return {
                current : data.currentWeekUniqueClicks,
                last : data.lastWeekUniqueClicks
            }
    }
    throw new Error("Column id is not right")
}

function asTwoWeeks(array : number[]) : number[] {
    var current = 0;
    var last = 0;
    const length = array.length / 2
    for (var i = 0; i < length; ++i) {
        current += array[i]
        last += array[i + length]
    }
    return [current, last]
}

export function fetchAnalyticsData(id: string, fn : (data? : AnalyticsData) => void) : void {
    promiseAnalyticsData(id).then(fn)
}

export function promiseAnalyticsData(id : string) : Promise<AnalyticsData> {
    return fetch(`https://doats.ml:8080/analytics?id=${id}`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "tg-id": getTelegramUser().toString(),
            "user-cookie": getUserCookie()
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        else {
            console.log(response) // Log not ok response
            return null;
        }
    })
    .then(data => {
        setUserCookie(data.userCookie)
        if (data) {
            return {
                id : data.id,
                clicks : data.clicks,
                uniqueClicks : data.unique_clicks,
                views : data.views,
                uniqueViews : data.unique_views
            }
        }
        return data
    })
}

export function columnById(id : number, data : AnalyticsData) : number[] {
    switch(id) {
        case 0:
            return data.clicks
        case 1:
            return data.uniqueClicks
        case 2:
            return data.views
        case 3:
            return data.uniqueViews
    }
    throw new Error("Column id is not right")
}

export function columnNameById(id : number) : string {
    switch(id) {
        case 0:
            return "Клики"
        case 1:
            return "Уникальные клики"
        case 2:
            return "Просмотры"
        case 3:
            return "Уникальные просмотры"
    }
    throw new Error("Column id is not right")
}