(function() {

  describe("Ingredients", function() {
    var ingredients;
    ingredients = null;
    beforeEach(function() {
      return ingredients = new cb.Ingredients();
    });
    it("has 5 parent checkboxes", function() {
      return expect(ingredients.checkboxes.length).toBe(5);
    });
    return it("can visit the elements", function() {
      var func, i;
      i = 0;
      func = function() {
        return i++;
      };
      ingredients.visit(func);
      return expect(i).toBe(6);
    });
  });

  describe("Checkbox", function() {
    describe("can be visited", function() {
      return it("returns the itself to the caller", function() {
        var checkbox, func, name;
        checkbox = new cb.Checkbox("first", true);
        name = "?";
        func = function(cb) {
          return name = cb.name;
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
    return describe("A child checkbox", function() {
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
  });

}).call(this);
