angular.module('myApp')
    .factory('WeatherFactory', ['$q', '$http', function WeatherFactory($q, $http) {
        
        var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?units=metric';
        var weatherApiKey = '&appid=3acab4cf9343d12bf9af4dc152e2f0a9';

        function getWeatherByGeolocation(lat, lon) {
            return $http.get(weatherApi + '&lat=' + lat + '&lon=' + lon + weatherApiKey)
                .then(function(response) {
                    return response;
                }
            ); 
        }

        function getWeatherByCityName(city) {
            return $http.get(weatherApi + '&q=' + city + weatherApiKey)
                .then(function(response) {
                    return response;
                }
            ); 
        }

        return {
            getWeatherByGeolocation: getWeatherByGeolocation,
            getWeatherByCityName: getWeatherByCityName
        }
    }]);