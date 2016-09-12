angular.module('myApp')
.controller('CityController', ['$scope', '$log', function($scope, $log) {

    $scope.showMetric = true;

    $scope.chooseMetric = function() {
      $log.log($scope);
      $scope.showMetric = true;
    }
    
    $scope.chooseImperial = function() {
      $log.log($scope);
      $scope.showMetric = false;
    }

    $log.log($scope);
}]);