(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.cb = {};

  cb.CheckboxGroup = (function() {

    function CheckboxGroup(checkboxes, supercheckboxes) {
      this.checkboxes = checkboxes != null ? checkboxes : [];
      this.supercheckboxes = supercheckboxes != null ? supercheckboxes : [];
    }

    CheckboxGroup.prototype.update = function(name, checked) {
      var checkbox, trigger, _i, _j, _len, _len2, _ref, _ref2;
      trigger = this.find(name);
      if (checked) {
        if (trigger instanceof cb.SuperCheckbox) {
          _ref = this.supercheckboxes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            checkbox = _ref[_i];
            if (checkbox.checked) checkbox.setUnchecked();
          }
        }
        trigger.setChecked();
      } else {
        trigger.setUnchecked();
      }
      if (!(trigger instanceof cb.SuperCheckbox)) {
        _ref2 = this.supercheckboxes;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          checkbox = _ref2[_j];
          checkbox.checkIfAllFriendsAreChecked();
        }
        this._deselectAllButTheBoss();
      }
      return null;
    };

    CheckboxGroup.prototype.visit = function(func) {
      var checkbox, _i, _j, _len, _len2, _ref, _ref2, _results;
      _ref = this.checkboxes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        checkbox = _ref[_i];
        checkbox.visit(func);
      }
      _ref2 = this.supercheckboxes;
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        checkbox = _ref2[_j];
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
      this.checked = false;
      return this._uncheckFans();
    };

    Checkbox.prototype._uncheckFans = function() {
      var fan, _i, _len, _ref, _results;
      this.checked = false;
      _ref = this.fans;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fan = _ref[_i];
        _results.push(fan._uncheckFans());
      }
      return _results;
    };

    Checkbox.prototype._uncheckFriends = function() {
      var friend, _i, _len, _ref, _results;
      this.checked = false;
      _ref = this.friends;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        friend = _ref[_i];
        _results.push(friend._uncheckFriends());
      }
      return _results;
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

    SuperCheckbox.prototype.checkIfAllFriendsAreChecked = function() {
      return this.checked = this._areAllFriendsChecked(true);
    };

    return SuperCheckbox;

  })(cb.Checkbox);

}).call(this);
