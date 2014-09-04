(function() {
  var chloroplastUpgrade = function() {
    var changes = [
      {
        priority: 10,
        property: 'growthRate',
        method: 'add',
        value: 10
      }
    ];

    this.name = 'Chloroplast';
    this.cost = 100;
    this.description = "Better sun";
    this.getChanges = function() {
      return changes;
    };
  };

  angular.module('amoebious').service('chloroplastUpgrade', chloroplastUpgrade);
})();
