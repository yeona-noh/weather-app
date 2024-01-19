import React from "react";
import "./weatherdisplay.css"

const WeatherDisplay = (data) => {

      const icon ="https://openweathermap.org/img/wn/" + data.icon +".png"
      const weatherBackgrounds = {
        "Clear": "../img/sun.jpg",
        "Clouds": "../img/cloudy.jpg",
        "Rain": "../img/rain.jpg",
        "Snow": "../img/snow.jpg"
      }
      const backgroundImage = weatherBackgrounds[data.weather]
      const backgroundStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL 
          + backgroundImage })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }

      return(
        <div className="weather" style={backgroundStyle}>
            <p className="time">{data.date}</p>
            <p className="currentTemp">{data.temp}°</p>
            <p className="weatherIcon">{data.weather}<img className="icon" src={icon} alt="weather icon"/></p>
            <p>High: {data.temp_max}°</p>
            <p>Low: {data.temp_min}°</p>
            <p>Feels like: {data.feels}°</p>
            
        </div>
      )

}

export default WeatherDisplay;