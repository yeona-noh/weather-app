import React, {useState} from "react";
import axios from "axios";
import WeatherDisplay from "./WeatherDisplay";

const RADAR_API_KEY = "prj_test_pk_bc98832a3852b7f7969e08b3d319fd70e13d2d77";
const WEATHER_API_KEY = "18a3631b896350dd1d53a177819cffbd";
const Search = ({onSearch}) => {

    const [weatherData, setWeatherData] = useState([]);

    const getCoordinate = async (city) => {
        try {
            let res = await axios.get("https://api.radar.io/v1/geocode/forward",{
                params: { query: city },
                headers: { Authorization: RADAR_API_KEY }

            });
            let lat = res.data.addresses[0].latitude;
            let lon = res.data.addresses[0].longitude;
            return {lat,lon}
        }

        catch (error) {
            console.log(error)
            return error
        }
        
    };

        const getCurrentWeather = async (lat,lon) => {
        try {
            let response = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
                params: { 
                    lat: lat,
                    lon: lon,
                    appid: WEATHER_API_KEY,
                    units: "imperial"
                }
            });

            return response.data.list;
            
        } catch(error) {
            console.log(error)
            return error;
        }
    }

    const [location, setLocation] = useState("");

    const handleSubmit = async (event) => {
        if (location) {
                onSearch(location);
                setLocation('');
              }
        event.preventDefault();
        let {lat,lon} = await getCoordinate(location)
        let main = await getCurrentWeather(lat,lon)
        // console.log(lat)
        // console.log(lon)
        console.log(main);
        setWeatherData(main);
        console.log(location)
    }

    return(
        
        <div className="search">
        <form onSubmit={handleSubmit} >
            <input type="text" id="lname" name="lname" 
            value={location} onChange={(e) => 
            setLocation(e.target.value)} placeholder="type city name..."/>
            <button className="button" type="submit"></button>

        </form>
        <h2 className="description">Brings Up Five Days of Forecasts</h2>
               
        <div className="weatherDetail">
        {weatherData.filter((_, index) => (index) % 8 === 0).map(data => {
            
            return (
                    <WeatherDisplay 
                    key={data.main.id}
                    time={data.dt_txt.split(" ")[0]}
                    feels={data.main.feels_like}
                    humidity={data.main.humidity}
                    pressure={data.main.pressure}
                    temp={data.main.temp}
                    temp_max={data.main.temp_max}
                    temp_min={data.main.temp_min}
                    />
            )
        })}
        </div>
        </div>
    )
}

export default Search;