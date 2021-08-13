import { useEffect, useState } from "react";
import { promiseBanners, ResponseBanner } from "../../back/Banner";
import { BannerListComponent } from "./BannerListComponent";

export function FetchBannerListComponent() {
    const [state, setState] = useState({
        banners: new Array<ResponseBanner>(),
        loaded: false,
        failed: false
    })

    useEffect(() => {
        promiseBanners()
            .then(responseBanners => setState({
                banners: responseBanners,
                loaded: true,
                failed: false
            }))
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
        return <BannerListComponent banners={state.banners} />
    }
    else if (state.failed) {
        return <div className="Center Error Bold">Failed to get data from server</div>
    }
    return <div className="Center">Getting data from server...</div>

}