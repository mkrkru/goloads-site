import React from 'react';
import { RenderReturn } from './components/Component';
import { ConstructorCell } from './ConstructorCell';

const fieldX = 20
const fieldY = 5

interface ConstructorCellProps {
    isFloating ?: boolean
}

interface ConstructorFieldState {
    cells : ConstructorCellProps[][]
}

interface ConstructorFieldProps {
    components : RenderReturn[]
}

export class ConstructorField extends React.Component<ConstructorFieldProps, ConstructorFieldState> {

    constructor(props : ConstructorFieldProps) {
        super(props)

        var cellsMatrix = new Array<Array<ConstructorCellProps>>()
        for (var i = 0; i < fieldY; ++i) {
            var cellsArray = new Array<ConstructorCellProps>()
            for (var j = 0; j < fieldX; ++j) {
                cellsArray.push({})
            }
            cellsMatrix.push(cellsArray)
        }
        this.state = {
            cells : cellsMatrix
        }

    }

    render() {
        return <div className = "ConstructorFieldColumn">
            {
                this.state.cells.map((array, index, _) => (
                    <div className = "ConstructorFieldRow" key={index}>
                        {
                            array.map((value, index, _) => (
                                <ConstructorCell
                                key = {index}
                                isFloating = {value.isFloating}
                                callbackHoverEnd = {(_) => {
                                    value.isFloating = false
                                    this.updateField()
                                }}
                                callbackHoverEnter = {(_) => {
                                    value.isFloating = true
                                    this.updateField()
                                }}
                                />
                            ))
                        }
                    </div>
                ))
            }
            {
                this.props.components
            }
        </div>
    }

    updateField() {
        this.setState((oldState, _) => {
            return {...oldState}
        })
    }

}