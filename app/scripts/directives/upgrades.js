(function() {
  var upgrades = function() {
    return {
      restrict: 'E',
      scope: {
        upgrades: '=',
        buy: '&'
      },
      templateUrl: 'partials/upgrades.html',
      controller: function($scope) {
        this.buy = function(upgrade) {
          var buyScope = $scope.$new(true);
          buyScope.upgrade = upgrade;
          buyScope.$eval($scope.buy);
        };
      },
      controllerAs: 'controller'
    };
  };

  angular.module('amoebious').directive('upgrades', upgrades);
})();
