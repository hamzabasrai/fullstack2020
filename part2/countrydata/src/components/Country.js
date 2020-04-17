import React, { useEffect, useState } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`
      );
      const currentData = response.data.current;
      setWeather({
        temp: currentData.temperature,
        wind: currentData.wind_speed,
        windDir: currentData.wind_dir,
        iconUrl: currentData.weather_icons[0],
      });
    };
    fetchWeather();
  }, [country]);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        style={{ maxWidth: "35%" }}
        src={country.flag}
        alt={`Flag of ${country.name}`}
      />
      <h3>Weather in {country.capital}</h3>
      <p>Temperature: {weather.temp} °C</p>
      <img src={weather.iconUrl} alt="weather icon" />
      <p>
        Wind: {weather.wind} mph {weather.windDir}
      </p>
    </div>
  );
};

export default Country;
