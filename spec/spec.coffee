describe "CheckboxGroup", ->
	ingredients = null
	artischokken = null
	peperoni = null
	knoblauch = null
	beforeEach ->
		artischokken = new cb.Checkbox("Artischokken", false)
		peperoni = new cb.Checkbox("Peperoni", false).setFriends([artischokken])
		knoblauch = new cb.Checkbox("Knoblauch", false).setFriends([peperoni])
		
		ingredients = new cb.CheckboxGroup([peperoni, knoblauch])

	it "can visit the elements", ->
		i = 0
		func = () -> i++
		ingredients.visit(func)
		expect(i).toBe 2
	it "can find any element by name", ->
		found = ingredients.find "Peperoni"
		expect(found.name).toBe "Peperoni"
	describe "update", ->
		it "can updates its direct friends", ->
			ingredients.update("Knoblauch", true)
			expect(peperoni.checked).toBe true
		it "can update friends of friends", ->
			ingredients.update("Knoblauch", true)
			expect(artischokken.checked).toBe true
		
describe "Checkbox", ->
	box = null
	friend = null
	otherFriend = null
	friendOfFriend = null

	beforeEach ->			
		friendOfFriend  = new cb.Checkbox("friendOfFriend", false)
		friend = new cb.Checkbox("friend", false).setFriends([friendOfFriend])
		otherFriend = new cb.Checkbox("otherFriend", false)
		box = new cb.Checkbox("box", false).setFriends([friend, otherFriend])
	
	describe "can be visited", ->
		it "returns the itself to the caller", ->
			name = "?"
			func = -> name = this.name
			box.visit(func)
			expect(name).toBe "box"
		
		
	it "can have friends", ->
		expect(box.friends[0].name).toBe("friend")
		
	it "can have fans", ->
		expect(friend.fans[0].name).toBe("box")
		
	describe "setChecked", ->
		describe "when checking the checkbox", ->
		
			it "checkes its friends and their friends as well", ->
				box.setChecked(true)
				expect(friend.checked).toBe true
				expect(friendOfFriend.checked).toBe true
				
		describe "when unchecking the checkbox", ->
			it "it uncheckes not its checked friends and their checked friends", ->
				box.setChecked(true)
				expect(friend.checked).toBe true
				expect(friendOfFriend.checked).toBe true
				box.setChecked(false)
				expect(box.checked).toBe false
				expect(friend.checked).toBe true
				expect(friendOfFriend.checked).toBe true
			it "it uncheckes the checkboxes which have this as friend", ->
				box.setChecked(true)
				expect(friend.checked).toBe true
				expect(friendOfFriend.checked).toBe true
				
				friendOfFriend.setChecked(false)
				expect(box.checked).toBe false
				expect(friend.checked).toBe false
				expect(friendOfFriend.checked).toBe false
		
	describe "checkIfAllMyFriendsAreChecked", ->
		describe "property isCheckIfAllMyFriendsAreChecked is true", ->
			beforeEach ->			
				box.isCheckIfAllMyFriendsAreChecked=true
			it "checkes if all its friends are checked", -> 
				expect(box.checked).toBe false
				friend.setChecked(true)
				otherFriend.setChecked(true)
				expect(box.checked).toBe false
				box.checkIfAllMyFriendsAreChecked()
				expect(box.checked).toBe true

	describe "can toggle collegue", ->		
		beforeEach ->			
			friend.enemy = otherFriend
			otherFriend.enemy = friend
		it "toggle college when checked", ->
			friend.setChecked(false)
			expect(otherFriend.checked).toBe true
			friend.setChecked(true)
			expect(otherFriend.checked).toBe false

			
	
			
		
			