(function() {

  this.cb = {};

  cb.Ingredients = (function() {

    function Ingredients() {
      this.init();
    }

    Ingredients.prototype.init = function() {
      return this.checkboxes = [this._create("Kapern", true), this._create("Oliven", false), this._create("Salami", false, [this._create("Scharf", true)]), this._create("Pilze", false), this._create("Sardellen", true)];
    };

    Ingredients.prototype._create = function(name, checked, children) {
      console.log(name);
      return new cb.Checkbox(name, checked, children);
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

    return Ingredients;

  })();

  cb.Checkbox = (function() {
    var parent;

    parent = null;

    function Checkbox(name, checked, children) {
      var child, _i, _len, _ref;
      this.name = name;
      this.checked = checked;
      this.children = children != null ? children : null;
      if (this.children !== null) {
        _ref = this.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          child.parent = this;
        }
      }
    }

    Checkbox.prototype.visit = function(func) {
      var child, _i, _len, _ref, _results;
      func(this);
      if (this.children !== null) {
        _ref = this.children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          _results.push(child.visit(func));
        }
        return _results;
      }
    };

    return Checkbox;

  })();

}).call(this);
