(function() {

  describe("class CheckboxGroup", function() {
    var artischokken, checkboxGroup, knoblauch, peperoni;
    checkboxGroup = null;
    artischokken = null;
    peperoni = null;
    knoblauch = null;
    beforeEach(function() {
      artischokken = new cb.Checkbox("Artischokken", false);
      peperoni = new cb.Checkbox("Peperoni", false).setFriends([artischokken]);
      knoblauch = new cb.Checkbox("Knoblauch", false).setFriends([peperoni]);
      return checkboxGroup = new cb.CheckboxGroup([artischokken, peperoni, knoblauch]);
    });
    it("should visit all checkboxes", function() {
      var func, i;
      i = 0;
      func = function() {
        return i++;
      };
      checkboxGroup.visit(func);
      return expect(i).toBe(3);
    });
    it("should find any element by name", function() {
      return expect(checkboxGroup.find("Peperoni").name).toBe("Peperoni");
    });
    return describe("the method 'update'", function() {
      describe("with check = true", function() {
        it("should check the specified checkbox and its direct friends", function() {
          checkboxGroup.update("Knoblauch", true);
          return expect(peperoni.checked).toBe(true);
        });
        return it("and the friends of friends", function() {
          checkboxGroup.update("Knoblauch", true);
          return expect(artischokken.checked).toBe(true);
        });
      });
      return describe("with check = false", function() {
        beforeEach(function() {
          return checkboxGroup.update("Knoblauch", true);
        });
        return it("should uncheck the specified checkbox and its fans", function() {
          checkboxGroup.update("Artischokken", false);
          expect(artischokken.checked).toBe(false);
          expect(peperoni.checked).toBe(false);
          return expect(knoblauch.checked).toBe(false);
        });
      });
    });
  });

  describe("class Checkbox", function() {
    var fanOfFanOfTrigger, fanOfFriend, fanOfTrigger, friend, friendOfFriend, otherFriend, trigger;
    trigger = null;
    fanOfTrigger = null;
    fanOfFanOfTrigger = null;
    friend = null;
    otherFriend = null;
    friendOfFriend = null;
    fanOfFriend = null;
    beforeEach(function() {
      friendOfFriend = new cb.Checkbox("friendOfFriend", false);
      friend = new cb.Checkbox("friend", false).setFriends([friendOfFriend]);
      fanOfFriend = new cb.Checkbox("fanOfFriend", false).setFriends([friend]);
      otherFriend = new cb.Checkbox("otherFriend", false);
      trigger = new cb.Checkbox("trigger", false).setFriends([friend, otherFriend]);
      fanOfTrigger = new cb.Checkbox("fanOfTrigger", false).setFriends([trigger]);
      return fanOfFanOfTrigger = new cb.Checkbox("fanOfFanOfTrigger", false).setFriends([fanOfTrigger]);
    });
    describe("the method 'visit'", function() {
      return it("should return itself to the caller", function() {
        var func, name;
        name = "?";
        func = function() {
          return name = this.name;
        };
        trigger.visit(func);
        return expect(name).toBe("trigger");
      });
    });
    it("can have friends", function() {
      return expect(trigger.friends[0].name).toBe("friend");
    });
    it("can have fans", function() {
      return expect(trigger.fans[0].name).toBe("fanOfTrigger");
    });
    describe("The method setChecked", function() {
      it("should check its friends and their friends as well", function() {
        trigger.setChecked();
        expect(friend.checked).toBe(true);
        return expect(friendOfFriend.checked).toBe(true);
      });
      return it("but not the fans", function() {
        trigger.setChecked();
        expect(fanOfFriend.checked).toBe(false);
        expect(fanOfTrigger.checked).toBe(false);
        return expect(fanOfFanOfTrigger.checked).toBe(false);
      });
    });
    return describe("The method 'setUnchecked'", function() {
      it("should uncheck the fans and their fans", function() {
        fanOfFanOfTrigger.setChecked();
        expect(friend.checked).toBe(true);
        expect(friendOfFriend.checked).toBe(true);
        expect(fanOfTrigger.checked).toBe(true);
        fanOfFriend.setChecked();
        expect(fanOfFriend.checked).toBe(true);
        trigger.setUnchecked();
        expect(trigger.checked).toBe(false);
        expect(fanOfTrigger.checked).toBe(false);
        expect(fanOfFanOfTrigger.checked).toBe(false);
        return expect(fanOfFriend.checked).toBe(true);
      });
      return it("should not uncheck the friends and their  friends", function() {
        trigger.setChecked();
        expect(friend.checked).toBe(true);
        expect(friendOfFriend.checked).toBe(true);
        trigger.setUnchecked();
        expect(trigger.checked).toBe(false);
        expect(friend.checked).toBe(true);
        return expect(friendOfFriend.checked).toBe(true);
      });
    });
  });

  describe("class SuperCheckbox", function() {
    var fanOfFriend, friend, friendOfFriend, otherFriend, trigger;
    trigger = null;
    friend = null;
    otherFriend = null;
    friendOfFriend = null;
    fanOfFriend = null;
    beforeEach(function() {
      friendOfFriend = new cb.Checkbox("friendOfFriend", false);
      friend = new cb.Checkbox("friend", false).setFriends([friendOfFriend]);
      fanOfFriend = new cb.Checkbox("fanOfFriend", false).setFriends([friend]);
      otherFriend = new cb.Checkbox("otherFriend", false);
      return trigger = new cb.SuperCheckbox("trigger", false).setFriends([friend, otherFriend]);
    });
    describe("the method 'setChecked'", function() {
      return it("should check its friends and their friends as well (works like the unchecked method of the subclass)", function() {
        trigger.setChecked();
        expect(trigger.checked).toBe(true);
        expect(friend.checked).toBe(true);
        expect(friendOfFriend.checked).toBe(true);
        return expect(fanOfFriend.checked).toBe(false);
      });
    });
    describe("the method 'setUnchecked'", function() {
      return it("should uncheck all friends and their friends and their fans", function() {
        trigger.setChecked();
        fanOfFriend.setChecked();
        expect(fanOfFriend.checked).toBe(true);
        trigger.setUnchecked();
        expect(trigger.checked).toBe(false);
        expect(friend.checked).toBe(false);
        expect(friendOfFriend.checked).toBe(false);
        return expect(fanOfFriend.checked).toBe(false);
      });
    });
    return describe("method 'setCheckedIfAllFriendsAreChecked'", function() {
      return it("should check if all friends are checked", function() {
        expect(friend.checked).toBe(false);
        expect(otherFriend.checked).toBe(false);
        expect(trigger.checked).toBe(false);
        friend.setChecked();
        trigger.setCheckedIfAllFriendsAreChecked();
        expect(friend.checked).toBe(true);
        expect(otherFriend.checked).toBe(false);
        expect(trigger.checked).toBe(false);
        otherFriend.setChecked();
        trigger.setCheckedIfAllFriendsAreChecked();
        expect(friend.checked).toBe(true);
        expect(otherFriend.checked).toBe(true);
        return expect(trigger.checked).toBe(true);
      });
    });
  });

}).call(this);
