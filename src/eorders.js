(function() {
  var append, checked_string, createModel, createView, updateUI;

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
    var cbx, german_channels, teleclub_Basic, teleclub_Cinema_HD, teleclub_Enterainment_HD, teleclub_Family, teleclub_Family_HD, teleclub_Movie, teleclub_Sport, teleclub_Sport_HD, teleclub_Superpaket, teleclub_Superpaket_Other, teleclub_Superpaket_SD_HD;
    teleclub_Basic = new cb.Checkbox("Teleclub_Basic", false);
    teleclub_Cinema_HD = new cb.Checkbox("Teleclub_Cinema_HD", false).setFriends([teleclub_Basic]);
    teleclub_Sport = new cb.Checkbox("Teleclub_Sport", false).setFriends([teleclub_Basic]);
    teleclub_Sport_HD = new cb.Checkbox("Teleclub_Sport_HD", false).setFriends([teleclub_Sport]);
    teleclub_Family = new cb.Checkbox("Teleclub_Family", false).setFriends([teleclub_Basic]);
    teleclub_Family_HD = new cb.Checkbox("Teleclub_Family_HD", false).setFriends([teleclub_Family]);
    teleclub_Movie = new cb.Checkbox("Teleclub_Movie", false).setFriends([teleclub_Basic]);
    teleclub_Enterainment_HD = new cb.Checkbox("Teleclub_Enterainment_HD", false).setFriends([teleclub_Movie]);
    teleclub_Superpaket = new cb.SuperCheckbox("Teleclub_Superpaket", false).setFriends([teleclub_Basic, teleclub_Sport, teleclub_Family, teleclub_Movie]);
    teleclub_Superpaket_SD_HD = new cb.SuperCheckbox("Teleclub_Superpaket_SD_HD", false).setFriends([teleclub_Cinema_HD, teleclub_Sport_HD, teleclub_Family_HD, teleclub_Enterainment_HD]);
    teleclub_Superpaket_Other = new cb.SuperCheckbox("teleclub_Superpaket_Other", false).setFriends([teleclub_Sport_HD, teleclub_Family_HD, teleclub_Enterainment_HD]);
    german_channels = new cb.Checkbox("German_channels", false);
    cbx = [teleclub_Basic, teleclub_Cinema_HD, teleclub_Sport, teleclub_Sport_HD, teleclub_Family, teleclub_Family_HD, teleclub_Movie, teleclub_Enterainment_HD, teleclub_Superpaket, teleclub_Superpaket_SD_HD, german_channels];
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
    html = "<li><input type='checkbox' class='mycheckbox' id='" + checkbox.name + "' name=Zutat value='" + checkbox.name + "' " + (checked_string(checkbox.checked)) + ">" + checkbox.name + "</></li>";
    return container.append($(html));
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
