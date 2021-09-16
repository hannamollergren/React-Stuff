import React, { useState, useEffect } from 'react'
import { CityCard } from '../components/CityCard';


export const DisplayWeatherContainer = () => {
    const [query, setQuery] = useState('');
    const [cityList, setCityList] = useState([]);
    const [message, setMessage] = useState('')

    const api = {
        key: "ffbddeaa542b92aa39ebbacc9fcd5c90",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    useEffect(() => {
        if (localStorage.getItem('cityList')) {
            setCityList(JSON.parse(localStorage.getItem('cityList')))
        }
        else {
            setCityList([])
        }
    }, [])

    const search = event => {
        if (event.key === "Enter") {
          fetch(`${api.base}weather?q=${query}&units=metric&type=hour&start={start}&cnt={cnt}&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                let duplicate = cityList.find(city => city.id === result.id);

                if (duplicate) {
                    setMessage('City added already');
                }

                if(result.cod === 200 && duplicate === undefined) {
                    const list = cityList;
                    list.unshift(result);
                    setCityList(list);
                    setQuery('');
                    setMessage('');

                    localStorage.setItem('cityList', JSON.stringify(list))
                }

                else if (result.cod === "404") {
                    let errorMessage = result.message.charAt(0).toUpperCase() + result.message.slice(1);
                    setMessage(errorMessage);
                }
            });
        }
    }

    const removeCity = (id) => {
        console.log('remove city', id)
        let newList = cityList.filter(city => city.id !== id);
        localStorage.setItem('cityList', JSON.stringify(newList))
        setCityList(newList);
    }

    return (
        <div className="weather__container">
            <div className="weather__wrapper">
                <div className="weather__input-wrapper">
                    <input 
                        type="text"
                        className="weather__search-bar"
                        placeholder="Add city"
                        onChange={e => {setQuery(e.target.value); setMessage('')}}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {message && <div className="message">{message}</div>}
                <h2>{cityList.length <= 0 ? 'No cities added' : cityList.length > 1 ? `My cities (${cityList.length})` : `My city`}</h2>
                <div className="weather__card-wrapper">
                    {cityList && cityList.map((city, index) => (
                        <div key={index} className={`weather__card ${city.weather[0].main.toLowerCase()} ${city.weather[0].icon === '01n' && city.weather[0].main.toLowerCase() === 'clear' ? 'night' : ''}`}>
                            {city && <CityCard city={city} removeCity={removeCity}/>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
//TODO 3 Css fixes, 4 Add css from data ex sun and clouds, colors etc