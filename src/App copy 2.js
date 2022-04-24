import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function App() {

    const [weather, setWeather] = useState('');
    const [city, setCity] = useState('');
    const apiKey = process.env.REACT_APP_APIKEY;

    const apiCall = async (e) => {
        e.preventDefault()
        const loc = e.target.elements.loc.value
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;
        const req = axios.get(url);
        const res = await req;
        setWeather({
            descp: res.data.weather[0].description,
            temp: res.data.main.temp,
            city: res.data.name,
            humidity: res.data.main.humidity,
            press: res.data.main.pressure,
            wind: res.data.wind.speed,
        })

        setCity(res.data.name)

    }


    const Weath = () => {
        return <div className='app'>
                  
                    <div className="top">
                      <div className="location">
                          Weather information for {city}
                      </div>
        
                      <div className="description">
                          Weather : {weather.descp}
                      </div>

                    <div className="temp">
                    Temperature : {weather.temp.toFixed(1)}
                    </div>
                

                <div className='container'>
                <div className="bottom">
                  <div className="humidity">
                    Humidity :{weather.humidity} %
                  </div>
                  <div className="feels">
                    Pressure :  {weather.press} mb
                  </div>
                  <div className="wind">
                    Wind :  {weather.wind} kmh
                  </div>
                </div>
                </div>
            </div>
        </div>
        
    }
    return (
        <div className="app">
            <div className="search">
                <form onSubmit={apiCall} className="form">
                    <input type="text" 
                     placeholder="city" 
                     name="loc" />
                    <button className="bttn">Search</button>
                </form>

                {weather && <Weath />}
            </div>
        </div>

    )
}

export default App