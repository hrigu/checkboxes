(function() {

  this.cb = {};

  cb.Ingredients = (function() {

    function Ingredients() {}

    Ingredients.prototype.checkboxes = [new cb.Checkbox("Kapern", true), new cb.Checkbox("Oliven", false), new cb.Checkbox("Salami", false), new cb.Checkbox("Pilze", false), new cb.Checkbox("Sardellen", true)];

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
      this.children = children;
    }

    Checkbox.prototype.visit = function(func) {
      return func(this);
    };

    return Checkbox;

  })();

}).call(this);
