import React from 'react';

interface BannerExampleComponentProps {
    image ?: string,
    redirect ?: string
}

export class BannerExampleComponent extends React.Component<BannerExampleComponentProps> {

    render() {
        return <a href={this.props.redirect}>
            <img width="500px" height="80px" src={this.props.image}/>
        </a>
    }

}