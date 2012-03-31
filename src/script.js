(function() {
  var addCheckboxes, append, checked_string, indent;

  jQuery(function() {
    return addCheckboxes();
  });

  addCheckboxes = function() {
    var container, func, ingredients;
    container = $('#chooser');
    ingredients = new this.cb.Ingredients;
    func = function(checkbox) {
      return append(container, checkbox);
    };
    return ingredients.visit(func);
  };

  append = function(container, checkbox) {
    var html;
    html = "<li>" + (indent(checkbox)) + "<input type='checkbox' id='" + checkbox.name + "' name=Zutat value='" + checkbox.name + "' " + (checked_string(checkbox.checked)) + ">" + checkbox.name + "</></li>";
    return container.append($(html));
  };

  indent = function(checkbox) {
    if (checkbox.level() === 0) {
      return "";
    } else {
      return "&nbsp;&nbsp;";
    }
  };

  checked_string = function(checked) {
    if (checked) {
      return "checked='checked'";
    } else {
      return "";
    }
  };

}).call(this);
