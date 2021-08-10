import React from 'react';
import { BannerConstructorDrop } from './BannerConstructorDrop';
import './BannerConstructor.css';
import { BannerConstructorDomainsInput } from './BannerConstructorDomainsInput';
import { InputOption } from '../../common/InputOption';
import { BannerConstructorUrlInput } from './BannerConstructorUrlInput';
import { BannerExampleComponent } from './BannerExampleComponent';
import { bytesToBase64 } from '../../base64';
import { getExtension, loadFile } from '../../files';
import { fetchBanner } from '../../back/Banner';

interface BannerConstructorComponentState {
    image ?: string
    imageBytes ?: ArrayBuffer
    imageType ?: string
    url: string
    domains: string[]
    inputDomain: string
}


export class BannerConstructorComponent extends React.Component<{}, BannerConstructorComponentState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            image: undefined,
            url: "",
            domains: [],
            inputDomain: ""
        }
    }

    render() {
        return <div className="BannerConstructorContainer">
            <div className="BannerConstructor">
                <BannerConstructorUrlInput
                    inputValue={this.state.url}
                    callback={(newInputValue) => this.setState((oldState, _) => {
                        return {
                            ...oldState,
                            url: newInputValue.value
                        }
                    })}
                />
                <BannerConstructorDomainsInput
                    values={this.state.domains}
                    inputValue={this.state.inputDomain}
                    callbackInputValue={(newInputValue) => this.setState((oldState, _) => {
                        return {
                            ...oldState,
                            inputDomain: newInputValue
                        }
                    })}
                    callbackValues={(newValues, clear) => this.setState((oldState, _) => {
                        return {
                            ...oldState,
                            domains: newValues,
                            inputDomain: (clear ? "" : oldState.inputDomain)
                        }
                    })}
                />
                <BannerConstructorDrop
                    callbackDrop={(file) => {
                        this.setState((oldState, _) => {
                            return {
                                ...oldState,
                                imageType : getExtension(file.name)
                            }
                        })
                        const fileReader = new FileReader()
                        fileReader.addEventListener('load', (event) => this.setState((oldState, _) => {
                            var image = event?.target?.result as string
                            console.log(image);
                            return {
                                ...oldState,
                                image : image
                            }
                        }))
                        fileReader.readAsDataURL(file)
                        file.arrayBuffer().then(arrayBuffer => this.setState((oldState, _) => {
                            return {
                                ...oldState,
                                imageBytes : arrayBuffer
                            }
                        }))
                    }}
                />
            </div>
            <button 
                className="BannerConstructorUploadButton"
                onClick = {() => {
                    if (this.state.url !== "" && this.state.image !== undefined && this.state.imageBytes !== undefined) {
                        fetchBanner({
                            domains : this.state.domains,
                            url : this.state.url
                        }, () => {})
                    }
                }}
            >
                Upload
            </button>
            <BannerExampleComponent
                image = {this.state.image}
                redirect = {"http://" + this.state.url}
            />
        </div>
    }

}