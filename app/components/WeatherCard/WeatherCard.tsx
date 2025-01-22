'use client'
import React, { useState, useEffect } from 'react';
import './WeatherCard.css';
import { HiOutlineLocationMarker } from "react-icons/hi";

type WeatherCardProps = {
    gradientColor: string;
};

const WeatherCard = ({ gradientColor }: WeatherCardProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const [weather, setWeather] = useState<any>(null);
    const [dailyForecast, setDailyForecast] = useState<any>([]);
    const [city, setCity] = useState('Lucknow');
    const [inputCity, setInputCity] = useState('');
    const apiKey = 'be3a0ff29ba77031d805f92ea6dc23fb';
    const [currentDayIndex, setCurrentDayIndex] = useState<number>(new Date().getDay());

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCity(event.target.value);
    };

    const handleButtonClick = () => {
        setCity(inputCity);
    };

    useEffect(() => {
        const todayIndex = new Date().getDay();
        const currentForecastIndex = dailyForecast.findIndex((day: any) => formatDay(day.dt).dayIndex === todayIndex);

        setCurrentDayIndex(currentForecastIndex !== -1 ? currentForecastIndex : 0);

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

        const fetchDailyForecast = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Forecast data not available');
                }
                const data = await response.json();
                const dailyForecastData = data.list.filter((reading: any) => reading.dt_txt.includes('12:00:00'));
                setDailyForecast(dailyForecastData.slice(0, 7));
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            }
        };

        fetchWeather();
        fetchDailyForecast();
    }, [city, apiKey]);

    if (!weather || dailyForecast.length === 0) {
        return <div>Loading...</div>;
    }

    // Function to format the date
    const formatDay = (timestamp: number) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = date.getDay(); // Get day index (0-6)
        const dayName = days[dayIndex];
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return { dayIndex, dayName, date: `${day} ${month}` };
    };

    return (
        <div className={`weather-app-wrapper d-flex flex-column flex-md-row ${isOpened ? 'opened' : ''}`}>
            <button className="weather-side" onClick={() => setIsOpened(!isOpened)}>
                <div className="weather-gradient" style={{ backgroundImage: `linear-gradient(135deg, ${gradientColor} 10%, #F8FFAE 100%)` }}></div>
                <div className="date-container">
                    <h2 className="date-dayname">{formatDay(weather.dt).dayName}</h2>
                    <span className="date-day">{formatDay(weather.dt).date}</span>
                    <i className="location-icon"><HiOutlineLocationMarker /></i>
                    <span className="location">{weather.name}</span>
                </div>
                <div className="weather-container">
                    <i className="weather-icon">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                            alt="Weather Icon"
                        />
                    </i>
                    <h1 className="weather-temp">{Math.round(weather.main.temp - 273.15)}°C</h1>
                    <h3 className="weather-desc">{weather.weather[0].main}</h3>
                </div>
            </button>
            <div className="info-side">
                <div className="today-info-container">
                    <div className="today-info d-flex flex-column">
                        <div className="precipitation">
                            <span className="title">PRECIPITATION</span>
                            <span className="value">{dailyForecast[0].clouds.all} %</span>
                        </div>
                        <div className="humidity">
                            <span className="title">HUMIDITY</span>
                            <span className="value">{weather.main.humidity}%</span>
                        </div>
                        <div className="wind">
                            <span className="title">WIND</span>
                            <span className="value">{Math.round(weather.wind.speed * 1.60934)} km/h</span>
                        </div>
                    </div>
                </div>
                <div className="week-container">
                    <ul className="week-list d-flex">
                        {dailyForecast.map((day: any, index: number) => (
                            <li key={day.dt} className={index === currentDayIndex ? 'active' : ''}>
                                <img
                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                                    alt="Day Icon"
                                />
                                <span className="day-name">{formatDay(day.dt).dayName.slice(0, 3)}</span>
                                <span className="day-temp">{Math.round(day.main.temp - 273.15)}°C</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="location-container d-flex flex-column gap-2">
                    <input type="text" id="city" className="form-control" value={inputCity} onChange={handleInputChange} />
                    <button className="location-button" style={{ backgroundImage: `linear-gradient(135deg, ${gradientColor} 10%, #F8FFAE 100%)` }} onClick={handleButtonClick}>
                        <i></i><span>Change location</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;



