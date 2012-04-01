(function() {

  this.cb = {};

  cb.Ingredients = (function() {

    function Ingredients() {
      this.init();
    }

    Ingredients.prototype.init = function() {
      return this.checkboxes = [this._create("Kapern", false, [this._create("Gross", false)]).setFriends(["Oliven", "Pilze"]), this._create("Oliven", false).setEnemies(["Sardellen"]), this._create("Salami", false, [this._create("Scharf", false)]), this._create("Pilze", false).setFriends(["Sardellen"]), this._create("Sardellen", false)];
    };

    Ingredients.prototype._create = function(name, checked, children) {
      return new cb.Checkbox(name, checked, children);
    };

    Ingredients.prototype.update = function(name, checked) {
      var child, element, enemyName, friendName, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
      element = this.find(name);
      element.checked = checked;
      _ref = element.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        child.checked = checked;
      }
      _ref2 = element.friends;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        friendName = _ref2[_j];
        this.find(friendName).checked = checked;
      }
      _ref3 = element.enemies;
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        enemyName = _ref3[_k];
        this.find(enemyName).disabled = checked;
      }
      if (element.updateHandler !== null) return this.visit(element.updateHandler);
    };

    Ingredients.prototype.visit = function(func) {
      var checkbox, _i, _len, _ref, _results;
      _ref = this.checkboxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        checkbox = _ref[_i];
        _results.push(checkbox.visit(func));
      }
      return _results;
    };

    Ingredients.prototype.find = function(name) {
      var found;
      found = null;
      this.visit(function() {
        if (this.name === name) return found = this;
      });
      return found;
    };

    return Ingredients;

  })();

  cb.Checkbox = (function() {

    Checkbox.prototype.parent = null;

    Checkbox.prototype.friends = [];

    Checkbox.prototype.enemies = [];

    Checkbox.prototype.disabled = false;

    Checkbox.prototype.updateHandler = null;

    function Checkbox(name, checked, children) {
      var child, _i, _len, _ref;
      this.name = name;
      this.checked = checked;
      this.children = children != null ? children : [];
      if (this.children !== null) {
        _ref = this.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          child.parent = this;
        }
      }
    }

    Checkbox.prototype.setFriends = function(friends) {
      this.friends = friends;
      return this;
    };

    Checkbox.prototype.setEnemies = function(enemies) {
      this.enemies = enemies;
      return this;
    };

    Checkbox.prototype.setUpdateHandler = function(updateHandler) {
      this.updateHandler = updateHandler;
      return this;
    };

    Checkbox.prototype.level = function(size) {
      if (size == null) size = 0;
      if (this.parent !== null) {
        return this.parent.level(size + 1);
      } else {
        return size;
      }
    };

    Checkbox.prototype.visit = function(func) {
      var child, _i, _len, _ref, _results;
      func.call(this);
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.visit(func));
      }
      return _results;
    };

    return Checkbox;

  })();

}).call(this);
