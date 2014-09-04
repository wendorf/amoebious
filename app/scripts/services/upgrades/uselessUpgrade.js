(function() {
  var uselessUpgrade = function() {
    this.name = 'Useless';
    this.description = 'It does nothing!';
    this.cost = 5;
    this.getChanges = function() { return []; };
  };

  angular.module('amoebious').service('uselessUpgrade', uselessUpgrade);
})();
