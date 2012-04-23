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
    var desc, parser;
    desc = [
      {
        name: "Teleclub_Basic",
        checked: false
      }, {
        name: "Teleclub_Cinema_HD",
        checked: false,
        friends: ["Teleclub_Basic"]
      }, {
        name: "Teleclub_Sport",
        checked: false,
        friends: ["Teleclub_Basic"]
      }, {
        name: "Teleclub_Sport_HD",
        checked: false,
        friends: ["Teleclub_Sport"]
      }, {
        name: "Teleclub_Family",
        checked: false,
        friends: ["Teleclub_Basic"]
      }, {
        name: "Teleclub_Family_HD",
        checked: false,
        friends: ["Teleclub_Family"]
      }, {
        name: "Teleclub_Movie",
        checked: false,
        friends: ["Teleclub_Basic"]
      }, {
        name: "Teleclub_Entertainment_HD",
        checked: false,
        friends: ["Teleclub_Movie"]
      }, {
        name: "Teleclub_Superpaket",
        checked: false,
        type: "super",
        friends: ["Teleclub_Basic", "Teleclub_Sport", "Teleclub_Family", "Teleclub_Movie"]
      }, {
        name: "Teleclub_Supepaket_HD",
        checked: false,
        type: "super",
        friends: ["Teleclub_Cinema_HD", "Teleclub_Sport_HD", "Teleclub_Family_HD", "Teleclub_Entertainment_HD"]
      }, {
        name: "German_channels",
        checked: false
      }
    ];
    parser = new cb.Parser();
    return parser.parse(desc);
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
