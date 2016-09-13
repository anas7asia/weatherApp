angular.module('myApp')
.controller('CityController', ['$scope', '$log', function($scope, $log) {

    $scope.showMetric = true;

    $scope.letWindBlow = true;

    // $scope.city = {
    //   chooseMetric: function() {
    //     $log.log($scope);
    //     $scope.showMetric = true;
    //   },
    //   chooseImperial: function() {
    //     $log.log($scope);
    //     $scope.showMetric = false;
    //   }
    // }

    $scope.chooseMetric = function() {
      $log.log($scope);
      $scope.showMetric = true;
    }
    
    $scope.chooseImperial = function() {
      $log.log($scope);
      $scope.showMetric = false;
    }

    $scope.stopBlowing = function() {
      $log.log($scope);
      $scope.letWindBlow = !$scope.letWindBlow;
    }
    
    $log.log($scope);
}]);