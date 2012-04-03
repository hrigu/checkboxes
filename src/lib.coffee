this.cb = {}

class cb.CheckboxGroup

	constructor: (@checkboxes = []) ->
	update: (name, checked) ->
		element = this.find(name)
		element.setChecked(checked, this)
		
		current.checkIfAllMyFriendsAreChecked(this) for current in @checkboxes
		null
			
	visit: (func) ->
		checkbox.visit(func) for checkbox in @checkboxes
	
	find: (name) ->
		found = null
		this.visit ->
			if this.name is name
				found = this
		found	
		
	findCheckboxesWhichHasThisFriend: (name) ->
		found = []
		this.visit ->
			for candidate in this.friends
				if (candidate is name)
					found.push this
		found		

class cb.Checkbox
	isCheckIfAllMyFriendsAreChecked: false
	friends: []
	enemy: null
	constructor: (@name, @checked, @children = []) ->
	setFriends: (@friends) -> this		
	setUpdateHandler: (@updateHandler) -> this		
	visit: (func) ->
		func.call(this)
		child.visit(func) for child in @children
	
		
	setChecked: (checked, finder) ->
		@checked = checked
		if @enemy != null
			@enemy.checked = !checked
		if checked
			for friendName in @friends
				friend = finder.find(friendName)
				friend.setChecked(checked, finder)
		else 
			for hasMeAsFriend in finder.findCheckboxesWhichHasThisFriend(@name)
				hasMeAsFriend.setChecked(checked, finder)
	
	checkIfAllMyFriendsAreChecked: (finder)->		
		for friendName in @friends
			friend = finder.find(friendName)
			friend.checkIfAllMyFriendsAreChecked(finder)
		if this.isCheckIfAllMyFriendsAreChecked
			areAllChecked = false
			
			for friendName in @friends
				friend = finder.find(friendName)
				areAllChecked = friend.checked
				break if !areAllChecked
			this.checked = true if areAllChecked		

	
