import React from 'react';
import Select from 'react-select';

const SelectComponent = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: '#494E52',
            backgroundColor: state.isSelected ? '#F1F3F6' : null
        }),
        singleValue: (provided, state) => {
            const display = state.selectProps.menuIsOpen ? 'none' : 'block';
            return {display}
        }
    }

    return (
        <div className="select__container">
            <div className="select__wrapper">
                <h3 className="day-picker__selected-day">Select your favorite candy</h3>
                <Select 
                    options={options}
                    classNamePrefix='react-select'
                    styles={customStyles}
                />
            </div>
        </div>
    )
}

export default SelectComponent
