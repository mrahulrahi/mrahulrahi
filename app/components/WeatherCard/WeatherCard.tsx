'use client'
import React, { useState, useEffect } from 'react';
import './WeatherCard.css';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaQuoteLeft } from 'react-icons/fa';
import { FiShare, FiCopy } from "react-icons/fi";

const WeatherCard = () => {
    const [weather, setWeather] = useState<any>(null);
    const [dailyForecast, setDailyForecast] = useState<any>([]);
    const [city, setCity] = useState('Lucknow');
    const [inputCity, setInputCity] = useState('');
    const apiKey = 'be3a0ff29ba77031d805f92ea6dc23fb';
    const [currentDayIndex, setCurrentDayIndex] = useState<number>(new Date().getDay());

    const [currentQuote, setCurrentQuote] = useState('');
    const [currentAuthor, setCurrentAuthor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCity(event.target.value);
    };

    const handleButtonClick = () => {
        setCity(inputCity);
    };

    const handleWeekItemClick = (index: number) => {
        setCurrentDayIndex(index);
        setWeather(dailyForecast[index]);
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);

                if (!weatherResponse.ok || !forecastResponse.ok) {
                    throw new Error('Weather data not available');
                }

                const weatherData = await weatherResponse.json();
                const forecastData = await forecastResponse.json();
                const dailyForecastData = forecastData.list.filter((reading: any) => reading.dt_txt.includes('12:00:00'));

                setWeather(weatherData);
                setDailyForecast(dailyForecastData.slice(0, 7));
                setCurrentDayIndex(dailyForecastData.findIndex((day: any) => formatDay(day.dt).dayIndex === new Date().getDay()));
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [city, apiKey]);

    const formatDay = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = date.getDay();
        const dayName = days[dayIndex];
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return { dayIndex, dayName, date: `${day} ${month}` };
    };

    const getRandomQuote = async () => {
        try {
            const response = await fetch(
                'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
            );
            if (response.ok) {
                const jsonQuotes = await response.json();
                const randomIndex = Math.floor(Math.random() * jsonQuotes.quotes.length);
                return jsonQuotes.quotes[randomIndex];
            } else {
                console.error('Error fetching quotes:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching quotes:', error);
            return null;
        }
    };

    const updateQuote = async () => {
        const { quote, author } = await getRandomQuote();
        setCurrentQuote(quote);
        setCurrentAuthor(author);
        changeBackgroundColor();
    };

    useEffect(() => {
        updateQuote();
    }, []);

    const getRandomHexColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getRandomGradient = () => {
        const color1 = getRandomHexColor();
        const color2 = getRandomHexColor();
        return `linear-gradient(135deg, ${color1} 10%, ${color2} 100%)`;
    };

    const changeBackgroundColor = () => {
        const gradient = getRandomGradient();
        setBackgroundColor(gradient);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`"${currentQuote}" - ${currentAuthor}`);
    };

    const shareQuote = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Quote',
                text: `"${currentQuote}" - ${currentAuthor}`,
            }).catch((error) => console.error('Error sharing', error));
        } else {
            alert('Share feature is not supported in your browser.');
        }
    };

    if (!weather || dailyForecast.length === 0 && !currentQuote) {
        return <div>Loading...</div>;
    }

    return (
        <div className="weather-app-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-xl-start">
            <div className="weather-side">
                <div className="weather-gradient" style={{ backgroundImage: backgroundColor }}></div>
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
            </div>
            <div className="info-side">
                <div className="info-side-top d-flex flex-column flex-xl-row gap-3">
                    <div className="ist-weather d-flex flex-column">
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
                                    <li key={day.dt} className={index === currentDayIndex ? 'active' : ''} onClick={() => handleWeekItemClick(index)}>
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
                    </div>


                    <div className="quote-box">
                        <div className="quote-text" style={{ backgroundImage: backgroundColor }}>
                            <span className="quote-icon"><FaQuoteLeft /></span>
                            {currentQuote}
                        </div>
                        <div className="quote-author" style={{ backgroundImage: backgroundColor }}>- {currentAuthor}</div>
                    </div>
                </div>

                <div className="d-flex flex-column flex-md-row gap-4 gap-md-2">
                    <div className="location-container d-flex gap-2 flex-grow-1">
                        <input type="text" id="city" className="form-control" value={inputCity} onChange={handleInputChange} />
                        <button className="location-button" onClick={handleButtonClick}>
                            <span style={{ backgroundImage: backgroundColor }}>Change location</span>
                        </button>
                    </div>

                    <div className="quote-btn-group d-flex flex-shrink-0 gap-2">
                        <button className="quote-btn share-btn" onClick={shareQuote} title="Share this quote">
                            <span><FiShare /></span>
                        </button>

                        <button className="quote-btn share-btn" onClick={copyToClipboard} title="Copy to clipboard">
                            <span><FiCopy /></span>
                        </button>

                        <button className="quote-btn" onClick={updateQuote} >
                            <span className="quote-btn-text" style={{ backgroundImage: backgroundColor }}>New quote</span>
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default WeatherCard;



