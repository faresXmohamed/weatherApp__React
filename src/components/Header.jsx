import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import "./style/header.css"
import Mode from './Mode';
const Header = () => {
  return (
    <header>
        <h1>
            <div className="weather-icon"><CloudIcon className='cloud' /> <WbSunnyIcon className='sun' /></div> Weather App
        </h1>
        <Mode />
    </header>
  )
}

export default Header