(function() {
  var amoebaStats = function() {
    return {
      restrict: 'E',
      scope: {
        'amoeba': '='
      },
      templateUrl: 'partials/amoebaStats.html'
    };
  };

  angular.module('amoebious').directive('amoebaStats', amoebaStats);
})();
