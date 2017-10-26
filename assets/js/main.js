function App() {
    let weatherService,
        weatherElement,
        weatherData;

    function init(){
        console.log("1. Initialize the application");
        weatherService = new WeatherService();
        weatherElement = document.querySelector('.weather');

        loadWeatherData();
    }

    function loadWeatherData(){
        weatherService.loadWeather()
        .then(function(data){
            weatherData = data.query.results.channel;
            console.log(weatherData)

            updateWeatherUI();
        })
        .catch(function(reject){
            console.log('Error')
        });
    }

    function updateWeatherUI(){
        if(weatherElement != null && weatherData != undefined) {
            let tempStr = '';
            weatherData.forEach(function(weather, index) {
                tempStr += `
                <div class="weather__card">
                    <div class="weather__card--left ${setColor(weather.item.condition.temp)}">
                        <h3 class="weather__card--temperature">${weather.item.condition.temp}°C</h3>
                    </div>
                    <div class="weather__card--content">
                        <h2 class="weather__card--title">${weather.location.city}, ${weather.location.region}</h1>
                        <p>${weather.item.pubDate}</p>
                        <div class="clear"></div>
                        <h4>${weather.item.condition.text}</h4>
                        ${weatherForecast(weather.item.forecast)}
                    </div>
                </div>
                `;
            }, this);
            weatherElement.innerHTML = tempStr;
        }
    }

    function setColor(temperature) {
        let color;

        if(temperature > 30) {
            color = 'red';
        }
        else if (temperature > 20 && temperature <= 30) {
            color = 'yellow';
        }
        else if (temperature > 0 && temperature <= 20) {
            color = 'blue';
        }
        else {
            color = 'grey';
        }

        return color;
    }

    function weatherForecast(forecast) {
        let tempStr = '';

        let days = [
            'Mon',
            'Tue',
            'Wen',
            'Thur',
            'Fri',
            'Sat',
            'Sun'
        ]

        for(var i = 0; i < 2; i++) {
            var forecastElement = forecast[i];
            tempStr += `
                <p>${days[i]}</p>
                <p>${forecastElement.high}°C - ${forecastElement.low}°C</p>
            `;
        }
        return tempStr;

    }

    return {
        init: init    
    }
}

window.addEventListener('load', function(ev){
    const app = new App();
    app.init();
});
