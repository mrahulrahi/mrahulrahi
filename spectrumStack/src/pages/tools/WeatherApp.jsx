import { useState, useEffect } from 'react';
import { HiOutlineLocationMarker } from "react-icons/hi";

const WeatherApp = (gradientColor ) => {
    const [weather, setWeather] = useState(null);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [city, setCity] = useState('Lucknow');
    const [inputCity, setInputCity] = useState('');
    const apiKey = 'be3a0ff29ba77031d805f92ea6dc23fb';
    const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay());

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
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);

                if (!weatherResponse.ok || !forecastResponse.ok) {
                    throw new Error('Weather data not available');
                }

                const weatherData = await weatherResponse.json();
                const forecastData = await forecastResponse.json();
                const dailyForecastData = forecastData.list.filter((reading) => reading.dt_txt.includes('12:00:00'));

                setWeather(weatherData);
                setDailyForecast(dailyForecastData.slice(0, 7));
                setCurrentDayIndex(dailyForecastData.findIndex((day) => formatDay(day.dt).dayIndex === new Date().getDay()));
            } catch (error) {
                console.error('Error fetching weather data:', error);
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

    if (!weather || dailyForecast.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="weather-wrapper d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-xl-start">
            <div className="weather-today-box d-flex flex-column flex-sm-row flex-lg-column justify-content-between gap-2">
                <div className={`weather-gradient-bg ${gradientColor}`}></div>
                <div className="weather-date-box d-flex flex-column gap-2">
                    <h2>{formatDay(weather.dt).dayName}</h2>
                    <h6>{formatDay(weather.dt).date}</h6>
                    <div className="weather-location-row d-flex align-items-center gap-1">
                        <i className="weather-location-icon d-flex align-items-center justify-content-center"><HiOutlineLocationMarker /></i>
                        <h6 className="mb-0">{weather.name}</h6>
                    </div>
                </div>
                <div className="weather-weather-box d-flex flex-column gap-2">
                    <i className="weather-weather-icon">
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                            alt="Weather Icon" />
                    </i>
                    <h1>{Math.round(weather.main.temp - 273.15)}°C</h1>
                    <h4>{weather.weather[0].main}</h4>
                </div>
            </div>
            <div className="weather-info-box d-flex flex-column gap-2">
                <div className="weather-info-top d-flex flex-column flex-xl-row gap-2">
                    <div className="weather-other-info d-flex flex-column flex-md-row flex-xl-column gap-2">
                        <div className="weather-today-info d-flex flex-column gap-1 flex-grow-1">
                            <div className="weather-info-row">
                                <span className="weather-info-title">PRECIPITATION</span>
                                <span className="weather-info-value">{dailyForecast[0].clouds.all} %</span>
                            </div>
                            <div className="weather-info-row">
                                <span className="weather-info-title">HUMIDITY</span>
                                <span className="weather-info-value">{weather.main.humidity}%</span>
                            </div>
                            <div className="weather-info-row">
                                <span className="weather-info-title">WIND</span>
                                <span className="weather-info-value">{Math.round(weather.wind.speed * 1.60934)} km/h</span>
                            </div>
                        </div>

                        <ul className="weather-week-row d-flex">
                            {dailyForecast.map((day, index) => (
                                <li key={day.dt} className={`d-flex flex-column gap-1 ${index === currentDayIndex ? 'active' : ''}`} onClick={() => handleWeekItemClick(index)}>
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

                <div className="weather-action-row d-flex flex-column flex-md-row gap-2">
                    <div className="weather-location-group d-flex flex-column flex-sm-row gap-2 flex-grow-1">
                        <input type="text" id="city" className="form-control" placeholder="Enter city name" value={inputCity} onChange={handleInputChange} />
                        <button className="btn-transparent lg" onClick={handleButtonClick2}>
                            <span className={`btn-transparent-text bg-clip-text text-transparent ${gradientColor}`}>Change location</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp