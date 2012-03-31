(function() {

  this.cb = {};

  cb.Ingredients = (function() {

    function Ingredients() {
      this.init();
    }

    Ingredients.prototype.init = function() {
      return this.checkboxes = [new cb.Checkbox("Kapern", true), new cb.Checkbox("Oliven", false), new cb.Checkbox("Salami", false, [new cb.Checkbox("Scharf", true)]), new cb.Checkbox("Pilze", false), new cb.Checkbox("Sardellen", true)];
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

    function Checkbox(name, checked, children) {
      this.name = name;
      this.checked = checked;
      this.children = children != null ? children : null;
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
