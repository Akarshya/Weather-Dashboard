# Weather Dashboard

## Prerequisites
Before you begin, ensure you have the following installed:

- [Node.js (v14 or higher)]
- [npm (v6 or higher)]
- [Visual Studio Code]

## Description
A weather dashboard application that shows the current weather and a 5-day forecast for a given city. Users can manage a list of favorite cities and toggle between Celsius and Fahrenheit.

## Features
- Search for a city and display the current weather and 5-day forecast.
- Add cities to a list of favorites.
- Remove cities from the list of favorites.
- Display weather data for favorite cities.
- Remember the user's last searched city using local storage.
- Toggle between Celsius and Fahrenheit.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Akarshya/Weather-Dashboard.git
    cd weather-dashboard
    ```

2. Install dependencies:
    ```bash
    npm install
    npm i dotenv
    ```

3. Install the JSON server:
    ```bash
    npm i json-server
    ```

4. Start the React application:
    ```bash
    npm start
    ```

5. Obtain an API key from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) and create a `.env` file in the root directory of your project with the following line:
   ```plaintext
   REACT_APP_WEATHER_API_KEY=your_api_key_here


## Usage
- Enter a city name in the search bar and click "Get Weather" to view the current weather and 5-day forecast.
- Click "Add to Favorites" to save the city to your favorites list.
- Click "Remove" to remove a city from your favorites list.
- Click "Toggle to Celsius/Fahrenheit" to switch between temperature units.
