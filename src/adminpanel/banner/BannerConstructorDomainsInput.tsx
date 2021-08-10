import React from 'react';
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'
import { InputOption } from '../../common/InputOption';

interface BannerConstructorDomainsInputProps {
    inputValue: string
    values: string[]
    callbackValues: (newValues: string[], clear : boolean) => void
    callbackInputValue: (newInputValue : string) => void
}

function createOption(label : string) {
    return {
        label,
        value : label
    }
}

const defaultComponent = {
    ...makeAnimated(),
    DropdownIndicator : null
}

export class BannerConstructorDomainsInput extends React.Component<BannerConstructorDomainsInputProps> {

    handleChange (value: Array<InputOption>, actionMeta: any) {
        this.props.callbackValues(value.map((value, _, __) => value.value), false)            
    };
    handleInputChange (inputValue: string){
        this.props.callbackInputValue(inputValue)
    };
    handleKeyDown(event: React.KeyboardEvent) {
        if (!this.props.inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                this.props.callbackValues([...this.props.values, this.props.inputValue], true)
                event.preventDefault()
        }
    };
    render() {
        return <CreatableSelect
            className = "BannerConstructorDomainsInputSelect"
            components = {defaultComponent}
            isMulti
            isClearable
            menuIsOpen = {false}
            placeholder="Type domain you want and press enter..."
            inputValue={this.props.inputValue}
            value={this.props.values.map((value, _, __) => {
                return {
                    value : value,
                    label : value
                }
            })}
            onKeyDown = {(event: React.KeyboardEvent<Element>) => this.handleKeyDown(event)}
            onChange = {(value: InputOption[], meta: any) => value ? this.handleChange(value, meta) : this.handleChange([], meta)}
            onInputChange = {(inputValue: string) => this.handleInputChange(inputValue)}
        />
    }

}