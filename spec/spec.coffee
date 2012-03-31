describe "Ingredients", ->
	ingredients = null
	beforeEach ->
		ingredients = new cb.Ingredients()

	describe "has checkboxes", ->
		it "has some elements", ->
			expect(ingredients.checkboxes.length).toBe 5
			
	it "can visit the elements", ->
		i = 0
		func = () -> i++
		ingredients.visit(func)
		expect(i).toBe 5
		
