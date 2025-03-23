'use client'
import React, { useState, useEffect } from 'react';
import './BreezyWords.css';
import Banner from '../components/Banner/Banner'
import ContentContainer from '../components/ContentContainer'
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaQuoteLeft } from 'react-icons/fa';
import { FiShare, FiCopy } from "react-icons/fi";
import MouseFollower from '../components/MouseFollower';

const BreezyWords = () => {
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
        alert('Quote copied to clipboard!!!');
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
        <>
            <Banner bgImage='../inner-hero-img.jpg'>
                Breezy Words App
            </Banner>
            <ContentContainer background="dark">
                <div className="quote-weather-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-xl-start">
                    <div className="qw-today-box d-flex flex-column flex-sm-row flex-lg-column justify-content-between gap-2">
                        <div className="qw-gradient-bg" style={{ backgroundImage: backgroundColor }}></div>
                        <div className="qw-date-box d-flex flex-column gap-2">
                            <h2>{formatDay(weather.dt).dayName}</h2>
                            <h6>{formatDay(weather.dt).date}</h6>
                            <div className="qw-location-row d-flex align-items-center gap-1">
                                <i className="qw-location-icon d-flex align-items-center justify-content-center"><HiOutlineLocationMarker /></i>
                                <h6 className="mb-0">{weather.name}</h6>
                            </div>
                        </div>
                        <div className="qw-weather-box d-flex flex-column gap-2">
                            <i className="qw-weather-icon">
                                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                                    alt="Weather Icon" />
                            </i>
                            <h1>{Math.round(weather.main.temp - 273.15)}°C</h1>
                            <h4>{weather.weather[0].main}</h4>
                        </div>
                    </div>
                    <div className="qw-info-box d-flex flex-column gap-2">
                        <div className="qw-info-top d-flex flex-column flex-xl-row gap-2">
                            <div className="qw-other-info d-flex flex-column flex-md-row flex-xl-column gap-2">
                                <div className="qw-today-info d-flex flex-column gap-2 flex-grow-1">
                                    <div className="qw-info-row">
                                        <span className="qw-info-title">PRECIPITATION</span>
                                        <span className="qw-info-value">{dailyForecast[0].clouds.all} %</span>
                                    </div>
                                    <div className="qw-info-row">
                                        <span className="qw-info-title">HUMIDITY</span>
                                        <span className="qw-info-value">{weather.main.humidity}%</span>
                                    </div>
                                    <div className="qw-info-row">
                                        <span className="qw-info-title">WIND</span>
                                        <span className="qw-info-value">{Math.round(weather.wind.speed * 1.60934)} km/h</span>
                                    </div>
                                </div>

                                <ul className="qw-week-row d-flex">
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

                            <div className="qw-quote-box d-flex flex-column">
                                <span className="qw-quote-icon"><FaQuoteLeft /></span>
                                <div className="qw-quote-text" style={{ backgroundImage: backgroundColor }}>
                                    {currentQuote}
                                </div>
                                <div className="qw-quote-author mt-auto" style={{ backgroundImage: backgroundColor }}>- {currentAuthor}</div>
                            </div>
                        </div>

                        <div className="qw-action-row d-flex flex-column flex-md-row gap-2">
                            <div className="qw-location-group d-flex flex-column flex-sm-row gap-2 flex-grow-1">
                                <input type="text" id="city" className="form-control" placeholder="Enter city name" value={inputCity} onChange={handleInputChange} />
                                <button className="qw-action-btn lg" onClick={handleButtonClick}>
                                    <span className="qw-action-text" style={{ backgroundImage: backgroundColor }}>Change location</span>
                                </button>
                            </div>

                            <div className="quote-btn-group d-flex flex-shrink-0 gap-2">
                                <button className="qw-action-btn" onClick={shareQuote} title="Share this quote">
                                    <span className="qw-action-icon"><FiShare /></span>
                                </button>

                                <button className="qw-action-btn" onClick={copyToClipboard} title="Copy to clipboard">
                                    <span className="qw-action-icon"><FiCopy /></span>
                                </button>

                                <button className="qw-action-btn lg" onClick={updateQuote} >
                                    <span className="qw-action-text" style={{ backgroundImage: backgroundColor }}>New quote</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentContainer>
            <MouseFollower />
        </>
    );
}

export default BreezyWords;



