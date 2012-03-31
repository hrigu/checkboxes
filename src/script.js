(function() {
  var addCheckboxes, append, checked_string;

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
    html = "<input type='checkbox' id='" + checkbox.name + "' name=Zutat value='" + checkbox.name + "' " + (checked_string(checkbox.checked)) + ">" + checkbox.name + "</><br>";
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
