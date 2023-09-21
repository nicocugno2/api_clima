import { useState } from "react"


export const App = () => {

  const urlBase = 'https://api.openweathermap.org/data/3.0/weather'
  const API_KEY = '892124d384be1528bb15466e8aec5c5c'


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
      const response = await fetch(`${urlBase}?=${ciudad}&appid=${API_KEY}`)
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

    </div>
  )
  }

