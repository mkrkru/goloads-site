import React from "react";
import { ResponseBanner } from "../../back/Banner";
import './BannerList.css'

interface BannerListComponentProps {
    banners : ResponseBanner[]
}

export class BannerListComponent extends React.Component<BannerListComponentProps> {

    render() {
        return (
            <div className="BannerListContainer">
                {
                    this.props.banners.map((value, index, _) => (
                        <BannerListElement banner={value} key={index}/>
                    ))
                }
            </div>
        )
    }
    
}

function BannerListElement(props : {
    banner : ResponseBanner
    key ?: number
}) {
    return (
        <div className="BannerListElement" key={props.key}>
            <img src={props.banner.image} className="BannerListElementImage"/>
            <div className="BannerListElementTo">to: {props.banner.redirect}</div> 
            <div className="BannerListElementDomains">domains : {props.banner.domains ? props.banner.domains.join(" ") : "all"}</div>
        </div>
    )
}