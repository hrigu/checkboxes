describe "class CheckboxGroup", ->
	checkboxGroup = null
	artischokken = null
	peperoni = null
	knoblauch = null
	beforeEach ->
		desc = [
			name: "Artischokken", checked: false
		,
			name: "Peperoni", checked: false, friends: ["Artischokken"]
		,
			name: "Knoblauch", checked: false, friends: ["Peperoni"]			
		]
		parser = new cb.Parser()
		checkboxGroup = parser.parse(desc)
		artischokken = checkboxGroup.find("Artischokken")
		peperoni = checkboxGroup.find("Peperoni")
		knoblauch = checkboxGroup.find("Knoblauch")

	it "should visit all checkboxes", ->
		i = 0
		func = () -> i++
		checkboxGroup.visit(func)
		expect(i).toBe 3
	
	it "should find any element by name", ->
		expect(checkboxGroup.find("Peperoni").name).toBe "Peperoni"
	
	describe "the method 'update' with spies", ->
		beforeEach ->
			spyOn(knoblauch, "setChecked")
			spyOn(knoblauch, "setUnchecked")
			spyOn(checkboxGroup, '_postProcess');
			spyOn(checkboxGroup, '_toggleIfSupercheckbox');

		describe "with check = true", ->		
			it "should call setChecked and others", ->
				checkboxGroup.update("Knoblauch", true)
				expect(checkboxGroup._toggleIfSupercheckbox).toHaveBeenCalledWith(knoblauch)
				expect(knoblauch.setChecked).toHaveBeenCalled();			
				expect(checkboxGroup._postProcess).toHaveBeenCalledWith(knoblauch)

		describe "with check = false", ->		
			it "should call setUnchecked and _postprocess", ->
				expect(checkboxGroup._toggleIfSupercheckbox).not.toHaveBeenCalled()
				checkboxGroup.update("Knoblauch", false)
				expect(knoblauch.setUnchecked).toHaveBeenCalled();			
				expect(checkboxGroup._postProcess).toHaveBeenCalledWith(knoblauch)
			
			
	describe "the method 'update' with real objects", ->
		describe "with check = true", ->
			it "should check the specified checkbox and its direct friends", ->
				checkboxGroup.update("Knoblauch", true)
				expect(peperoni.checked).toBe true
			it "and the friends of friends", ->
				checkboxGroup.update("Knoblauch", true)
				expect(artischokken.checked).toBe true
		describe "with check = false", ->
			beforeEach ->
				checkboxGroup.update("Knoblauch", true)
			it "should uncheck the specified checkbox and its fans", ->
				checkboxGroup.update("Artischokken", false)
				expect(artischokken.checked).toBe false
				expect(peperoni.checked).toBe false
				expect(knoblauch.checked).toBe false						
		
describe "class Checkbox", ->
	trigger = null
	fanOfTrigger = null
	fanOfFanOfTrigger = null
	friend = null
	otherFriend = null
	friendOfFriend = null
	fanOfFriend = null

	beforeEach ->
		desc = [
			name: "friendOfFriend", checked: false
		,
			name: "friend", checked: false, friends: ["friendOfFriend"]
		,
			name: "fanOfFriend", checked: false, friends: ["friend"]			
		,
			name: "otherFriend", checked: false
		,
			name: "trigger", checked: false, friends: ["friend", "otherFriend"]
		,
			name: "fanOfTrigger", checked: false, friends: ["trigger"]			
		,
			name: "fanOfFanOfTrigger", checked: false, friends: ["fanOfTrigger"]			
		]
		parser = new cb.Parser()
		checkboxGroup = parser.parse(desc)
		
		friendOfFriend = checkboxGroup.find("friendOfFriend")
		friend = checkboxGroup.find("friend")
		fanOfFriend = checkboxGroup.find("fanOfFriend")

		otherFriend = checkboxGroup.find("otherFriend")
		trigger = checkboxGroup.find("trigger")
		fanOfTrigger = checkboxGroup.find("fanOfTrigger")
		fanOfFanOfTrigger = checkboxGroup.find("fanOfFanOfTrigger")
	
	describe "the method 'visit'", ->
		it "should return itself to the caller", ->
			name = "?"
			func = -> name = this.name
			trigger.visit(func)
			expect(name).toBe "trigger"
		
		
	it "can have friends", ->
		expect(trigger.friends[0].name).toBe("friend")
		
	it "can have fans", ->
		expect(trigger.fans[0].name).toBe("fanOfTrigger")
		
	describe "The method setChecked", ->
		it "should check its friends and their friends as well", ->
			trigger.setChecked()
			expect(friend.checked).toBe true
			expect(friendOfFriend.checked).toBe true
		it "but not the fans", ->
			trigger.setChecked()
			expect(fanOfFriend.checked).toBe false
			expect(fanOfTrigger.checked).toBe false
			expect(fanOfFanOfTrigger.checked).toBe false
				
	describe "The method 'setUnchecked'", ->
		it "should uncheck the fans and their fans", ->
			fanOfFanOfTrigger.setChecked()
			expect(friend.checked).toBe true
			expect(friendOfFriend.checked).toBe true
			expect(fanOfTrigger.checked).toBe true
			fanOfFriend.setChecked()
			expect(fanOfFriend.checked).toBe true
			
			trigger.setUnchecked()
			expect(trigger.checked).toBe false
			expect(fanOfTrigger.checked).toBe false
			expect(fanOfFanOfTrigger.checked).toBe false
			expect(fanOfFriend.checked).toBe true

		it "should not uncheck the friends and their  friends", ->
			trigger.setChecked()
			expect(friend.checked).toBe true
			expect(friendOfFriend.checked).toBe true
			trigger.setUnchecked()
			expect(trigger.checked).toBe false
			expect(friend.checked).toBe true
			expect(friendOfFriend.checked).toBe true

describe "class SuperCheckbox", ->

	trigger = null
	friend = null
	otherFriend = null
	friendOfFriend = null
	fanOfFriend = null
	
	beforeEach ->			
		desc = [
			name: "friendOfFriend", checked: false
		,
			name: "friend", checked: false, friends: ["friendOfFriend"]
		,
			name: "fanOfFriend", checked: false, friends: ["friend"]			
		,
			name: "otherFriend", checked: false
		,
			name: "trigger", checked: false, type: "super", friends: ["friend", "otherFriend"]
		]
		parser = new cb.Parser()
		checkboxGroup = parser.parse(desc)
		
		friendOfFriend = checkboxGroup.find("friendOfFriend")
		friend = checkboxGroup.find("friend")
		fanOfFriend = checkboxGroup.find("fanOfFriend")
		otherFriend = checkboxGroup.find("otherFriend")
		trigger = checkboxGroup.find("trigger")

	describe "the method 'setChecked'", ->
		it "should check its friends and their friends as well (works like the unchecked method of the subclass)", ->
			trigger.setChecked()
			expect(trigger.checked).toBe true
			expect(friend.checked).toBe true
			expect(friendOfFriend.checked).toBe true
			expect(fanOfFriend.checked).toBe false
			
	
	describe "the method 'setUnchecked'", ->
		it "should uncheck all friends and their friends and their fans", ->
			trigger.setChecked()
			fanOfFriend.setChecked()
			expect(fanOfFriend.checked).toBe true
			trigger.setUnchecked()
			expect(trigger.checked).toBe false
			expect(friend.checked).toBe false
			expect(friendOfFriend.checked).toBe false
			expect(fanOfFriend.checked).toBe false
			
	describe "method 'setCheckedIfAllFriendsAreChecked'", ->
		it "should check if all friends are checked", ->
			expect(friend.checked).toBe false
			expect(otherFriend.checked).toBe false
			expect(trigger.checked).toBe false
			friend.setChecked()
			trigger.setCheckedIfAllFriendsAreChecked()
			expect(friend.checked).toBe true
			expect(otherFriend.checked).toBe false
			expect(trigger.checked).toBe false
			otherFriend.setChecked()
			trigger.setCheckedIfAllFriendsAreChecked()
			expect(friend.checked).toBe true
			expect(otherFriend.checked).toBe true
			expect(trigger.checked).toBe true
			
		
			