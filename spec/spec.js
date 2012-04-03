(function() {

  describe("CheckboxGroup", function() {
    var ingredients;
    ingredients = null;
    beforeEach(function() {
      return ingredients = new cb.CheckboxGroup([new cb.Checkbox("Gemüse", false, [new cb.Checkbox("Tomaten", false), new cb.Checkbox("Artischokken", false).setFriends(["Knoblauch"])]), new cb.Checkbox("Peperoni", false), new cb.Checkbox("Knoblauch", false).setFriends(["Peperoni"])]);
    });
    it("can visit the elements", function() {
      var func, i;
      i = 0;
      func = function() {
        return i++;
      };
      ingredients.visit(func);
      return expect(i).toBe(5);
    });
    it("can find any element by name", function() {
      var found;
      found = ingredients.find("Tomaten");
      return expect(found.name).toBe("Tomaten");
    });
    return describe("update", function() {
      it("can updates its direct friends", function() {
        var element;
        ingredients.update("Artischokken", true);
        element = ingredients.find("Artischokken");
        return expect(ingredients.find(element.friends[0]).checked).toBe(true);
      });
      return it("can update friends of friends", function() {
        var friendOfFriend;
        ingredients.update("Artischokken", true);
        friendOfFriend = ingredients.find("Peperoni");
        return expect(friendOfFriend.checked).toBe(true);
      });
    });
  });

  describe("Checkbox", function() {
    var box, finder, friend, friendOfFriend, otherFriend;
    box = null;
    friend = null;
    otherFriend = null;
    friendOfFriend = null;
    finder = {
      find: function(name) {
        var found;
        if (name === "box") found = box;
        if (name === "friend") found = friend;
        if (name === "friendOfFriend") found = friendOfFriend;
        if (name === "otherFriend") found = otherFriend;
        return found;
      },
      findCheckboxesWhichHasThisFriend: function(name) {
        var found;
        if (name === "box") found = [];
        if (name === "friend") found = [box];
        if (name === "otherFriend") found = [box];
        if (name === "friendOfFriend") found = [friend];
        return found;
      }
    };
    beforeEach(function() {
      box = new cb.Checkbox("box", false).setFriends(["friend", "otherFriend"]);
      friend = new cb.Checkbox("friend", false).setFriends(["friendOfFriend"]);
      otherFriend = new cb.Checkbox("otherFriend", false);
      return friendOfFriend = new cb.Checkbox("friendOfFriend", false);
    });
    describe("can be visited", function() {
      return it("returns the itself to the caller", function() {
        var func, name;
        name = "?";
        func = function() {
          return name = this.name;
        };
        box.visit(func);
        return expect(name).toBe("box");
      });
    });
    it("can have friends", function() {
      var checkbox;
      friend = new cb.Checkbox("friend", true);
      checkbox = new cb.Checkbox("cb", true);
      checkbox.setFriends(["friend"]);
      return expect(friend.name).toBe("friend");
    });
    describe("setChecked", function() {
      describe("when checking the checkbox", function() {
        return it("checkes its friends and their friends as well", function() {
          box.setChecked(true, finder);
          expect(friend.checked).toBe(true);
          return expect(friendOfFriend.checked).toBe(true);
        });
      });
      return describe("when unchecking the checkbox", function() {
        it("it uncheckes not its checked friends and their checked friends", function() {
          box.setChecked(true, finder);
          expect(friend.checked).toBe(true);
          expect(friendOfFriend.checked).toBe(true);
          box.setChecked(false, finder);
          expect(box.checked).toBe(false);
          expect(friend.checked).toBe(true);
          return expect(friendOfFriend.checked).toBe(true);
        });
        return it("it uncheckes the checkboxes which have this as friend", function() {
          box.setChecked(true, finder);
          expect(friend.checked).toBe(true);
          expect(friendOfFriend.checked).toBe(true);
          friendOfFriend.setChecked(false, finder);
          expect(box.checked).toBe(false);
          expect(friend.checked).toBe(false);
          return expect(friendOfFriend.checked).toBe(false);
        });
      });
    });
    describe("checkIfAllMyFriendsAreChecked", function() {
      return describe("property isCheckIfAllMyFriendsAreChecked is true", function() {
        beforeEach(function() {
          return box.isCheckIfAllMyFriendsAreChecked = true;
        });
        return it("checkes if all its friends are checked", function() {
          expect(box.checked).toBe(false);
          friend.setChecked(true, finder);
          otherFriend.setChecked(true, finder);
          expect(box.checked).toBe(false);
          box.checkIfAllMyFriendsAreChecked(finder);
          return expect(box.checked).toBe(true);
        });
      });
    });
    return describe("can toggle collegue", function() {
      beforeEach(function() {
        friend.enemy = otherFriend;
        return otherFriend.enemy = friend;
      });
      return it("toggle college when checked", function() {
        friend.setChecked(false, finder);
        expect(otherFriend.checked).toBe(true);
        friend.setChecked(true, finder);
        return expect(otherFriend.checked).toBe(false);
      });
    });
  });

}).call(this);
