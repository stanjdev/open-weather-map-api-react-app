import DisplayWeather from './DisplayWeather.js';
import React, {useState} from 'react';
const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

export default function Weather() {
  const [zipCode, setZipCode] = useState('');
  const [tempUnit, setTempUnit] = useState('imperial');
  const [errorDisplay, setErrorDisplay] = useState('');
  const [weatherData, setWeatherData] = useState({});

  async function getWeather(evt) {
    evt.preventDefault();
    if (zipCode.length < 5 || isNaN(zipCode)) {
      return setErrorDisplay('Zip Code must be 5 digits long, and only numbers!')
    } else {
      setErrorDisplay('')
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apikey}&units=${tempUnit}`
      )
      const data = await res.json()
      if (data.message) {
        return setErrorDisplay(data.message)
      } else {
        setErrorDisplay('')
      }
      setWeatherData(data)
    } catch (err) {
      console.error(err.message)
      return setErrorDisplay(err.message)
    }
  };

  return (
    <div>
      {weatherData && <DisplayWeather weatherData={weatherData} tempUnit={tempUnit} errorDisplay={errorDisplay} />}

      <form onSubmit={getWeather}>
        <div className='capsule'>
          <input
            type="text"
            placeholder='Enter your zip code'
            maxLength="5"
            onChange={(evt) => setZipCode(evt.target.value)}
          />
          <input type="submit" value="Submit"/>
        </div>

        <div className="temp-units" onChange={(evt) => setTempUnit(evt.target.value)}>
          <div>
            <input
              type="radio"
              id="imperial"
              name="temperature_unit"
              value="imperial"
              defaultChecked={tempUnit === 'imperial'}
            />
            <label htmlFor="imperial">imperial (&deg;F)</label>
          </div>
          <div>
            <input
              type="radio"
              id="metric"
              name="temperature_unit"
              value="metric"
              defaultChecked={tempUnit === 'metric'}
            />
            <label htmlFor='metric'>metric (&deg;C)</label>
          </div>
          <div>
            <input
              type="radio"
              id="standard"
              name="temperature_unit"
              value="standard"
              defaultChecked={tempUnit === 'standard'}
            />
            <label htmlFor="standard">standard</label>
          </div>
        </div>
      </form>
    </div>
  );
};
