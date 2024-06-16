import React from "react";

const Favorites = ({ favorites, fetchWeather, removeFavorite }) => {
  return (
    <div className="favorites mt-4">
      <h2 className="text-2xl font-bold mb-2">Favorite Cities</h2>
      <ul className="list-disc list-inside">
        {favorites.map((city) => (
          <li key={city} className="flex justify-between items-center mb-2">
            <span className="text-blue-500 cursor-pointer" onClick={() => fetchWeather(city)}>
              {city}
            </span>
            <div>
              <button
                onClick={() => fetchWeather(city)}
                className="bg-green-500 text-white p-2 rounded mr-2"
              >
                Show
              </button>
              <button
                onClick={() => removeFavorite(city)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
