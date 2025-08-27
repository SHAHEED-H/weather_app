import React, { useState } from 'react'

const Wapp = () => {
  const[search,setSearch]=useState('')
  const[weather,setWeather]=useState({})

  async function fetchwether(city) {
    const url =   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0362101f720f72d283cb2fa512a53f1&units=metric`
    if(city===''){
      return 
    }else{
      try{
        const resource = await fetch(url)
        if(!resource.ok){
          throw new Error("City not found, try again")
        }
        const data = await resource.json()
        setWeather(data)
      }catch(err){
        console.log(err.message)
      }
    }
  }

  return (
    <div className='container'>
        <h1 className="title">🌤 Weather App</h1>
      <div className="search-box">
        <input 
          type="text" 
          placeholder='Enter the city...'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button onClick={()=>fetchwether(search)}>Search</button>
      </div>

      {weather.main && (
        <div className="card">
          <h2>{weather.name}, {weather.sys?.country}</h2>
          <h3>{weather.weather?.[0]?.description}</h3>
          <p className="temp">{weather.main.temp} °C</p>
          <p>Feels like: {weather.main.feels_like} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind?.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default Wapp
