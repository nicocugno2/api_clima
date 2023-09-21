import { useState } from "react"


export const App = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const REACT_APP_KEY = '32729af0e79d5b013671ddfe0fecd9c8'
  const diferenciaTemperatur = 273.15

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setdataClima] = useState(null)


  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    if(ciudad.length > 0) fetchClima();
  }


  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${REACT_APP_KEY}&lang=es`)
      const data = await response.json()
      setdataClima(data)
    }catch{
        console.error('Ocurrio el siguiente problema: ', error)
    }
  }

  return (
    <div className='container'>

      <h1>Aplicacion del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" 
        value={ciudad}
        onChange = {handleCambioCiudad} 
        />
        <button type='submit'>Buscar</button>
      </form>
      {
        dataClima && (
          <div>
            <h2>{dataClima.name} </h2>
            <p>Temperatura: {parseInt(dataClima?.main?.temp - diferenciaTemperatur )}°C </p>
            <p>Condicion del Clima: {dataClima.weather[0].description} </p>
            <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
          </div>
        )
      }
    </div>
  )
  }

