(function() {
  var upgradeService = function($injector) {
    var upgrades = [];

    var register = function(upgrade) {
      upgrades.push(upgrade);
    };

    this.getUpgrades = function() {
      return upgrades;
    };

    var services = function(q) {
      return q[1] === 'service';
    };

    var serviceName = function(q) {
      return q[2][0];
    };

    var isUpgrade = function(service) {
      return service.match(/.*Upgrade$/);
    };

    var upgradeServices = angular.module('amoebious')._invokeQueue
      .filter(services)
      .map(serviceName)
      .filter(isUpgrade);

    upgradeServices.forEach(function(name) {
      register($injector.get(name));
    });
  };

  angular.module('amoebious').service('upgradeService', upgradeService);
})();
