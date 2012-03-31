(function() {

  describe("Ingredients", function() {
    var ingredients;
    ingredients = null;
    beforeEach(function() {
      return ingredients = new cb.Ingredients();
    });
    describe("has checkboxes", function() {
      return it("has some elements", function() {
        return expect(ingredients.checkboxes.length).toBe(5);
      });
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
    it("can be visited", function() {
      var checkbox, func, name;
      checkbox = new cb.Checkbox("first", true);
      name = "?";
      func = function(cb) {
        return name = cb.name;
      };
      checkbox.visit(func);
      return expect(name).toBe("first");
    });
    return it("can have children", function() {
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
  });

}).call(this);
