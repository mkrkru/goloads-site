import React from "react";
import { Link } from "react-router-dom";
import { ResponseBanner } from "../../back/Banner";
import './BannerList.css'

interface BannerListComponentProps {
    banners: ResponseBanner[],
    callback: (id: string) => void
}

export class BannerListComponent extends React.Component<BannerListComponentProps> {

    render() {
        return (
            <div className="BannerListContainer">
                {
                    this.props.banners.map((value, index, _) => (
                        <BannerListElement
                            callback={(id) => this.props.callback(id)}
                            banner={value}
                            key={index}
                        />
                    ))
                }
            </div>
        )
    }

}

function BannerListElement(props: {
    banner: ResponseBanner
    callback: (id: string) => void
    key?: number
}) {
    return (
        <Link to="/analytics"> 
            <div className="BannerListElement" key={props.key} onClick={() => props.callback(props.banner.id)}>
                <img src={props.banner.image} className="BannerListElementImage" />
                <div className="BannerListElementTo">to: {props.banner.redirect}</div>
                <div className="BannerListElementDomains">domains : {props.banner.domains ? props.banner.domains.join(" ") : "all"}</div>
            </div>
        </Link>
    )
}