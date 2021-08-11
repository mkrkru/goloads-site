import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'

export interface InputValue {
    label : string
    value : string
    __isNew__ : boolean
}

const singleInputComponents = {
    ...makeAnimated(),
    DropdownIndicator : null
}

export function SingleInput(props : {
    callback : (value : InputValue) => void
    callbackInputChange ?: (value : string, meta : any) => void
    [state : string] : any
}) {
    return <CreatableSelect
        isClearable
        onChange = {props.callback}
        // inputValue = {props.inputValue}
        onInputChange = {props.callbackInputChange}
        // style = {props.style}
        components = {singleInputComponents}
        // menuIsOpen = {props.menuIsOpen}
        // placeholders = {props.placeholder}
        {...props}
    />
}