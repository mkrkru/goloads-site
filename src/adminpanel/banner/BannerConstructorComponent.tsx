import React from 'react';
import { BannerConstructorDrop } from './BannerConstructorDrop';
import './BannerConstructor.css';

interface BannerConstructorComponentState {
    arrayBuffer : ArrayBuffer
    url : string
    domains : string[]
}

export class BannerConstructorComponent extends React.Component<{}, BannerConstructorComponentState> {

    render() {
        return <div className="BannerConstructor Center">
            <div>
                
            </div>
            <BannerConstructorDrop 
            callbackDrop = { arrayBuffer => this.setState((oldState, _) => { 
                return {
                    ...oldState, 
                    arrayBuffer : arrayBuffer
                } 
            })}
            />
        </div>
    }

}