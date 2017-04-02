angular.module('home').controller('apiCtrl', ['$scope', '$http', function($scope, $http) {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.$apply(function() {
        $scope.position = position;
        //console.log(position.coords);

        //Get data for current position
        $http.get("http://api.wunderground.com/api/4e5d122890386803/conditions/q/" + position.coords.latitude + "," + position.coords.longitude + ".json")
          .then(function(response) {
            $scope.conditions = response.data;
            //console.log($scope.conditions.current_observation.temp_f);
          });

          $http.get("http://api.wunderground.com/api/4e5d122890386803/forecast/q/" + position.coords.latitude + "," + position.coords.longitude + ".json")
            .then(function(response) {
              $scope.forecasts = response.data;
              //console.log($scope.forecasts.forecast.simpleforecast.forecastday[0].high.fahrenheit);
            });
      });
    });
  }
}]);
