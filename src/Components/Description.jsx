import React from 'react'
import {FaArrowDown ,FaArrowUp,FaWind} from 'react-icons/fa'
import {BiHappy} from "react-icons/bi"
import {MdCompress, MdOutlineWaterDrop} from "react-icons/md"
import './Description.css'




const Description = ({ weather, units }) => {

  const tempunit = units  === "metric" ? "°C" : "°F";

  const windunit = units === 'metric' ? "m/s" : "m/h"

  const cards = [
    {
      id:1,
      icon:<FaArrowDown/>,
      title:'min',
      data:weather.temp_min,
      unit:tempunit,
    },
    {
      id:2,
      icon:<FaArrowUp/>,
      title:'max',
      data:weather.temp_max,
      unit:tempunit,
    },
    {
      id:3,
      icon:<BiHappy/>,
      title:'feels like',
      data:weather.feels_like,
      unit:tempunit,
    },
    {
      id:4,
      icon:<MdCompress/>,
      title:'pressure',
      data:weather.pressure,
      unit:"hpa",
    },
    {
      id:5,
      icon:<MdOutlineWaterDrop/>,
      title:'humidity',
      data:weather.humidity,
      unit:tempunit,
    },
    {
      id:6,
      icon:<FaWind/>,
      title:'wind speed',
      data:weather.speed,
      unit:windunit,
    }
  ]

  return (
    <div className='section section__description'>

    {cards.map(({id,icon,title,data,unit})=>{

      return(
        <div key={id} className='card'>
            <div classname = "description__card">
              {icon}
               <small>{title}</small>
            </div>
            <h2>{`${data} ${unit}`}</h2>
        </div>
      )

    })}
        
    </div>
  
  )
}

export default Description