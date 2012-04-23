(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.cb = {};

  cb.Parser = (function() {

    function Parser() {}

    Parser.prototype.parse = function(checkboxes_desc) {
      var cb_desc, checkbox, checkboxes, friends, _i, _len;
      console.log(checkboxes_desc);
      checkboxes = [];
      for (_i = 0, _len = checkboxes_desc.length; _i < _len; _i++) {
        cb_desc = checkboxes_desc[_i];
        checkbox = this._buildCheckbox(cb_desc);
        friends = [];
        if (cb_desc.friends !== void 0) friends = cb_desc.friends;
        checkbox.friends = friends;
        checkboxes.push(checkbox);
      }
      this._resolveFriends(checkboxes);
      return new cb.CheckboxGroup(checkboxes);
    };

    Parser.prototype._buildCheckbox = function(cb_desc) {
      var checkbox;
      checkbox = null;
      if (cb_desc.type === void 0 || cb_desc.type === "normal") {
        checkbox = new cb.Checkbox(cb_desc.name, cb_desc.checked);
      } else if (cb_desc.type === "super") {
        checkbox = new cb.SuperCheckbox(cb_desc.name, cb_desc.checked);
      } else {
        throw "could not interpret 'type' property '" + cb_desc.type + "'";
      }
      return checkbox;
    };

    Parser.prototype._resolveFriends = function(checkboxes) {
      var checkbox, friendId, friends, _i, _j, _len, _len2, _ref, _results;
      _results = [];
      for (_i = 0, _len = checkboxes.length; _i < _len; _i++) {
        checkbox = checkboxes[_i];
        friends = [];
        _ref = checkbox.friends;
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          friendId = _ref[_j];
          friends.push(this._find(checkboxes, friendId));
        }
        _results.push(checkbox.setFriends(friends));
      }
      return _results;
    };

    Parser.prototype._find = function(checkboxes, name) {
      var checkbox, found, _i, _len;
      found = null;
      for (_i = 0, _len = checkboxes.length; _i < _len; _i++) {
        checkbox = checkboxes[_i];
        if (checkbox.name === name) found = checkbox;
      }
      if (!found) throw "could not find " + name;
      return found;
    };

    return Parser;

  })();

  cb.CheckboxGroup = (function() {

    function CheckboxGroup(allCheckboxes) {
      var checkbox, _i, _len, _ref;
      this.allCheckboxes = allCheckboxes;
      this.supercheckboxes = [];
      _ref = this.allCheckboxes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        checkbox = _ref[_i];
        if (checkbox instanceof cb.SuperCheckbox) {
          this.supercheckboxes.push(checkbox);
        }
      }
    }

    CheckboxGroup.prototype.update = function(name, checked) {
      var trigger;
      trigger = this.find(name);
      if (checked) {
        this._toggleIfSupercheckbox(trigger);
        trigger.setChecked();
      } else {
        trigger.setUnchecked();
      }
      this._postProcess(trigger);
      return null;
    };

    CheckboxGroup.prototype._postProcess = function(trigger) {
      var checkbox, _i, _len, _ref;
      if (!(trigger instanceof cb.SuperCheckbox)) {
        _ref = this.supercheckboxes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          checkbox = _ref[_i];
          checkbox.setCheckedIfAllFriendsAreChecked();
        }
        return this._deselectAllButTheBoss();
      }
    };

    CheckboxGroup.prototype._toggleIfSupercheckbox = function(trigger) {
      var checkbox, _i, _len, _ref, _results;
      if (trigger instanceof cb.SuperCheckbox) {
        _ref = this.supercheckboxes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          checkbox = _ref[_i];
          if (checkbox.checked) {
            _results.push(checkbox.setUnchecked());
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    CheckboxGroup.prototype.visit = function(func) {
      var checkbox, _i, _len, _ref, _results;
      _ref = this.allCheckboxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        checkbox = _ref[_i];
        _results.push(checkbox.visit(func));
      }
      return _results;
    };

    CheckboxGroup.prototype.find = function(name) {
      var found;
      found = null;
      this.visit(function() {
        if (this.name === name) return found = this;
      });
      return found;
    };

    CheckboxGroup.prototype._deselectAllButTheBoss = function() {
      var box, checkbox, checked, winner, _i, _j, _k, _len, _len2, _len3, _ref, _results;
      checked = [];
      _ref = this.supercheckboxes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        checkbox = _ref[_i];
        if (checkbox.checked) checked.push(checkbox);
      }
      if (checked.length > 1) {
        winner = checked[0];
        for (_j = 0, _len2 = checked.length; _j < _len2; _j++) {
          checkbox = checked[_j];
          if (winner.countFriends() < checkbox.countFriends()) winner = checkbox;
        }
        _results = [];
        for (_k = 0, _len3 = checked.length; _k < _len3; _k++) {
          box = checked[_k];
          if (box !== winner) {
            _results.push(box.checked = false);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    return CheckboxGroup;

  })();

  cb.Checkbox = (function() {

    function Checkbox(name, checked) {
      this.name = name;
      this.checked = checked;
      this.fans = [];
      this.friends = [];
      this.isTrigger = false;
    }

    Checkbox.prototype.setFriends = function(friends) {
      var friend, _i, _len, _ref;
      this.friends = friends;
      _ref = this.friends;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        friend = _ref[_i];
        friend.fans.push(this);
      }
      return this;
    };

    Checkbox.prototype.visit = function(func) {
      return func.call(this);
    };

    Checkbox.prototype.countFriends = function() {
      var friend, x, _i, _len, _ref;
      x = this.friends.length;
      _ref = this.friends;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        friend = _ref[_i];
        x += friend.countFriends();
      }
      return x;
    };

    Checkbox.prototype.setChecked = function() {
      var friend, _i, _len, _ref, _results;
      this.checked = true;
      _ref = this.friends;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        friend = _ref[_i];
        _results.push(friend.setChecked());
      }
      return _results;
    };

    Checkbox.prototype.setUnchecked = function() {
      return this._uncheckFans();
    };

    Checkbox.prototype._uncheckFans = function() {
      var fan, _i, _len, _ref;
      if (this.checked) {
        console.log("_uncheckFans: " + this.name);
        _ref = this.fans;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fan = _ref[_i];
          fan._uncheckFans();
        }
        return this.checked = false;
      }
    };

    Checkbox.prototype._uncheckFriends = function() {
      var friend, _i, _len, _ref;
      if (this.checked) {
        console.log("_uncheckFriends: " + this.name);
        _ref = this.friends;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          friend = _ref[_i];
          friend._uncheckFriends();
        }
        this._uncheckFans();
        return this.checked = false;
      }
    };

    Checkbox.prototype._areAllFriendsChecked = function(checked) {
      var friend, _i, _j, _len, _len2, _ref, _ref2;
      _ref = this.friends;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        friend = _ref[_i];
        if (!friend.checked) return false;
      }
      _ref2 = this.friends;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        friend = _ref2[_j];
        checked = friend._areAllFriendsChecked(checked);
        if (!checked) break;
      }
      return checked;
    };

    return Checkbox;

  })();

  cb.SuperCheckbox = (function(_super) {

    __extends(SuperCheckbox, _super);

    function SuperCheckbox() {
      SuperCheckbox.__super__.constructor.apply(this, arguments);
    }

    SuperCheckbox.prototype.setUnchecked = function() {
      return this._uncheckFriends();
    };

    SuperCheckbox.prototype.setCheckedIfAllFriendsAreChecked = function() {
      return this.checked = this._areAllFriendsChecked(true);
    };

    return SuperCheckbox;

  })(cb.Checkbox);

}).call(this);
