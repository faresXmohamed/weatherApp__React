import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useContext } from 'react';
import { ModeProvider} from './Context/ContextFile';

const Mode = () => {
    const { mode, setMode } = useContext(ModeProvider);
    function toggleMode(e){
        if(e.currentTarget.classList.contains("lightMode")){
            setMode("light");
        }else{
            setMode("dark");
        }
    }
  return (
    <div className="mode">
        <div className={`lightMode ${mode === "light" ? "active": ""}`} onClick={toggleMode}>
            <WbSunnyIcon />
        </div>
        <div className={`darkMode ${mode === "dark" ? "active": ""}`} onClick={toggleMode}>
            <ModeNightIcon />
        </div>
    </div>
  )
}

export default Mode