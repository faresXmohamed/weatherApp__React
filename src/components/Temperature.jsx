import "./style/temperature.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloudIcon from '@mui/icons-material/Cloud';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import { WeatherProvider } from './Context/ContextFile';

import { useContext } from "react";

const Temperature = () => {

const { loding , weatherData } = useContext(WeatherProvider);

  return (
    <>
    <div className="temperature">
        <div className="city"><LocationOnIcon className="icon" /> {weatherData.city}</div>
        <div className="infoTemp">
            <div className="temp">
                <div className="icon"><CloudIcon className="iconsm" /><CloudIcon className="iconlg" /></div>
                {weatherData.temperature}°
            </div>
            <div className="weather">
                <CloudIcon /> {weatherData.condition}
            </div>
        </div>
        <div className="details">
            <span><WaterDropIcon style={{color:"#4079ffcc"}} /> Humidity: {weatherData.humidity}%</span>
            <span><AirIcon /> Wind: {weatherData.windSpeed} km/h</span>
        </div>
    </div>
    { loding && <div className="loding">Loading...</div>}
    </>
  )
}

export default Temperature