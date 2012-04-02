describe "CheckboxGroup", ->
	ingredients = null
	beforeEach ->
		ingredients = new cb.CheckboxGroup([
			new cb.Checkbox("Gemüse", false, [
				new cb.Checkbox("Tomaten", false).setEnemies(["Knoblauch"])
				new cb.Checkbox("Artischokken", false).setFriends(["Knoblauch"])
				
			])
			new cb.Checkbox("Peperoni", false)
			new cb.Checkbox("Knoblauch", false).setFriends(["Peperoni"])
		])

	it "can visit the elements", ->
		i = 0
		func = () -> i++
		ingredients.visit(func)
		expect(i).toBe 5
	it "can find any element by name", ->
		found = ingredients.find "Tomaten"
		expect(found.name).toBe "Tomaten"
	describe "update", ->
		it "can updates its direct friends", ->
			ingredients.update("Artischokken", true)
			element = ingredients.find("Artischokken")
			expect(ingredients.find(element.friends[0]).checked).toBe true
		it "can update friends of friends", ->
			ingredients.update("Artischokken", true)
			friendOfFriend = ingredients.find("Peperoni")
			expect(friendOfFriend.checked).toBe true
		it "can disable enemies", ->
			enemy = ingredients.find("Knoblauch")
			expect(enemy.disabled).toBe false
			ingredients.update("Tomaten", true)
			expect(enemy.disabled).toBe true
		
describe "Checkbox", ->
	describe "can be visited", ->
		it "returns the itself to the caller", ->
			checkbox = new cb.Checkbox("first", true)
			name = "?"
			func = -> name = this.name
			checkbox.visit(func)
			expect(name).toBe "first"
		
		
	it "can have friends", ->
		friend = new cb.Checkbox("friend", true)
		checkbox =  new cb.Checkbox("cb", true)
		checkbox.setFriends(["friend"])
		expect(friend.name).toBe("friend")
		
					
	describe "A checkbox can", ->
		box = null
		friend = null
		friendOfFriend = null
		
		finder =
			find: (name) ->
				found = box if (name is "box")
				found = friend if (name is "friend")
				found = friendOfFriend if (name is "friendOfFriend")
				found
				
		beforeEach ->			
			box = new cb.Checkbox("box", false).setFriends(["friend"])
			friend = new cb.Checkbox("friend", false).setFriends(["friendOfFriend"])
			friendOfFriend  = new cb.Checkbox("friendOfFriend", false)
		
		it "update its friends and their friends", ->
			box.setChecked(true, finder)
			expect(friend.checked).toBe true
			expect(friendOfFriend.checked).toBe true
		
			
				
			
		
			