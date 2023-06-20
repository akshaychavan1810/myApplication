import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
import * as weathericons from "weather-icons-react";

const key = "ae0d055343227e09d072824637bc948c";

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const [weather, setWeaather] = useState("");
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  const d = new Date();
  const day = weekday[d.getDay()];
  const formattedDate = d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const fetchData = async () => {
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
      );
      setData(response.data);
      setWeaather(response.data.weather[0].description);
      console.log(response.data);
    } catch (err) {
      alert("Please enter a valid city name");
    }
  };

  return (
    <div className="App">
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-lg-8 grid-margin stretch-card">
              <div className="inputs">
                <input
                  type="text"
                  className="search"
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter the city name"
                ></input>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={fetchData}
                >
                  Submit
                </button>
                <div></div>
              </div>
              <div className="card card-weather">
                <div className="card-body">
                  <div className="weather-date-location">
                    <h3>{day}</h3>
                    <p className="text-gray">
                      <span className="weather-date">{formattedDate}</span>
                      <span className="weather-location">
                        {data && (
                          <div>
                            {data.name}, {data.sys.country}
                          </div>
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="weather-data d-flex">
                    <div className="mr-auto">
                      <h4 className="display-3">
                        <div className="temp">
                          {data && (
                            <div>{(data.main.temp - 273.15).toFixed(1)}</div>
                          )}
                          <span className="symbol">&deg;</span>C
                        </div>
                      </h4>
                      <div className="temp2">
                        <div className="minTemp">
                          Min temp :
                          {data && (
                            <div>
                              {(data.main.temp_min - 273.15).toFixed(1)}
                            </div>
                          )}
                          <span className="symbol">&deg;</span>C
                        </div>
                        <div className="maxTemp">
                          Max temp :
                          {data && (
                            <div>
                              {(data.main.temp_max - 273.15).toFixed(1)}
                            </div>
                          )}
                          <span className="symbol">&deg;</span>C
                        </div>
                      </div>
                     
                      <p>
                        {data && (
                          <div>
                            {data.weather[0].description.replace(
                              /\b\w/g,
                              (match) => match.toUpperCase()
                            )}
                          </div>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="details">
                    <div className="values">
                      {/*Humidity*/}
                      <weathericons.WiHumidity className="icons" />
                      <span>{data && <div>{data.main.humidity} %</div>}</span>
                    </div>
                   
                    <div className="values">
                      {/*Wind Speed*/}
                      <weathericons.WiCloudyWindy className="icons" />
                      <span>
                        {data && (
                          <div>{(data.wind.speed * 3.6).toFixed(1)} Kmph</div>
                        )}
                      </span>
                    </div>
                  
                  </div>
                  <div className="details2">
                    <div><b>Humidity</b></div>
                    
                    <div><b>Wind Speed</b></div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
