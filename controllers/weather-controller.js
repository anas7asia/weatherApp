angular.module('myApp')
  .controller('WeatherController', 
              ['$scope',
               '$log',
               'GeolocationFactory',
               'WeatherFactory',
               function WeatherController($scope, $log, geolocationFactory, weatherFactory) {

    $scope.isLoading = true;
    //store data for all cities
    $scope.weatherData = [];
    // show error if we can't find a chosen city
    $scope.weatherErr = false;
    $scope.searchCityForm = { searchCity: 'Fakel' };
    // to prevent sending a request twice 
    $scope.submittingCity = false;

    // retrieve weather data according to geolocation
    geolocationFactory.getCurrentPosition()
      .then(function(location) {
        var lat = location.coords.latitude.toFixed(2);
        var lon = location.coords.longitude.toFixed(2);

        weatherFactory.getWeatherByGeolocation(lat, lon)
          .then(function(weather) {
            $scope.isLoading = false;
            insertCityDataToScope(weather.data);
          });
      });

    // retrive weather data by city name
    $scope.getAnotherCityWeather = function(cityName) {
      $scope.submittingCity = true;
      weatherFactory.getWeatherByCityName(cityName)
        .then(function(weather) {
            insertCityDataToScope(weather.data);
            $scope.searchCityForm.searchCity = '';
            $scope.submittingCity = false;
        })
    }

    /* function to treat received data
    * @param data { Object } - json response to our http query
    */
    function insertCityDataToScope(data) {

      if(data.cod == '404') {
        $scope.weatherErr = true;
      }
      else {
        $scope.weatherErr = false;

        var currentCityData = {
          'cityName': data.name,
          'country': data.sys.country,
          'tempCels': Math.round(data.main.temp),
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

    $scope.removeCity = function(idx) {
      $log.log("Here remove!");
      $scope.weatherData.splice(idx, 1);
    }

    // $scope.toggleMetric = function(repeatScope) {
    //   if (repeatScope.isMetric) {
    //     repeatScope.isMetric = false;
    //   } else {
    //     repeatScope.isMetric = true;
    //   }
    // };

    $scope.showScope = function(e) {
      console.log(angular.element(e.srcElement).scope());
    }
    // console.log($scope);
}]);