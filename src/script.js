(function() {
  var append, checked_string, createModel, createView, indent, updateUI;

  jQuery(function() {
    var ingredients;
    ingredients = createModel();
    createView(ingredients);
    return $(".mycheckbox").click(function() {
      ingredients.update(this.id, this.checked);
      return updateUI(ingredients);
    });
  });

  createModel = function() {
    var cbx;
    cbx = [new cb.Checkbox("Pizza_Al_Padrone", false).setFriends(["Mozzarella", "Tomaten", "Oliven", "Pilze", "Knoblauch"]).setEnemies(["Artischokken", "Peperoni", "Schinken"]), new cb.Checkbox("Pizza_Napoli", false).setFriends(["Mozzarella", "Tomaten", "Oliven", "Kapern", "Sardellen"]), new cb.Checkbox("Pizza_Diavolo", false).setFriends(["Mozzarella", "Tomaten", "Peperoncini", "Knoblauch"]), new cb.Checkbox("Mozzarella", false), new cb.Checkbox("Gemüse", false, [new cb.Checkbox("Tomaten", false), new cb.Checkbox("Artischokken", false), new cb.Checkbox("Peperoni", false), new cb.Checkbox("Peperoncini", false)]), new cb.Checkbox("Schinken", false), new cb.Checkbox("Salami", false), new cb.Checkbox("Oliven", false).setEnemies(["Sardellen"]), new cb.Checkbox("Kapern", false), new cb.Checkbox("Knoblauch", false), new cb.Checkbox("Pilze", false).setFriends(["Sardellen"]), new cb.Checkbox("Sardellen", false)];
    return new cb.CheckboxGroup(cbx);
  };

  createView = function(ingredients) {
    var container, func;
    container = $('#chooser');
    func = function() {
      return append(container, this);
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
    return ingredients.visit(function() {
      var uiCheckbox;
      uiCheckbox = $("#" + this.name)[0];
      uiCheckbox.checked = this.checked;
      return uiCheckbox.disabled = this.disabled;
    });
  };

}).call(this);
