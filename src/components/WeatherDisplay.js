import React, { useState } from "react";

const WeatherDisplay = (data) => {

      const icon ="https://openweathermap.org/img/wn/" + data.icon +".png"

      return(
        <div className="weather">
            <p className="time">{data.date}</p>
            <p className="currentTemp">{data.temp}°</p>
            <p className="weatherIcon">{data.weather}<img className="icon" src={icon} /></p>
            <p>High: {data.temp_max}°</p>
            <p>Low: {data.temp_min}°</p>
            <p>Feels like: {data.feels}°</p>
            
        </div>
      )

}

export default WeatherDisplay;