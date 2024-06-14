import React, { useState } from "react";

const Search = ({ fetchWeather }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    fetchWeather(city);
    setCity("");
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter the name of a city"
        className="border p-2 rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded ml-2"
      >
        Get Weather
      </button>
    </div>
  );
};

export default Search;
