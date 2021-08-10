import React from 'react';
import { GroupTypeBase, OptionTypeBase } from 'react-select';
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'
import { SelectComponents } from 'react-select/src/components';

interface BannerConstructorDomainsInputProps {
    inputValue: string
    values: InputOption[]
    callbackValues: (newValues: InputOption[], clear : boolean) => void
    callbackInputValue: (newInputValue : string) => void
}

export interface InputOption {
    label : string
    value : string
}

function createOption(label : string) {
    return {
        label,
        value : label
    }
}

type ComponentType = Partial<SelectComponents<OptionTypeBase, boolean, GroupTypeBase<OptionTypeBase>>>

const defaultComponent : ComponentType = {
    ...makeAnimated(),
    DropdownIndicator : null
}

export class BannerConstructorDomainsInput extends React.Component<BannerConstructorDomainsInputProps> {

    handleChange (value: any, actionMeta: any) {
        this.props.callbackValues(value, false)            
    };
    handleInputChange (inputValue: string){
        this.props.callbackInputValue(inputValue)
    };
    handleKeyDown(event: React.KeyboardEvent) {
        if (!this.props.inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                this.props.callbackValues([...this.props.values, createOption(this.props.inputValue)], true)
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
            value={this.props.values}
            onKeyDown = {(event) => this.handleKeyDown(event)}
            onChange = {(value, meta) => this.handleChange(value, meta)}
            onInputChange = {(inputValue) => this.handleInputChange(inputValue)}
        />
    }

}