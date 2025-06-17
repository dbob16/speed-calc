import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [distType, setDistType] = useState("miles")

  const [feet, setFeet] = useState(0)
  const [inches, setInches] = useState(0)

  const [km, setKm] = useState(0)
  const [meters, setMeters] = useState(0)

  const [yards, setYards] = useState(0)

  const [miles, setMiles] = useState(1)

  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)

  const calcSet = [distType, feet, inches, km, meters, yards, miles, hours, minutes, seconds]

  const [rMph, setRMph] = useState(0)
  const [rKph, setRKph] = useState(0)

  function calcSeconds() {
    return (((isNaN(hours) ? 0 : hours) * 3600) + ((isNaN(minutes) ? 0 : minutes) * 60) + (isNaN(seconds) ? 0 : seconds))
  }

  function runCalc() {
    if (distType === "feet_inches") {
      let t_in = ((isNaN(feet) ? 0 : feet) * 12) + (isNaN(inches) ? 0 : inches)
      let in_s = t_in / calcSeconds()
      let mph = (in_s * 3600 / 63360)
      let kmh = (in_s * 3600 / 39370.1)
      setRMph(mph)
      setRKph(kmh)
    } else if (distType === "km_meters") {
      let t_m = ((isNaN(km) ? 0 : km) * 1000) + (isNaN(meters) ? 0 : meters)
      let m_s = t_m / calcSeconds()
      let mph = (m_s * 3600 / 1609.34)
      let kmh = (m_s * 3600 / 1000)
      setRMph(mph)
      setRKph(kmh)
    } else if (distType === "yards") {
      let y_s = (isNaN(yards) ? 0 : yards) / calcSeconds()
      let mph = (y_s * 3600 / 1760)
      let kmh = (y_s * 3600 / 1093.61)
      setRMph(mph)
      setRKph(kmh)
    } else if (distType === "miles") {
      let mi_s = (isNaN(miles) ? 0 : miles) / calcSeconds()
      let mph = (mi_s * 3600)
      let kmh = (mi_s * 3600 * 1.60934)
      setRMph(mph)
      setRKph(kmh)
    }
  }

  useEffect(() => {
    const distance_main = document.getElementById("distance_main")
    const distance_children = distance_main.children
    for (let i=0; i < distance_children.length; i++) {
      if (distance_children[i].id === distType) {
        distance_children[i].style.display = null
      } else {
        distance_children[i].style.display = "none"
      }
    }}, [distType])

  useEffect(() => {runCalc()}, calcSet)

  return (
  <div id="app">
  <div id="distance" className="border">
    <div id="distance_title">
      <h2>Distance</h2>
    </div>
    <div id="dist_type_container" className="column">
      <select id="dist_type" value={distType} onChange={(e) => setDistType(e.target.value)}>
        <option value="feet_inches">Feet/Inches</option>
        <option value="km_meters">KM/Meters</option>
        <option value="yards">Yards</option>
        <option value="miles">Miles</option>
      </select>
      <label htmlFor="dist_type">Distance Measurements</label>
    </div>
    <div id="distance_main" className="grid">
      <div id="feet_inches" className="exposed">
        <div id="feet_container" className="column">
          <input type="number" id="feet" value={feet} onChange={(e) => setFeet(e.target.valueAsNumber)} />
          <label htmlFor="feet">Feet</label>
        </div>
        <div id="inches_container" className="column">
          <input type="number" id="inches" value={inches} onChange={(e) => setInches(e.target.valueAsNumber)} />
          <label htmlFor="inches">Inches</label>
        </div>
      </div>
      <div id="km_meters" className="exposed">
        <div id="km_container" className="column">
          <input type="number" id="km" value={km} onChange={(e) => setKm(e.target.valueAsNumber)} />
          <label htmlFor="km">Kilometers</label>
        </div>
        <div id="m_container" className="column">
          <input type="number" id="meters" value={meters} onChange={(e) => setMeters(e.target.valueAsNumber)} />
          <label htmlFor="meters">Meters</label>
        </div>
      </div>
      <div id="yards" className="exposed">
        <div id="yards_container" className="column">
          <input type="number" id="yards_in" value={yards} onChange={(e) => setYards(e.target.valueAsNumber)} />
          <label htmlFor="yards_in">Yards</label>
        </div>
      </div>
      <div id="miles" className="exposed">
        <div id="miles_container" className="column">
          <input type="number" id="miles_in" value={miles} onChange={(e) => setMiles(e.target.valueAsNumber)} />
          <label htmlFor="miles_in">Miles</label>
        </div>
      </div>
    </div>
  </div>
  <div id="time" className="border">
    <div id="time_title">
      <h2>Time</h2>
    </div>
    <div id="time_main" className="grid">
      <div id="hours_container" className="column">
        <input type="number" id="hours" value={hours} onChange={(e) => setHours(e.target.valueAsNumber)} />
        <label htmlFor="hours">Hours</label>
      </div>
      <div id="minutes_container" className="column">
        <input type="number" id="minutes" value={minutes} onChange={(e) => setMinutes(e.target.valueAsNumber)} />
        <label htmlFor="minutes">Minutes</label>
      </div>
      <div id="seconds_container" className="column">
        <input type="number" id="seconds" value={seconds} onChange={(e) => setSeconds(e.target.valueAsNumber)} />
        <label htmlFor="seconds">Seconds</label>
      </div>
    </div>
  </div>
  <div id="results" className="results">
    <div>
      <strong>Results</strong>
    </div>
    <div id="result_mph">
      {rMph.toFixed(2)} mph (Mi/H)
    </div>
    <div id="result_kph">
      {rKph.toFixed(2)} KM/H (kph)
    </div>
  </div>
  <div id="attrib">
    <p>Speed Calculator by Dilan Gilluly</p>
  </div>
  </div>
  )
}

export default App
