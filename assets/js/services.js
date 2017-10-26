function WeatherService() {
    const url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%20in%20(%22paris%2C%20france%22%2C%20%22los%20angeles%2C%20usa%22%2C%20%22tokyo%2C%20japan%22%2C%22gent%2Cbelgium%22%2C%20%22new%20york%2C%20usa%22%2C%20%22Johannesburg%2CSouth%20Africa%22))%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
    function loadWeather() {
        return getJsonPByPromise(url);
    }

    return {
        loadWeather: loadWeather
    }  
}