import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import WeatherDisplay from "./WeatherDisplay";
import Favorites from "./Favorites";

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "imperial");

  useEffect(() => {
    fetchFavorites();
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, [unit]);

  const fetchWeather = async (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
      );
      setCurrentWeather(currentWeatherResponse.data);
      setForecast(forecastResponse.data.list.filter((_, idx) => idx % 8 === 0));
      localStorage.setItem("lastCity", city);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:3001/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites", error);
    }
  };

  const addFavorite = async (city) => {
    try {
      await axios.post("http://localhost:3001/favorites", { city });
      fetchFavorites();
    } catch (error) {
      console.error("Error adding favorite", error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/favorites/${id}`);
      fetchFavorites();
    } catch (error) {
      console.error("Error removing favorite", error);
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === "imperial" ? "metric" : "imperial";
    setUnit(newUnit);
    localStorage.setItem("unit", newUnit);
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeather(lastCity);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weather Dashboard</h1>
      <button
        onClick={toggleUnit}
        className="bg-yellow-500 text-white p-2 rounded mb-4"
      >
        Toggle to {unit === "imperial" ? "Celsius" : "Fahrenheit"}
      </button>
      <Search fetchWeather={fetchWeather} />
      <WeatherDisplay
        currentWeather={currentWeather}
        forecast={forecast}
        addFavorite={addFavorite}
        unit={unit}
        favorites={favorites}
        removeFavorite={removeFavorite}
      />
      {currentWeather && (
        <Favorites
          favorites={favorites}
          fetchWeather={fetchWeather}
          removeFavorite={removeFavorite}
        />
      )}
    </div>
  );
};

export default WeatherDashboard;
