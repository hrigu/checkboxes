(function() {
  var addCheckboxes, append, checked_string, indent, updateUI;

  jQuery(function() {
    var ingredients;
    ingredients = new cb.Ingredients();
    addCheckboxes(ingredients);
    return $(".mycheckbox").click(function() {
      ingredients.update(this.id, this.checked);
      return updateUI(ingredients);
    });
  });

  addCheckboxes = function(ingredients) {
    var container, func;
    container = $('#chooser');
    func = function(checkbox) {
      return append(container, checkbox);
    };
    return ingredients.visit(func);
  };

  append = function(container, checkbox) {
    var html;
    html = "<li>" + (indent(checkbox)) + "<input type='checkbox' class='mycheckbox' id='" + checkbox.name + "' name=Zutat value='" + checkbox.name + "' " + (checked_string(checkbox.checked)) + ">" + checkbox.name + "</></li>";
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

  updateUI = function(ingredients) {
    return ingredients.visit(function(checkbox) {
      var jQueryElement;
      jQueryElement = $("#" + checkbox.name);
      return jQueryElement[0].checked = checkbox.checked;
    });
  };

}).call(this);
