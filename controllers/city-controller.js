angular.module('myApp')
.controller('CityController', ['$scope', '$log', function($scope, $log) {

    $scope.showMetric = true;
    $scope.letWindBlow = true;

    $scope.chooseMetric = function() {
      $scope.showMetric = true;
    }
    
    $scope.chooseImperial = function() {
      $scope.showMetric = false;
    }

    $scope.stopBlowing = function() {
      $scope.letWindBlow = !$scope.letWindBlow;
    }

}]);