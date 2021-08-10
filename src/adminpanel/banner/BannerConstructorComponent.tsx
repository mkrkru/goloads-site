import React from 'react';
import { BannerConstructorDrop } from './BannerConstructorDrop';
import './BannerConstructor.css';
import { BannerConstructorDomainsInput, InputOption } from './BannerConstructorDomainsInput';

interface BannerConstructorComponentState {
    arrayBuffer ?: ArrayBuffer
    url : string
    domains : InputOption[]
    inputDomain : string
}

export class BannerConstructorComponent extends React.Component<{}, BannerConstructorComponentState> {

    constructor(props : {}) {
        super(props)
        this.state = {
            arrayBuffer : undefined,
            url : "",
            domains : [],
            inputDomain : ""
        }
    }

    render() {
        return <div className="BannerConstructor Center">
            <div className = "BannerConstructorInputs">
                <BannerConstructorDomainsInput
                    values = {this.state.domains}
                    inputValue = {this.state.inputDomain}
                    callbackInputValue = {(newInputValue) => this.setState((oldState, _) => {
                        return {
                            ...oldState,
                            inputDomain : newInputValue
                        }
                    })}
                    callbackValues = {(newValues, clear) => this.setState((oldState, _) => {
                        return {
                            ...oldState,
                            domains : newValues,
                            inputDomain : (clear ? "" : oldState.inputDomain) 
                        }
                    })}
                />
            </div>
            <BannerConstructorDrop 
            callbackDrop = { arrayBuffer => this.setState((oldState, _) => { 
                return {
                    ...oldState, 
                    arrayBuffer : arrayBuffer
                } 
            })}
            />
            <button className="Primary">Create</button>
        </div>
    }

}