import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

let key = '5e81621c07d80d707f0da6fac3115dce';
function App() {
  const [current, setCurrent] = useState({});
  const [location, setLocation] = useState({});
  
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${key}&query=London`)
      // 'https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key='+key+'&steamid='+id+'&relationship=friend'
      .then((response) => {
        console.log(response);
        setCurrent(response.data.current);
        setLocation(response.data.location);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
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
