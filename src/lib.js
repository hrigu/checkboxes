(function() {

  this.cb = {};

  cb.CheckboxGroup = (function() {

    function CheckboxGroup(checkboxes) {
      this.checkboxes = checkboxes != null ? checkboxes : [];
    }

    CheckboxGroup.prototype.update = function(name, checked) {
      var element, enemyName, _i, _len, _ref, _results;
      element = this.find(name);
      element.setChecked(checked, this);
      _ref = element.enemies;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        enemyName = _ref[_i];
        _results.push(this.find(enemyName).disabled = checked);
      }
      return _results;
    };

    CheckboxGroup.prototype.visit = function(func) {
      var checkbox, _i, _len, _ref, _results;
      _ref = this.checkboxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        checkbox = _ref[_i];
        _results.push(checkbox.visit(func));
      }
      return _results;
    };

    CheckboxGroup.prototype.find = function(name) {
      var found;
      found = null;
      this.visit(function() {
        if (this.name === name) return found = this;
      });
      return found;
    };

    return CheckboxGroup;

  })();

  cb.Checkbox = (function() {

    Checkbox.prototype.disabled = false;

    Checkbox.prototype.friends = [];

    Checkbox.prototype.enemies = [];

    function Checkbox(name, checked, children) {
      this.name = name;
      this.checked = checked;
      this.children = children != null ? children : [];
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

    Checkbox.prototype.setChecked = function(checked, finder) {
      var friend, friendName, _i, _len, _ref, _results;
      this.checked = checked;
      _ref = this.friends;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        friendName = _ref[_i];
        friend = finder.find(friendName);
        _results.push(friend.setChecked(checked, finder));
      }
      return _results;
    };

    return Checkbox;

  })();

}).call(this);
