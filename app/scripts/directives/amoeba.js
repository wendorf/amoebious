(function() {
  var amoeba = function() {
    return {
      restrict: 'E',
      scope: {
        amoeba: '='
      },
      templateUrl: 'partials/amoeba.html'
    };
  };

  angular.module('amoebious').directive('amoeba', amoeba);
})();