import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid=50e2d24fc4effb1bddcd455df63ca175';

  const options = {
    name : 'Location',
    country : 'Country',
    main : {
      temp : 0,
      feels_like : 0,
      humidity : 0,
    },
    wind : {
      speed : 0,
    },
    weather : [
      {
        main : 'Normal',
      },
    ],
  }

  const searchLocation = (e) => {
    if(e.key === 'Enter'){
      axios.get(url).then(res => {
        setData(res.data);
      })
    }
  }

  return (
    <div className='app'>
      <div className='search'>
        <input type='text' placeholder='Enter location' value={location} onChange={e => setLocation(e.target.value)} onKeyPress={searchLocation}/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name || options.name}</p>
            {data.sys ? <p>{data.sys.country}</p> : <p>{options.country}</p>}
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()-273}°C</h1> : <h1>{options.main.temp}°C</h1>}
          </div>
          <div className='desc'>
            {data.weather ? <p>{data.weather[0].main}</p> : <p>{options.weather[0].main}</p>}
          </div>
        </div>

        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p>{(data.main.feels_like.toFixed()-273)*9/5+32}°F</p> : <p>{options.main.feels_like}°F</p>}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p>{data.main.humidity}%</p> : <p>{options.main.humidity}%</p>}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : <p>{options.wind.speed} MPH</p>}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App