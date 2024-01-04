import React from "react";
const WeatherDisplay = (data) => {
    
    if(data) {
      return(
        <div className="weather">
          <h1 className="time">{data.time}</h1>
            <p>Highest temperature: {data.temp_max}</p>
            <p>Lowest temperature: {data.temp_min}</p>
            <p>Feels like: {data.feels}</p>
            <p>Humidity: {data.humidity}</p>
            <p>Pressure: {data.pressure}</p>
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
      
    }

}

export default WeatherDisplay;