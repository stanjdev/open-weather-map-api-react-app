import React from 'react';

export default function DisplayWeather({weatherData, tempUnit, errorDisplay}) {
  const {name, weather, main} = weatherData;
  return (
    <div>
      <h2>Weather for {name}</h2>
      <h3>{main && 'Temperature: ' + main.temp + ` ${tempUnit === 'imperial' ?
                                                      'F' : tempUnit === 'metric' ?
                                                      'C' : ''}`}
      </h3>
      <h4>{main && 'Feels like: ' + main.feels_like + ` ${tempUnit === 'imperial' ?
                                                            'F' : tempUnit === 'metric' ?
                                                            'C': ''}`}
      </h4>
      <h4>{weather && weather[0].description}
          {weather && <img alt="weather-icon"
                            src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                            height="60px"/>}
      </h4>
      <div>{errorDisplay && 'Error: ' + errorDisplay}</div>
    </div>
  );
};

