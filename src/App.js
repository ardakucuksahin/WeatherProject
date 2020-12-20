import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const KEY = '**YOUR KEY GOES HERE';
function App() {
  const [current, setCurrent] = useState({});
  const [location, setLocation] = useState({});
  const [city, setCity] = useState('London');

  useEffect(() => {
    if (city === '') {
      return alert("Please Provide a Valid City Name");
    }
    axios.get(`http://api.weatherstack.com/current?access_key=${KEY}&query=${city}`)

      .then((response) => {
        setCurrent(response.data.current);
        setLocation(response.data.location);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [city])


  let input = '';
  const inputChanger = (e) => {
    input = e.target.value;

  }

  const citySearcher = () => {
    setCity(input)
  }


  let context = null;
  if (location !== {} && current !== {}) {
    context = (
      <>{
        <tr>
          <td>{current?.temperature}°C</td>
          <td>{current?.weather_descriptions}</td>
          <td>{current?.feelslike}°C</td>
          <td>{current?.humidity}%</td>
          <td>{current?.wind_speed} km</td>
          <td>{current?.observation_time}</td>
        </tr>
      }</>
    )

  }


  return (
    <div className="App">

      <div className="input">
        <label><strong> Enter a city name:</strong></label><br></br><br></br>
        <input type="text" onChange={(e) => inputChanger(e)} />
        <button onClick={citySearcher}>Search</button>
      </div>


      <div className="card">
        <p className="country">{location?.country?.length > 18 ? null : location?.country}</p>
        <p className="name">{location?.name}</p>
        <p className="timezone">{location?.timezone_id}</p>
        <p className="localtime">{location?.localtime}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Weather</th>
            <th>Feelslike</th>
            <th>Humidity</th>
            <th>Wind Speed</th>
            <th>Recorded Time</th>
          </tr>
        </thead>
        <tbody>
          {context}
        </tbody>
      </table>
    </div>
  );

}

export default App;
