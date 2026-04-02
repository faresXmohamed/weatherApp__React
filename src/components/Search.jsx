import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { WeatherProvider , CurrentLocationProvider ,LocationProvider } from './Context/ContextFile';
import { useState , useContext } from 'react';
import "./style/search.css";

const Search = () => {

const { location, setLocation } = useContext(LocationProvider);
const { currentLocation , setCurrentLocation } = useContext(CurrentLocationProvider);


const [options, setOptions] = useState([]);
let timeout;
const handleSearch = (value) => {
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
        if (!value || value.length < 2) {
        setOptions([]);
        return;
        }

        const res = await fetch(
        `https://secure.geonames.org/searchJSON?q=${value}&maxRows=10&username=farescodex`
        );

        const data = await res.json();
        setOptions(data.geonames || []);
    }, 400);
    setLocation(value);
};



return (
<>
    <div className='search item-center'>
    <Autocomplete 
    className='inputSelect'
    sx={{ width: 300 }}
    options={options}
    autoHighlight
    onInputChange={(e, value) => handleSearch(value)}

    onChange={(e, value) => {
        if (value) {
            setLocation({
            lat: value.lat,
            lon: value.lng
            });
        }
    }}

    getOptionLabel={(option) => {
        if (!option.name) return "";
        return `${option.name}, ${option.countryCode}`;
    }}

    renderOption={(props, option) => (
    <Box
        component="li"
        {...props}
        key={`${option.name}-${option.lat}-${option.lng}`}
    >
        {option.fcode === "PCLI" ? "🌍" : "🏙️"} 
        {option.name}, {option.countryCode}
    </Box>
    )}
    
    renderInput={(params) => (
        <TextField className='searchInbut' {...params} label="Select country or city" />
    )}
    />
        <Button type='button' variant="contained" endIcon={<SearchIcon className='icon' />} className='submit' onClick={() => setCurrentLocation({ ...location }) }>
        Search
        </Button>
    </div>
</>
);
};

export default Search;