(function() {

  describe("CheckboxGroup", function() {
    var ingredients;
    ingredients = null;
    beforeEach(function() {
      return ingredients = new cb.CheckboxGroup([new cb.Checkbox("Gemüse", false, [new cb.Checkbox("Tomaten", false).setEnemies(["Knoblauch"]), new cb.Checkbox("Artischokken", false).setFriends(["Knoblauch"])]), new cb.Checkbox("Peperoni", false), new cb.Checkbox("Knoblauch", false).setFriends(["Peperoni"])]);
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
      it("can update an element and its children", function() {
        var element;
        ingredients.update("Gemüse", true);
        element = ingredients.find("Gemüse");
        expect(element.checked).toBe(true);
        expect(element.children[0].checked).toBe(true);
        return expect(element.children[1].checked).toBe(true);
      });
      it("can updates its direct friends as well", function() {
        var element;
        ingredients.update("Artischokken", true);
        element = ingredients.find("Artischokken");
        return expect(ingredients.find(element.friends[0]).checked).toBe(true);
      });
      it("can disable enemies", function() {
        var enemy;
        enemy = ingredients.find("Knoblauch");
        expect(enemy.disabled).toBe(false);
        ingredients.update("Tomaten", true);
        return expect(enemy.disabled).toBe(true);
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
    describe("can be visited", function() {
      return it("returns the itself to the caller", function() {
        var checkbox, func, name;
        checkbox = new cb.Checkbox("first", true);
        name = "?";
        func = function() {
          return name = this.name;
        };
        checkbox.visit(func);
        return expect(name).toBe("first");
      });
    });
    it("can have children", function() {
      var child1, child2, i, parent;
      child1 = new cb.Checkbox("child1", true);
      child2 = new cb.Checkbox("child2", false);
      parent = new cb.Checkbox("parent", true, [child1, child2]);
      expect(parent.children.length).toBe(2);
      i = 0;
      parent.visit(function() {
        return i++;
      });
      return expect(i).toBe(3);
    });
    it("can have friends", function() {
      var checkbox, friend;
      friend = new cb.Checkbox("friend", true);
      checkbox = new cb.Checkbox("cb", true);
      checkbox.setFriends(["friend"]);
      return expect(friend.name).toBe("friend");
    });
    describe("A child checkbox", function() {
      var child;
      child = null;
      beforeEach(function() {
        var parent;
        child = new cb.Checkbox("child", true);
        return parent = new cb.Checkbox("parent", true, [child]);
      });
      it("has a parent checkbox", function() {
        return expect(child.parent.name).toBe("parent");
      });
      return it("has a level of 1", function() {
        return expect(child.level()).toBe(1);
      });
    });
    return describe("A checkbox can", function() {
      var box, finder, friend, friendOfFriend;
      box = null;
      friend = null;
      friendOfFriend = null;
      finder = {
        find: function(name) {
          var found;
          if (name === "box") found = box;
          if (name === "friend") found = friend;
          if (name === "friendOfFriend") found = friendOfFriend;
          return found;
        }
      };
      beforeEach(function() {
        box = new cb.Checkbox("box", false).setFriends(["friend"]);
        friend = new cb.Checkbox("friend", false).setFriends(["friendOfFriend"]);
        return friendOfFriend = new cb.Checkbox("friendOfFriend", false);
      });
      return it("update its friends and their friends", function() {
        box.setChecked(true, finder);
        expect(friend.checked).toBe(true);
        return expect(friendOfFriend.checked).toBe(true);
      });
    });
  });

}).call(this);
