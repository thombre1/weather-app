document.addEventListener('DOMContentLoaded',()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherButton = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const tempreatureDisplay = document.getElementById("tempreature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    //Keys should be private
    const API_KEY = "d55a6e30f4b32db3765ee737b35266c4";

    //the response might take time, so the callback function is async, awaiting for the function communicating with API
    getWeatherButton.addEventListener('click', async()=>{
        const cityName = cityInput.value.trim();
        if(!cityName) return;

        //try to get the city data from api, the server might throw error
        try{
            console.log("Fetching weather data...");
            const weatherData = await fetchWeatherData(cityName);
            displayWeatherData(weatherData);
            console.log("Weather data displayed.");
        }
        catch(error){
            showError();
        }

    })
    
    //function is async meaning that the response from this might not have a linear flow, might take time
    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

        const response = await fetch(url);
        if(!response.ok){
            throw new Error("City does not exist...")
        }
        //converting response to json
        const jsonData = await response.json();
        return jsonData;
        
    }
    function displayWeatherData(data){
        console.log(data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;
        cityNameDisplay.classList.add('flex','justify-center','mb-4','font-semibold','text-4xl');

        //unlock weather
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        tempreatureDisplay.textContent = `Tempreature: ${(main.temp - 273).toFixed(2)} °C`;
        descriptionDisplay.textContent = `Overview: ${weather[0].description}`;
        tempreatureDisplay.classList.add('flex','justify-center','mb-4','font-semibold','text-2xl');
        descriptionDisplay.classList.add('flex','justify-center','font-mono','mb-4');
    }
    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
})