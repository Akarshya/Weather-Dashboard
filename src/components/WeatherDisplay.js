import React from "react";
import { FaHeart } from "react-icons/fa";

const WeatherDisplay = ({
  currentWeather,
  forecast,
  addFavorite,
  unit,
  favorites,
  removeFavorite,
}) => {
  const unitSymbol = unit === "imperial" ? "F" : "C";

  const isFavorite = favorites.includes(currentWeather?.name);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(currentWeather?.name);
    } else {
      addFavorite(currentWeather?.name);
    }
  };

  return (
    <div className="weather-display mb-4">
      {currentWeather && (
        <>
          <div className="current-weather bg-blue-200 p-4 rounded relative flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {currentWeather.name} (
                {new Date(currentWeather.dt * 1000).toLocaleDateString()})
              </h2>
              <p>
                Current Conditions:{" "}
                {currentWeather.weather[0].description.toUpperCase()}
              </p>
              <p>
                Current Temp ({unitSymbol}): {currentWeather.main.temp}
              </p>
              <p>
                Expected High ({unitSymbol}): {currentWeather.main.temp_max}
              </p>
              <p>Humidity: {currentWeather.main.humidity}%</p>
              <p>
                Wind Speed: {currentWeather.wind.speed}{" "}
                {unit === "imperial" ? "mph" : "m/s"}
              </p>
            </div>
            <div className="flex-shrink-0">
              <img
                src={`https://openweathermap.org/img/wn/10d@2x.png`}
                alt="Weather Icon"
                className="mt-2"
              />
            </div>
            <button onClick={toggleFavorite} className="absolute top-2 right-2">
              {isFavorite ? (
                <FaHeart size={24} className="text-red-500" />
              ) : (
                <FaHeart size={24} className="text-white" />
              )}
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold mt-6">5-Day Forecast:</h2>
            <div className="forecast mt-2 grid grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className="forecast-day bg-gray-200 p-4 rounded flex flex-col items-center"
                >
                  <h3 className="font-bold">
                    {new Date(day.dt * 1000).toLocaleDateString()}
                  </h3>
                  <img
                    src={`https://openweathermap.org/img/wn/10d@2x.png`}
                    alt="Weather Icon"
                    className="mt-2"
                  />
                  <p>
                    Temp ({unitSymbol}): {day.main.temp}
                  </p>
                  <p>Hum: {day.main.humidity}%</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherDisplay;
