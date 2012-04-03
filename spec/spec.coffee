describe "CheckboxGroup", ->
	ingredients = null
	beforeEach ->
		ingredients = new cb.CheckboxGroup([
			new cb.Checkbox("Gemüse", false, [
				new cb.Checkbox("Tomaten", false)
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
		
describe "Checkbox", ->
	box = null
	friend = null
	otherFriend = null
	friendOfFriend = null
	
	finder =
		find: (name) ->
			found = box if (name is "box")
			found = friend if (name is "friend")
			found = friendOfFriend if (name is "friendOfFriend")
			found = otherFriend if (name is "otherFriend")
			found
			
		findCheckboxesWhichHasThisFriend: (name) ->
			found = [] if (name is "box")
			found = [box] if (name is "friend")
			found = [box] if (name is "otherFriend")
			found = [friend] if (name is "friendOfFriend")
			found
			
			
	beforeEach ->			
		box = new cb.Checkbox("box", false).setFriends(["friend", "otherFriend"])
		friend = new cb.Checkbox("friend", false).setFriends(["friendOfFriend"])
		otherFriend = new cb.Checkbox("otherFriend", false)
		friendOfFriend  = new cb.Checkbox("friendOfFriend", false)

	describe "can be visited", ->
		it "returns the itself to the caller", ->
			name = "?"
			func = -> name = this.name
			box.visit(func)
			expect(name).toBe "box"
		
		
	it "can have friends", ->
		friend = new cb.Checkbox("friend", true)
		checkbox =  new cb.Checkbox("cb", true)
		checkbox.setFriends(["friend"])
		expect(friend.name).toBe("friend")
		
					
	describe "setChecked", ->
		describe "when checking the checkbox", ->
		
			it "checkes its friends and their friends as well", ->
				box.setChecked(true, finder)
				expect(friend.checked).toBe true
				expect(friendOfFriend.checked).toBe true
				
		describe "when unchecking the checkbox", ->
			it "it uncheckes not its checked friends and their checked friends", ->
				box.setChecked(true, finder)
				expect(friend.checked).toBe true
				expect(friendOfFriend.checked).toBe true
				box.setChecked(false, finder)
				expect(box.checked).toBe false
				expect(friend.checked).toBe true
				expect(friendOfFriend.checked).toBe true
			it "it uncheckes the checkboxes which have this as friend", ->
				box.setChecked(true, finder)
				expect(friend.checked).toBe true
				expect(friendOfFriend.checked).toBe true
				
				friendOfFriend.setChecked(false, finder)
				expect(box.checked).toBe false
				expect(friend.checked).toBe false
				expect(friendOfFriend.checked).toBe false
		
	describe "checkIfAllMyFriendsAreChecked", ->
		describe "property isCheckIfAllMyFriendsAreChecked is true", ->
			beforeEach ->			
				box.isCheckIfAllMyFriendsAreChecked=true
			it "checkes if all its friends are checked", -> 
				expect(box.checked).toBe false
				friend.setChecked(true, finder)
				otherFriend.setChecked(true, finder)
				expect(box.checked).toBe false
				box.checkIfAllMyFriendsAreChecked(finder)
				expect(box.checked).toBe true

	describe "can toggle collegue", ->		
		beforeEach ->			
			friend.enemy = otherFriend
			otherFriend.enemy = friend
		it "toggle college when checked", ->
			friend.setChecked(false, finder)
			expect(otherFriend.checked).toBe true
			friend.setChecked(true, finder)
			expect(otherFriend.checked).toBe false

			
	
			
		
			