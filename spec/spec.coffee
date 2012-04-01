describe "Ingredients", ->
	ingredients = null
	beforeEach ->
		ingredients = new cb.Ingredients()

	it "has 5 parent checkboxes", ->
		expect(ingredients.checkboxes.length).toBe 5
			
	it "can visit the elements", ->
		i = 0
		func = () -> i++
		ingredients.visit(func)
		expect(i).toBe 7
	it "can find an element", ->
		found = ingredients.find "Oliven"
		expect(found.name).toBe "Oliven"
	describe "update", ->
		it "can update", ->
			ingredients.update("Kapern", true)
			element = ingredients.find("Kapern")
			expect(element.checked).toBe true
			expect(element.children[0].checked).toBe true
			expect(ingredients.find(element.friends[0]).checked).toBe true
			
		
describe "Checkbox", ->
	describe "can be visited", ->
		it "returns the itself to the caller", ->
			checkbox = new cb.Checkbox("first", true)
			name = "?"
			func = -> name = this.name
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
		
	it "can have friends", ->
		friend = new cb.Checkbox("friend", true)
		checkbox =  new cb.Checkbox("cb", true)
		checkbox.setFriends(["friend"])
		expect(friend.name).toBe("friend")
		
		
	describe "A child checkbox", ->
		child = null
		beforeEach ->
			child = new cb.Checkbox("child", true)	
			parent = new cb.Checkbox("parent", true, [child])
			
		it "has a parent checkbox", ->
			expect(child.parent.name).toBe "parent"
		it "has a level of 1", ->
			expect(child.level()).toBe 1
		
			
				
			
		
			