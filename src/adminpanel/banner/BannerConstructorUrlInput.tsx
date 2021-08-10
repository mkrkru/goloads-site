import React from 'react';
import CreatableSelect from 'react-select/creatable'
import { InputOption } from '../../common/InputOption';
import makeAnimated from 'react-select/animated';

interface BannerConstructorUrlInputProps {
    inputValue: string
    callback: (newValue: InputOption) => void
}

const defaultComponent = {
    ...makeAnimated(),
    DropdownIndicator : null
}

export class BannerConstructorUrlInput extends React.Component<BannerConstructorUrlInputProps> {

    handleChange(inputValue : any, actionMeta : any) {
        this.props.callback({
            label : inputValue.label,
            value : inputValue.value
        })
    }

    handleInputChange (inputValue: string, actionMeta: any) {
        if (actionMeta.action == "input-blur" || actionMeta.action == 'menu-close') return;
        this.props.callback({
            label : inputValue,
            value : inputValue
        })
    };

    render() {
        return <CreatableSelect
            className="BannerConstructorUrlInputSelect"
            isClearable
            inputValue={this.props.inputValue}
            // onChange = {(newInputValue, meta) => this.handleChange(newInputValue, meta)}
            components = {defaultComponent}
            menuIsOpen = {false}
            placeholder = "Type url you want redirect to"
            onInputChange = {(newInputValue, meta) => this.handleInputChange(newInputValue, meta)}
        />
    }

}