import React, {useState} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const DayPickerComp = () => {
    const [selectedDay, setSelectedDay] = useState();

    const modifiers = {
        thursdays: { daysOfWeek: [4] },
        birthday: new Date(2021, 5, 1),
    };
    const modifiersStyles = {
        birthday: {
            color: 'white',
            backgroundColor: '#ffc107',
        },
        thursdays: {
            color: '#ffc107',
            backgroundColor: '#fffdee',
        },
    };

    const handleDayClick = (event) => {
        console.log(event)

        setSelectedDay(event)
    }

    return (
        <div className="day-picker__wrapper">
            <div>
                <DayPicker 
                    disabledDays={{ daysOfWeek: [0] }} 
                    onDayClick={(event) => handleDayClick(event)}
                    selectedDays={selectedDay}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    />
            </div>
            {/* <div>
                <DayPickerInput />
            </div> */}
            {selectedDay ? <h3 className="day-picker__selected-day">You picked {selectedDay.toLocaleDateString()} to come visit us</h3> : <h3 className="day-picker__selected-day">Pick a day</h3>}
        </div>
    )
}

export default DayPickerComp
