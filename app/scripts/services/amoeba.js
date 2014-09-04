(function() {
  var amoeba = function($interval, $rootScope, upgradeService, sun) {
    var defaultState = function() {
      return {
        growthRate: 1
      };
    };

    var methods = {
      add: function(state, property, value) {
        state[property] += value;
      }
    };

    var am = this;
    am.name = 'Cool Amoeba';
    am.strength = 0;
    am.upgrades = [];


    var getAvailableUpgrades = function() {
      return upgradeService.getUpgrades().filter(function(upgrade) {
        return !am.upgrades.find(function(u) {
          return u.name === upgrade.name;
        });
      });
    };

    am.passiveGrowth = function() {
      return am.growth() / 10;
    };

    am.growth = function() {
      return sun.strength * state.growthRate;
    };

    am.act = function() {
      am.strength += am.growth();
    };

    am.buy = function(upgrade) {
      if (upgrade.cost > am.strength) {
        return;
      }

      if (am.upgrades.find(function(existing) {
        return existing.name === upgrade.name;
      })) {
        return;
      }

      am.strength -= upgrade.cost;
      am.upgrades.push(upgrade);
      am.availableUpgrades = getAvailableUpgrades();

      parseUpgrades();
    };

    var parseUpgrades = function() {
      var newState = defaultState();

      am.upgrades.map(function(upgrade) {
        return upgrade.getChanges();
      }).reduce(function(a, b) {
        return a.concat(b);
      }).sort(function(a, b) {
        return a.priority - b.priority;
      }).forEach(function(change) {
        methods[change.method](newState, change.property, change.value);
      });

      state = newState;
    };

    $interval(function() {
      am.strength += am.passiveGrowth();
    }, 1000);

    var state = defaultState();
    am.availableUpgrades = getAvailableUpgrades();
  };

  angular.module('amoebious').service('amoeba', amoeba);
})();
