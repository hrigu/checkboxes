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
		expect(i).toBe 6
		
describe "Checkbox", ->
	it "can be visited", ->
		checkbox = new cb.Checkbox("first", true)
		name = "?"
		func = (cb) -> name = cb.name
		checkbox.visit(func)
		expect(name).toBe "first"
		
	it "can have children", ->
		child1 = new cb.Checkbox("child1", true)
		child2 = new cb.Checkbox("child2", false)
	
		parent = new cb.Checkbox("parent", true, [child1, child2])
		
		expect(parent.children.length).toBe 2
		
		i = 0
		parent.visit(-> i++)
		expect(i).toBe 3
		
		
			