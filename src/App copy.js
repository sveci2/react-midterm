import React, { useState } from 'react'
import axios from 'axios'



// OpenWeatherMap allows to use both metric and imperial units (could be swapped easily)
// use state takes two values (data and setData)
// another state useState takes location and setLocation (empty string)

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  // in the api I'm passing the location from input
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

// definiting the searchLocation by arrow function
//
// using axios - grabbing url, getting response and using arrow function we set data to responseData and console.log the response

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  // I created parent classes (app) and subclasses (search)
  // I had to check json file to see the name of the objects (i.e. location - data.name)
  // In case of temperature, temp is the child element of main. First I need to check if main data is available. If so, then I'm passing data
  // I need to round the temperature data.main.temp} using .toFixed(1) - rounded on one decimal number. No parameter, rounded whole number
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed(1)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed(1)}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed(1)} KMH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;