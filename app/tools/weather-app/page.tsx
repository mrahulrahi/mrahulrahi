'use client'
import React, { useState, useEffect } from 'react';
import './WeatherApp.css'
import Banner from '@/app/components/Banner/Banner'
import ContentContainer from '@/app/components/ContentContainer'

const WeatherApp = () => {
    const [weather, setWeather] = useState<any>(null);
    const [forecast, setForecast] = useState<any>([]);
    const [city, setCity] = useState('Lucknow'); // Replace with the city you want to get weather for
    const [inputCity, setInputCity] = useState('');
    const apiKey = 'be3a0ff29ba77031d805f92ea6dc23fb'; // Replace with your OpenWeatherMap API key

    const handleInputChange = (event : any) => {
        setInputCity(event.target.value);
    };

    const handleButtonClick = () => {
        // Update the city only when the button is clicked
        setCity(inputCity);
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Weather data not available');
                }
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        const fetchForecast = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Forecast data not available');
                }
                const data = await response.json();
                // Extract daily forecast from the API response
                const dailyForecast = data.list.filter((reading : any) => reading.dt_txt.includes('12:00:00'));
                setForecast(dailyForecast);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            }
        };

        fetchWeather();
        fetchForecast();
    }, [city, apiKey]);


    if (!weather || forecast.length === 0) {
        return <div>Loading...</div>;
    }
    console.log(weather)
    console.log(forecast[0].clouds.all)

    return (
        <>
            <Banner bgImage='../inner-hero-img.jpg'>
                Weather App
            </Banner>
            <ContentContainer className="weather-app-container" column="col-lg-10 col-xl-8 mx-auto">
                <div className="weather-app-wrapper d-flex flex-column flex-md-row justify-content-between">
                    <div className="weather-side">
                        <div className="weather-gradient"></div>
                        <div className="date-container">
                            <h2 className="date-dayname">Tuesday</h2><span className="date-day">15 Jan 2019</span><i className="location-icon"></i><span className="location">{weather.name}</span>
                        </div>
                        <div className="weather-container"><i className="weather-icon" >   <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                            alt="Weather Icon"
                        /></i>
                            <h1 className="weather-temp">{Math.round(weather.main.temp - 273.15)}°C</h1>
                            <h3 className="weather-desc">{weather.weather[0].main}</h3>
                        </div>
                    </div>
                    <div className="info-side">
                        <div className="today-info-container">
                            <div className="today-info">
                                <div className="precipitation"> <span className="title">PRECIPITATION</span><span className="value">{forecast[0].clouds.all} %</span>
                                    <div className="clear"></div>
                                </div>
                                <div className="humidity"> <span className="title">HUMIDITY</span><span className="value">{weather.main.humidity}%</span>
                                    <div className="clear"></div>
                                </div>
                                <div className="wind"> <span className="title">WIND</span><span className="value">{weather.wind.speed} km/h</span>
                                    <div className="clear"></div>
                                </div>

                            </div>
                        </div>
                        <div className="week-container">
                            <ul className="week-list d-flex">
                                <li className="active"><i className="day-icon" ></i><span className="day-name">Tue</span><span className="day-temp">29°C</span></li>
                                <li><i className="day-icon"></i><span className="day-name">Wed</span><span className="day-temp">21°C</span></li>
                                <li><i className="day-icon"></i><span className="day-name">Thu</span><span className="day-temp">08°C</span></li>
                                <li><i className="day-icon"></i><span className="day-name">Fri</span><span className="day-temp">19°C</span></li>
                                <li><i className="day-icon"></i><span className="day-name">Sat</span><span className="day-temp">19°C</span></li>
                                <li><i className="day-icon"></i><span className="day-name">Sun</span><span className="day-temp">19°C</span></li>
                                <li><i className="day-icon"></i><span className="day-name">Mon</span><span className="day-temp">19°C</span></li>
                                <div className="clear"></div>
                            </ul>
                        </div>
                        <div className="location-container d-flex gap-2">
                            <input type="text" id="city" className="form-control" value={inputCity} onChange={handleInputChange} />
                            <button className="location-button" onClick={handleButtonClick}> <i></i><span>Change location</span></button>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </>
    )
}

export default WeatherApp



