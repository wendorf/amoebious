(function() {
  var sun = function() {
    this.strength = 10;
  };

  angular.module('amoebious').service('sun', sun); 
})();