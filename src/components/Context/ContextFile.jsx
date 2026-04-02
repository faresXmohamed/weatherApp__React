import { useState , createContext , useEffect } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';

export const ModeProvider = createContext(""); 
export const LocationProvider = createContext("");
export const WeatherProvider = createContext("");
export const CurrentLocationProvider = createContext("");

const success = () => toast.success('success');
const error = () => toast.error('The search was unsuccessful');
const ContextFile = ({ children }) => {
    const [mode, setMode] = useState(`${window.localStorage.getItem("mode") ? window.localStorage.getItem("mode") : "light"}`);
    const [location, setLocation] = useState({});
    const [weatherData, setWeatherData] = useState({
        city: "city name",
        temperature: 0,
        condition: "condition",
        humidity: 0,
        windSpeed: 0,
    });
    const [loding, setLoading] = useState(false);
        const [currentLocation, setCurrentLocation] = useState({lat: null, lon: null });


    useEffect(()=>{
        window.localStorage.setItem("mode", mode);
    },[mode]);

    useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    setCurrentLocation({lat, lon });
});
},[]);

let cancelApiCall=null;
    useEffect(()=>{
        const fetchWeatherData= async () =>{
            try{
                setLoading(true);
                const apiKey =`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.lat}&lon=${currentLocation.lon}&appid=177c36be1bc28aa98a69f6d75cd58eca` ;
                const response = await axios.get(apiKey,
                    {
                        cancelToken: new axios.CancelToken(c => cancelApiCall = c)
                    }
                );
                setWeatherData({
                    city: response.data.name,
                    temperature: Math.round(response.data.main.temp - 273.15),
                    condition: response.data.weather[0].main,
                    humidity: response.data.main.humidity,
                    windSpeed: response.data.wind.speed
                })
                success();
            }catch(err){
                error();
            }
            finally{
                setLoading(false);
            }
        };

        if(currentLocation.lat && currentLocation.lon){
            fetchWeatherData();
        }

        return () =>{
            if(cancelApiCall){
                cancelApiCall();
            }
        }
    },[currentLocation]);
    













  return (
    <ModeProvider.Provider value={{ mode, setMode }}>
        <LocationProvider.Provider value={{ location, setLocation }}>
            <WeatherProvider.Provider value={{ loding , weatherData, setWeatherData }}>
                <CurrentLocationProvider.Provider value={{ currentLocation, setCurrentLocation }}>
                    {children}
                </CurrentLocationProvider.Provider>
            </WeatherProvider.Provider>
        </LocationProvider.Provider>
    </ModeProvider.Provider>
  )
}

export default ContextFile