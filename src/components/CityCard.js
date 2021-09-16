import React, { useState } from 'react'

export const CityCard = ({ city, removeCity }) => {
    const [isOpen, setIsOpen] = useState(false); 

    return (
        <>  
            <div className={`weather__image--wrapper ${city.weather[0].id === 801 ? 'few-clouds' : ''}`}>
                <i className="weather__icon--more" onClick={() => setIsOpen(!isOpen)}></i>
                {isOpen && 
                    <div className="weather__options-container">
                        <span onClick={() => {removeCity(city.id); setIsOpen(false)}}><i className="weather__icon--remove"></i>Remove city</span>
                    </div>
                }
                <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="Weather icon" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#FFFFFF" fillOpacity="1" d="M0,128L40,138.7C80,149,160,171,240,186.7C320,203,400,213,480,186.7C560,160,640,96,720,58.7C800,21,880,11,960,5.3C1040,0,1120,0,1200,16C1280,32,1360,64,1400,80L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                </svg>
            </div>
            <div className="weather__card--inner">
                <h3 className="weather__name">{city.name}</h3>
                <div className="weather__date--wrapper">
                    <span>Day</span>&#124;
                    <span>datum</span>&#124;
                    <span>tid</span>
                </div>
                <div className="weather__temp-container">
                    <div className="weather__temp">{Math.round(city.main.temp)}</div>
                    <svg className="weather__icon--degrees" width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7.5" cy="7.5" r="6" stroke="black" strokeWidth="3"/>
                    </svg>
                </div>
            </div>
        </>
    )
}