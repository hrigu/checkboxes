(function() {

  this.cb = {};

  cb.CheckboxGroup = (function() {

    function CheckboxGroup(checkboxes) {
      this.checkboxes = checkboxes != null ? checkboxes : [];
    }

    CheckboxGroup.prototype.update = function(name, checked) {
      var child, element, enemyName, friendName, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
      element = this.find(name);
      element.setChecked(checked, this);
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

    CheckboxGroup.prototype.create = function(name, checked, children) {
      var checkbox;
      checkbox = new cb.Checkbox(name, checked, children);
      checkbox.checkboxGroup = this;
      this.checkboxes.push(checkbox);
      return checkbox;
    };

    return CheckboxGroup;

  })();

  cb.Checkbox = (function() {

    Checkbox.prototype.parent = null;

    Checkbox.prototype.friends = [];

    Checkbox.prototype.enemies = [];

    Checkbox.prototype.checkboxGroup = null;

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
