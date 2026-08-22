'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useGradient } from '@/app/context/GradientContext';

const WeatherWidget = () => {
    const context = useGradient();
    const gradientStyle = context ? context.gradientStyle : { backgroundImage: 'linear-gradient(to right, #00DC82, #00B159)' };

    const [weather, setWeather] = useState(null);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [city, setCity] = useState('Lucknow');
    const [inputCity, setInputCity] = useState('');
    const apiKey = 'be3a0ff29ba77031d805f92ea6dc23fb';
    const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay());
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setInputCity(event.target.value);
    };

    const handleButtonClick2 = () => {
        setCity(inputCity);
    };

    const handleWeekItemClick = (index) => {
        setCurrentDayIndex(index);
        setWeather(dailyForecast[index]);
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setError(null);
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);

                if (!weatherResponse.ok || !forecastResponse.ok) {
                    throw new Error('City location not found or weather data not available');
                }

                const weatherData = await weatherResponse.json();
                const forecastData = await forecastResponse.json();
                const dailyForecastData = forecastData.list.filter((reading) => reading.dt_txt.includes('12:00:00'));

                setWeather(weatherData);
                setDailyForecast(dailyForecastData.slice(0, 7));
                setCurrentDayIndex(dailyForecastData.findIndex((day) => formatDay(day.dt).dayIndex === new Date().getDay()));
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setError(error.message);
            }
        };

        fetchWeatherData();
    }, [city, apiKey]);

    const formatDay = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = date.getDay();
        const dayName = days[dayIndex];
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return { dayIndex, dayName, date: `${day} ${month}` };
    };

    if (error) {
        return (
            <div className="weather-app py-5 px-5 text-center flex flex-col items-center justify-center min-h-75 gap-4 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md">
                <div className="text-red-500 font-bold tracking-wide text-lg bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-2xl max-w-md">
                    {error}
                </div>
                <div className="weather-location-group flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2">
                    <input type="text" id="city" className="form-control grow bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2" placeholder="Enter city name" value={inputCity} onChange={handleInputChange} />
                    <button className="btn-transparent lg px-4 py-2 border border-slate-800 rounded-xl" onClick={handleButtonClick2}>
                        <span className="btn-transparent-text bg-clip-text text-transparent" style={gradientStyle}>Try another location</span>
                    </button>
                </div>
            </div>
        );
    }

    if (!weather || dailyForecast.length === 0) {
        return <div className="p-10 text-center font-bold tracking-widest text-slate-400 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md">Loading Weather...</div>;
    }

    return (
        <div className="weather-app py-3 px-3 md:py-5 md:px-5 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md w-full">
            <div className="weather-wrapper flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-6">
                <div className="weather-today-box flex flex-col sm:flex-row lg:flex-col justify-between gap-4 w-full lg:w-auto">
                    <div className="weather-gradient-bg h-2 w-full rounded-full" style={gradientStyle}></div>
                    <div className="weather-date-box flex flex-col gap-1">
                        <h2 className="text-2xl font-bold">{formatDay(weather.dt).dayName}</h2>
                        <h6 className="text-xs text-slate-400">{formatDay(weather.dt).date}</h6>
                        <div className="weather-location-row flex items-center gap-1.5 text-slate-300 mt-1">
                            <HiOutlineLocationMarker className="w-4 h-4 text-brand-mint" />
                            <h6 className="mb-0 text-sm font-semibold">{weather.name}</h6>
                        </div>
                    </div>
                    <div className="weather-weather-box flex flex-col gap-1">
                        <i className="weather-weather-icon flex justify-center items-center bg-slate-950/50 p-2 rounded-2xl w-16 h-16 border border-slate-800">
                            <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                                alt="Weather Icon" width={50} height={50} unoptimized />
                        </i>
                        <h1 className="text-3xl font-black mt-2">{Math.round(weather.main.temp - 273.15)}°C</h1>
                        <h4 className="text-sm text-slate-400 font-bold uppercase tracking-wider">{weather.weather[0].main}</h4>
                    </div>
                </div>
                
                <div className="weather-info-box flex flex-col gap-4 grow w-full">
                    <div className="weather-info-top flex flex-col gap-3">
                        <div className="weather-other-info flex flex-col gap-3">
                            <div className="weather-today-info flex flex-col gap-2 grow bg-slate-950/40 border border-slate-800 p-4 rounded-2xl">
                                <div className="weather-info-row flex justify-between text-xs">
                                    <span className="weather-info-title text-slate-500 font-mono">PRECIPITATION</span>
                                    <span className="weather-info-value font-bold">{dailyForecast[0].clouds.all} %</span>
                                </div>
                                <div className="weather-info-row flex justify-between text-xs">
                                    <span className="weather-info-title text-slate-500 font-mono">HUMIDITY</span>
                                    <span className="weather-info-value font-bold">{weather.main.humidity}%</span>
                                </div>
                                <div className="weather-info-row flex justify-between text-xs">
                                    <span className="weather-info-title text-slate-500 font-mono">WIND</span>
                                    <span className="weather-info-value font-bold">{Math.round(weather.wind.speed * 1.60934)} km/h</span>
                                </div>
                            </div>

                            <ul className="weather-week-row flex gap-2 overflow-x-auto pb-2">
                                {dailyForecast.map((day, index) => (
                                    <li key={day.dt} className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all cursor-pointer min-w-16 ${index === currentDayIndex ? 'bg-brand-mint/10 border-brand-mint/30 text-white' : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700'}`} onClick={() => handleWeekItemClick(index)}>
                                        <Image
                                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                                            alt="Day Icon"
                                            width={40}
                                            height={40}
                                            unoptimized
                                        />
                                        <span className="day-name font-mono text-[10px] uppercase">{formatDay(day.dt).dayName.slice(0, 3)}</span>
                                        <span className="day-temp font-bold text-xs">{Math.round(day.main.temp - 273.15)}°C</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="weather-action-row flex flex-col md:flex-row gap-2 pt-2 border-t border-slate-800/40">
                        <div className="weather-location-group flex flex-col sm:flex-row gap-2 grow">
                            <input type="text" id="city" className="form-control bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-sm grow" placeholder="Enter city name" value={inputCity} onChange={handleInputChange} />
                            <button className="btn-transparent lg px-4 py-2 border border-slate-800 rounded-xl text-sm shrink-0" onClick={handleButtonClick2}>
                                <span className="btn-transparent-text bg-clip-text text-transparent font-bold" style={gradientStyle}>Change location</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
