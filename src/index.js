const apiKey = 'f621af2b8e404096tbo6ee0a38f319c2'; // Make sure this key is correct
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found.");
                return;
            }

            displayWeather(data); // Corrected to pass the data from the API
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

function displayWeather(data) {
    const cityName = data.name;
    const description = data.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temp = data.main.temp;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const day = days[today.getDay()];
    const time = today.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    document.getElementById('cityName').innerText = cityName;
    document.getElementById('weatherDescription').innerText = `${day} ${time}, ${description}`;
    document.getElementById('weatherIcon').src = icon;
    document.getElementById('temp').innerHTML = `${Math.round(temp)}<span>°C</span>`;
    document.getElementById('humidity').innerHTML = `Humidity: <span style="color: #f56991">${humidity}%</span>, Wind: <span style="color: #f56991">${(windSpeed * 3.6).toFixed(2)} km/h</span>`; // Convert wind speed from m/s to km/h

    document.querySelector('.weather-box').style.display = 'block';
}