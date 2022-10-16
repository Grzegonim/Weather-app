import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useState } from 'react';

const WeatherBox = props => {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [pending, setPending] = useState(false);
  const [alert, setAlert] = useState(false);
  const handleCityChange = e => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${e}&appid=${"f9da14ce47a5cd98120ce3ecf5974f75"}&units=metric`)
      .then(res => {
        if(res.status === 200) {
          return res.json()
            .then(data => {
              const weatherData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              };
              setCity(weatherData.city);
              setTemp(weatherData.temp);
              setIcon(weatherData.icon);
              setDescription(weatherData.description);
              setPending(false);
              setAlert(false)
            })
          } else {
            setAlert(true);
          }
      });
  }

  return (
    <section>
      <PickCity action={handleCityChange} />
      {(city && !pending) && <WeatherSummary city={city} temp={temp} icon={icon} description={description} />}
      {(pending && !alert) && <Loader />}
      {alert && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;