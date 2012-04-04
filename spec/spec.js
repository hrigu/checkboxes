(function() {

  describe("CheckboxGroup", function() {
    var artischokken, ingredients, knoblauch, peperoni;
    ingredients = null;
    artischokken = null;
    peperoni = null;
    knoblauch = null;
    beforeEach(function() {
      artischokken = new cb.Checkbox("Artischokken", false);
      peperoni = new cb.Checkbox("Peperoni", false).setFriends([artischokken]);
      knoblauch = new cb.Checkbox("Knoblauch", false).setFriends([peperoni]);
      return ingredients = new cb.CheckboxGroup([peperoni, knoblauch]);
    });
    it("can visit the elements", function() {
      var func, i;
      i = 0;
      func = function() {
        return i++;
      };
      ingredients.visit(func);
      return expect(i).toBe(2);
    });
    it("can find any element by name", function() {
      var found;
      found = ingredients.find("Peperoni");
      return expect(found.name).toBe("Peperoni");
    });
    return describe("update", function() {
      it("can updates its direct friends", function() {
        ingredients.update("Knoblauch", true);
        return expect(peperoni.checked).toBe(true);
      });
      return it("can update friends of friends", function() {
        ingredients.update("Knoblauch", true);
        return expect(artischokken.checked).toBe(true);
      });
    });
  });

  describe("Checkbox", function() {
    var box, friend, friendOfFriend, otherFriend;
    box = null;
    friend = null;
    otherFriend = null;
    friendOfFriend = null;
    beforeEach(function() {
      friendOfFriend = new cb.Checkbox("friendOfFriend", false);
      friend = new cb.Checkbox("friend", false).setFriends([friendOfFriend]);
      otherFriend = new cb.Checkbox("otherFriend", false);
      return box = new cb.Checkbox("box", false).setFriends([friend, otherFriend]);
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
      return expect(box.friends[0].name).toBe("friend");
    });
    it("can have fans", function() {
      return expect(friend.fans[0].name).toBe("box");
    });
    describe("setChecked", function() {
      describe("when checking the checkbox", function() {
        return it("checkes its friends and their friends as well", function() {
          box.setChecked(true);
          expect(friend.checked).toBe(true);
          return expect(friendOfFriend.checked).toBe(true);
        });
      });
      return describe("when unchecking the checkbox", function() {
        it("it uncheckes not its checked friends and their checked friends", function() {
          box.setChecked(true);
          expect(friend.checked).toBe(true);
          expect(friendOfFriend.checked).toBe(true);
          box.setChecked(false);
          expect(box.checked).toBe(false);
          expect(friend.checked).toBe(true);
          return expect(friendOfFriend.checked).toBe(true);
        });
        return it("it uncheckes the checkboxes which have this as friend", function() {
          box.setChecked(true);
          expect(friend.checked).toBe(true);
          expect(friendOfFriend.checked).toBe(true);
          friendOfFriend.setChecked(false);
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
          friend.setChecked(true);
          otherFriend.setChecked(true);
          expect(box.checked).toBe(false);
          box.checkIfAllMyFriendsAreChecked();
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
        friend.setChecked(false);
        expect(otherFriend.checked).toBe(true);
        friend.setChecked(true);
        return expect(otherFriend.checked).toBe(false);
      });
    });
  });

}).call(this);
