(function() {
  var append, checked_string, createModel, createView, updateUI;

  jQuery(function() {
    var model;
    model = createModel();
    createView(model);
    return $(".mycheckbox").click(function() {
      model.update(this.id, this.checked);
      return updateUI(model);
    });
  });

  createModel = function() {
    var parser;
    parser = new cb.Parser();
    return parser.parse(modelDesc);
  };

  createView = function(model) {
    var container, func;
    container = $('#chooser');
    func = function() {
      return append(container, this);
    };
    return model.visit(func);
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

  updateUI = function(model) {
    return model.visit(function() {
      var uiCheckbox;
      uiCheckbox = $("#" + this.name)[0];
      uiCheckbox.checked = this.checked;
      return uiCheckbox.disabled = this.disabled;
    });
  };

}).call(this);
