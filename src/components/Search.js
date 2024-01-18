import React, {useState} from "react";
import axios from "axios";
import WeatherDisplay from "./WeatherDisplay";
import Events from "./Events"


const RADAR_API_KEY = "prj_test_pk_bc98832a3852b7f7969e08b3d319fd70e13d2d77";
const WEATHER_API_KEY = "18a3631b896350dd1d53a177819cffbd";
const SEATGEEK_API_KEY = "Mzk0NjkwMTF8MTcwNTM0NTMyMC41OTc3NTEx";

const Search = ({onSearch}) => {
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [cityName, setCityName] = useState()
    const [weatherData, setWeatherData] = useState([]);
    const [eventData, setEventData] = useState([])

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

    const handleClick = () => {
        setButtonClicked(true)
    }

    const getEvents = async(lat,lon) => {
        try {
        let res = await axios.get("https://api.seatgeek.com/2/events", {
            params: {
                client_id: SEATGEEK_API_KEY,
                lat: lat,
                lon: lon
            }
        })
        return res.data.events;
        }
        catch (error) {
            console.log(error)
            return error
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
        let events = await getEvents(lat,lon)
        setWeatherData(main);
        setCityName(location.toUpperCase())
        console.log(main)
        setEventData(events)
        console.log(events)
    }



    return(
        
        <div className="search">
        <form onSubmit={handleSubmit} >
            <input type="text" id="lname" name="city" 
            value={location} onChange={(e) => 
            setLocation(e.target.value)} placeholder="city name..."/>
            <button className="button" type="submit" onClick={handleClick}></button>
        </form>
        {isButtonClicked? <h2 className="description">{cityName}</h2> : <h2 className="description">Brings Up Five Days of Forecasts with Events in your City</h2>}
        
        <div className="weatherDetail">
        {weatherData.filter((_, index) => (index) % 8 === 0).map(data => {
            
            return (
                    <WeatherDisplay 
                    key={data.main.id}
                    date={data.dt_txt.split(" ")[0].slice(5)}
                    weather={data.weather[0].main}
                    icon={data.weather[0].icon}
                    feels={data.main.feels_like}
                    temp={data.main.temp}
                    temp_max={data.main.temp_max}
                    temp_min={data.main.temp_min}
                    />
            )
        })}
        </div>
        <div className="eventDetail">
            
            {eventData.map(events => {
                return (
                    <Events 
                        key={events.id}
                        date={events.datetime_utc.split("T")[0].slice(5)}
                        place={events.venue.name}
                        address={events.venue.address}
                        performers={events.performers[0].name}
                        image={events.performers[0].image}
                    />
                )
            })}
            

        </div>
        </div>
    )
}

export default Search;