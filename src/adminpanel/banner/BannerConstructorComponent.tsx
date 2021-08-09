import React from 'react';
import { BannerConstructorDrop } from './BannerConstructorDrop';
import './BannerConstructor.css';

export class BannerConstructorComponent extends React.Component {

    render() {
        return <div className="BannerConstructor">
            <BannerConstructorDrop/>
        </div>
    }

}