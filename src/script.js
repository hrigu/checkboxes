(function() {
  var addCheckboxes, append, checked_string;

  jQuery(function() {
    return addCheckboxes(new this.cb.Selection().selection);
  });

  addCheckboxes = function(selection) {
    var container, value, _i, _len, _results;
    container = $('#chooser');
    _results = [];
    for (_i = 0, _len = selection.length; _i < _len; _i++) {
      value = selection[_i];
      _results.push(append(container, value));
    }
    return _results;
  };

  append = function(container, value) {
    var html;
    html = "<input type='checkbox' id='" + value.name + "' name=Zutat value='" + value.name + "' " + (checked_string(value.checked)) + ">" + value.name + "</><br>";
    return container.append($(html));
  };

  checked_string = function(checked) {
    if (checked) {
      return "checked='checked'";
    } else {
      return "";
    }
  };

}).call(this);
