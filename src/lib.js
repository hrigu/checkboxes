(function() {

  this.cb = {};

  cb.Ingredients = (function() {

    function Ingredients() {
      this.init();
    }

    Ingredients.prototype.init = function() {
      return this.checkboxes = [this._create("Kapern", false, [this._create("Gross", false)]).setFriends(["Oliven", "Pilze"]), this._create("Oliven", false), this._create("Salami", false, [this._create("Scharf", true)]), this._create("Pilze", false), this._create("Sardellen", true)];
    };

    Ingredients.prototype._create = function(name, checked, children) {
      return new cb.Checkbox(name, checked, children);
    };

    Ingredients.prototype.update = function(name, checked) {
      var child, element, friendName, _i, _j, _len, _len2, _ref, _ref2, _results;
      element = this.find(name);
      element.checked = checked;
      _ref = element.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        child.checked = checked;
      }
      _ref2 = element.friends;
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        friendName = _ref2[_j];
        _results.push(this.find(friendName).checked = checked);
      }
      return _results;
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
      this.visit(function(checkbox) {
        if (checkbox.name === name) return found = checkbox;
      });
      return found;
    };

    return Ingredients;

  })();

  cb.Checkbox = (function() {

    Checkbox.prototype.parent = null;

    Checkbox.prototype.friends = [];

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
      func(this);
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
