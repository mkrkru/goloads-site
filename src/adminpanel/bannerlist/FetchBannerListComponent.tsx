import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { promiseBanners, ResponseBanner } from "../../back/Banner";
import { BannerListComponent } from "./BannerListComponent";

export function FetchBannerListComponent(props: {
    callback: (id: string) => void
}) {
    const [state, setState] = useState({
        banners: new Array<ResponseBanner>(),
        loaded: false,
        failed: false
    })

    useEffect(() => {
        promiseBanners()
            .then(responseBanners => {
                setState({
                    banners: responseBanners,
                    loaded: true,
                    failed: false
                })
                if (responseBanners && responseBanners.length != 0) {
                    props.callback(responseBanners[0].id)
                }
            })
            .catch(error => {
                console.log(error);
                setState({
                    banners: [],
                    loaded: false,
                    failed: true
                })
            })
    })

    if (state.loaded) {
        if (state.banners) {
            return <BannerListComponent banners={state.banners} callback={props.callback} />
        }
        return <div className="Center Bold">
            You do not have any banners, you can create them on --&gt; 
            <Link to="/constructor">Click</Link>
        </div>
    }
    else if (state.failed) {
        return <div className="Center Error Bold">Failed to get data from server</div>
    }
    return <div className="Center Bold">Getting data from server...</div>

}