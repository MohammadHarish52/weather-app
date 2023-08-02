import { useEffect, useState } from 'react';
import coldbg from './Assets/cold2.jpg'
import HotBg from './Assets/hot.jpg'
import Description from './Components/Description';
import { GetformattedWeatherData } from './Components/WeatherService';


function App() {

  const[city,setCity] = useState('delhi')

  const[weather,setWeather] = useState(null);
  const[units,setUnits] = useState('metric');
  const[bg,setbg] = useState(HotBg);
  const [isLoading, setIsLoading] = useState(true);

useEffect(()=>{
  const fetchWeatherData = async () =>{

    setIsLoading(true);

    // const data = await GetformattedWeatherData(city,units);
    // setWeather(data)
    // console.log(data);

    // //dynamic bg
    // const threshold = units === 'metric' ? 20 : 60 ;
    // if(data.temp <= threshold) setbg(coldbg);
    // else setbg(HotBg);
    try {
      const data = await GetformattedWeatherData(city, units);
      setWeather(data);
      console.log(data);

      // Dynamic bg
      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) setbg(coldbg);
      else setbg(HotBg);
    }

    catch (error) {
      console.error('Error fetching weather data:', error);
    }

  }
 fetchWeatherData();
},[units,city])


const handleUnitsClick = (e)=>{
  const button = e.currentTarget ; 
  const currentUnit = button.innerText.slice(1);
  console.log(currentUnit);

  const isCelsius = currentUnit === 'C';
  button.innerText = isCelsius ? "°F" : "°C"
  setUnits(isCelsius ? 'metric' : 'imperial');


}
// const enterKeypressed = (e) => {
//   if(e.keyCode === 13){
//     setCity(e.currentTarget.value)
//     e.currentTarget.blur();
//     console.log(city)
//   }

// }

const handleCityChange = (e) => {
  // Update the city state as the user types
  setCity(e.currentTarget.value);
}

  return (
    <div className="App" style = {{backgroundImage : `url(${bg})`}}>
    <div className = "overlay">

    {
      weather ? (

        <div className='container'>
        <div className='section section__inputs'>
          <input onChange={handleCityChange} type = "text" name = "city" placeholder="Enter City.."/>
          <button onClick={(e)=>handleUnitsClick(e)}>°F</button>
        </div>

        <div className='section section__temprature'>
          <div className='icon'>
            <h3>{`${weather.name},${weather.country}`}</h3>
            <img src ={weather.iconUrl} alt=""/>
            <h3>{weather.description}</h3>
          </div>
          <div className='temperature'>
            <h1>{`${weather.temp}°${units === 'metric' ? "C" : "F"}`}</h1>
          </div>
        </div>
        {/* <div className='Bottom description' */}
        <Description weather = {weather} units={units}/>
      </div>

      ):(
        // Show loading message or placeholder while waiting for data
        <div>Loading...</div>
      )
    }
    
    </div>
    
    </div>
  );
}

export default App;
