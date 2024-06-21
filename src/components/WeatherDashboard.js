import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import WeatherDisplay from "./WeatherDisplay";
import Favorites from "./Favorites";

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "metric");
  const userId = localStorage.getItem("userId") || null;

  // Create a new user if userId is not present in localStorage
  useEffect(() => {
    if (!userId) {
      createUser();
    } else {
      fetchFavorites();
      const lastCity = localStorage.getItem("lastCity");
      if (lastCity) {
        fetchWeather(lastCity);
      }
    }
  }, [unit]);

  // Refetch favorites when the current weather is updated
  useEffect(() => {
    if (currentWeather?.name) {
      fetchFavorites();
    }
  }, [currentWeather?.name]);

  const createUser = async () => {
    try {
      const response = await axios.post(
        "https://json-server-8j44.onrender.com/users",
        {
          name: "New User",
          favorites: [],
        }
      );
      localStorage.setItem("userId", response.data.id);
      setFavorites([]);
    } catch (error) {
      console.error("Error creating user", error);
    }
  };
  // function to filter forecast data based on the time of the first object
  const filterForecastByFirstObjTime = (forecastData) => {
    if (!forecastData) {
      return [];
    }

    const firstObjTime = forecastData[0].dt_txt.split(" ")[1];
    return forecastData.filter((data) => data.dt_txt.endsWith(firstObjTime));
  };

  // Fetch weather data for a specific city
  const fetchWeather = async (city) => {
    console.log("hi")
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
      );
      setCurrentWeather(currentWeatherResponse.data);
      const filteredForecast = filterForecastByFirstObjTime(
        forecastResponse?.data?.list
      );
      setForecast(filteredForecast);
      localStorage.setItem("lastCity", city);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `https://json-server-8j44.onrender.com/users/${userId}`
      );
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("Error fetching favorites", error);
    }
  };

  const addFavorite = async (city) => {
    if (favorites.includes(city)) return; // Prevent duplicate cities
    try {
      const updatedFavorites = [...favorites, city];
      await axios.patch(
        `https://json-server-8j44.onrender.com/users/${userId}`,
        { favorites: updatedFavorites }
      );
      fetchFavorites();
    } catch (error) {
      console.error("Error adding favorite", error);
    }
  };

  const removeFavorite = async (city) => {
    try {
      const updatedFavorites = favorites.filter((fav) => fav !== city);
      await axios.patch(
        `https://json-server-8j44.onrender.com/users/${userId}`,
        { favorites: updatedFavorites }
      );
      fetchFavorites();
    } catch (error) {
      console.error("Error removing favorite", error);
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === "imperial" ? "metric" : "imperial";
    setUnit(newUnit);
    localStorage.setItem("unit", newUnit);
 
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
