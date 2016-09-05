angular.module('myApp')
  .controller('WeatherController', 
              ['$scope',
               'GeolocationFactory',
               'WeatherFactory', 
               function WeatherController($scope, geolocationFactory, weatherFactory) {

    //store data for all cities
    $scope.weatherData = [];
    // show error if we can't find a chosen city
    $scope.weatherErr = false;

    // retrieve weather data according to geolocation
    geolocationFactory.getCurrentPosition()
      .then(function(location) {
        var lat = location.coords.latitude.toFixed(2);
        var lon = location.coords.longitude.toFixed(2);

        weatherFactory.getWeatherByGeolocation(lat, lon)
          .then(function(weather) {
            insertCityDataToScope(weather.data);
          });
      });

    // retrive weather data by city name
    $scope.getAnotherCityWeather = function(cityName) {
      weatherFactory.getWeatherByCityName(cityName)
        .then(function(weather) {
            insertCityDataToScope(weather.data);
            $scope.citySearchForm.$setPristine();
            $scope.citySearch = '';
        })
    }

    /* function to treat received data
    * @param data { Object } - json response to our http query
    */
    function insertCityDataToScope(data) {
      console.log(data);
      if(data.cod == '404') {
        $scope.weatherErr = true;
      }
      else {
        $scope.weatherErr = false;

        var currentCityData = {
          'cityName': data.name,
          'country': data.sys.country,
          'tempCelc': Math.round(data.main.temp),
          'tempFahr': Math.round(data.main.temp * 1.8 + 32),
          'humidity': Math.round(data.main.humidity),
          'pressure': Math.round(data.main.pressure),
          'wind': Math.round(data.wind.speed),
          'weather': data.weather[0].main,
          'weatherDesc': data.weather[0].description
        }
        // insert it to scope
        $scope.weatherData.push(currentCityData);
      }
    }
}]);