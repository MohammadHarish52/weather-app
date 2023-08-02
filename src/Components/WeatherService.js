const APikey =
 "63af59e62e32520c4f28a47c3b321a6e";

 const makeiconURl = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

 const GetformattedWeatherData = async(city,units = 'metric') =>{
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APikey}&units=${units}`;

    const data = await fetch(Url)
    .then((res)=> res.json())
    .then((data) => data);

    const {weather , main : {temp , feels_like ,temp_min , temp_max,pressure , humidity},
    wind:{speed},
    sys :{country} , 
    name,

 } = data;

 const {description , icon} = weather[0]

 return(
    {
     description ,
     iconUrl:makeiconURl(icon),
     temp,
     feels_like,
     temp_max,
     temp_min,
     pressure,
     humidity,
     speed,
     country,
     name 
       }
 )
}

 export {GetformattedWeatherData}