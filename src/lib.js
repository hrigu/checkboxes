(function() {

  this.cb = {};

  cb.CheckboxGroup = (function() {

    function CheckboxGroup(checkboxes) {
      this.checkboxes = checkboxes != null ? checkboxes : [];
    }

    CheckboxGroup.prototype.update = function(name, checked) {
      var current, element, _i, _len, _ref;
      element = this.find(name);
      element.setChecked(checked, this);
      _ref = this.checkboxes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        current = _ref[_i];
        current.checkIfAllMyFriendsAreChecked(this);
      }
      return null;
    };

    CheckboxGroup.prototype.visit = function(func) {
      var checkbox, _i, _len, _ref, _results;
      _ref = this.checkboxes;
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

    CheckboxGroup.prototype.findCheckboxesWhichHasThisFriend = function(name) {
      var found;
      found = [];
      this.visit(function() {
        var candidate, _i, _len, _ref, _results;
        _ref = this.friends;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          candidate = _ref[_i];
          if (candidate === name) {
            _results.push(found.push(this));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
      return found;
    };

    return CheckboxGroup;

  })();

  cb.Checkbox = (function() {

    Checkbox.prototype.isCheckIfAllMyFriendsAreChecked = false;

    Checkbox.prototype.friends = [];

    Checkbox.prototype.enemy = null;

    function Checkbox(name, checked, children) {
      this.name = name;
      this.checked = checked;
      this.children = children != null ? children : [];
    }

    Checkbox.prototype.setFriends = function(friends) {
      this.friends = friends;
      return this;
    };

    Checkbox.prototype.setUpdateHandler = function(updateHandler) {
      this.updateHandler = updateHandler;
      return this;
    };

    Checkbox.prototype.visit = function(func) {
      var child, _i, _len, _ref, _results;
      func.call(this);
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.visit(func));
      }
      return _results;
    };

    Checkbox.prototype.setChecked = function(checked, finder) {
      var friend, friendName, hasMeAsFriend, _i, _j, _len, _len2, _ref, _ref2, _results, _results2;
      this.checked = checked;
      if (this.enemy !== null) this.enemy.checked = !checked;
      if (checked) {
        _ref = this.friends;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          friendName = _ref[_i];
          friend = finder.find(friendName);
          _results.push(friend.setChecked(checked, finder));
        }
        return _results;
      } else {
        _ref2 = finder.findCheckboxesWhichHasThisFriend(this.name);
        _results2 = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          hasMeAsFriend = _ref2[_j];
          _results2.push(hasMeAsFriend.setChecked(checked, finder));
        }
        return _results2;
      }
    };

    Checkbox.prototype.checkIfAllMyFriendsAreChecked = function(finder) {
      var areAllChecked, friend, friendName, _i, _j, _len, _len2, _ref, _ref2;
      _ref = this.friends;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        friendName = _ref[_i];
        friend = finder.find(friendName);
        friend.checkIfAllMyFriendsAreChecked(finder);
      }
      if (this.isCheckIfAllMyFriendsAreChecked) {
        areAllChecked = false;
        _ref2 = this.friends;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          friendName = _ref2[_j];
          friend = finder.find(friendName);
          areAllChecked = friend.checked;
          if (!areAllChecked) break;
        }
        if (areAllChecked) return this.checked = true;
      }
    };

    return Checkbox;

  })();

}).call(this);
