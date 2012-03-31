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
      return expect(i).toBe(5);
    });
  });

}).call(this);
