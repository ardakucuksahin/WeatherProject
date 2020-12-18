import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

let key = '**YOUR KEY GOES HERE';
function App() {
  const [current, setCurrent] = useState({});
  const [location, setLocation] = useState({});
  const [city, setCity] = useState('London');

  useEffect(() => {
    console.log(key,"  ",city)
    axios.get(`http://api.weatherstack.com/current?access_key=${key}&query=${city}`)

      .then((response) => {
        console.log(response);
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
          <td>{current.temperature}</td>
          <td>{current.weather_descriptions}</td>
          <td>{current.feelslike}</td>
          <td>{current.humidity}</td>
          <td>{current.wind_speed}</td>
          <td>{current.observation_time}</td>
        </tr>
      }</>
    )

  }


  return (
    <div className="App">

      <div className="input">
        <input type="text" onChange={(e) => inputChanger(e)} />
        <button onClick={citySearcher }>Search</button>
      </div>


      <div className="card">
        <p className="country">{location.country}</p>
        <p className="name">{location.name}</p>
        <p className="timezone">{location.timezone_id}</p>
        <p className="localtime">{location.localtime}</p>
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
