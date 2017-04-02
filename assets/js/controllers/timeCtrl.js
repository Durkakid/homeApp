angular.module('home').controller('timeCtrl', ['$scope', '$timeout', 'day', 'months', function($scope, $timeout, day, months) {

    //Clock
    $scope.dates = new Date();
    $scope.tickInterval = 1000;

    var tick = function() {
      $scope.clock = Date.now(); //get current time
      $timeout(tick, $scope.tickInterval);
    };

    $timeout(tick, $scope.tickInterval);

    //Get date info
    $scope.day = day[$scope.dates.getDay()];
    $scope.date = $scope.dates.getDate();
    $scope.months = months[$scope.dates.getMonth()];
    $scope.year = $scope.dates.getFullYear();


  }]);
