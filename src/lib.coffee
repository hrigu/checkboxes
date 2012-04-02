this.cb = {}

class cb.CheckboxGroup

	constructor: (@checkboxes = []) ->
	update: (name, checked) ->
		element = this.find(name)
		element.setChecked(checked, this)
			
		for enemyName in element.enemies
				this.find(enemyName).disabled = checked
			
	visit: (func) ->
		checkbox.visit(func) for checkbox in @checkboxes
	
	find: (name) ->
		found = null
		this.visit ->
			if this.name is name
				found = this
		found		

class cb.Checkbox
	disabled: false
	friends: []
	enemies: []
	constructor: (@name, @checked, @children = []) ->
	setFriends: (@friends) -> this		
	setEnemies: (@enemies) -> this
	setUpdateHandler: (@updateHandler) -> this		
	visit: (func) ->
		func.call(this)
		child.visit(func) for child in @children
	
		
	setChecked: (checked, finder) ->
		@checked = checked
		for friendName in @friends
			friend = finder.find(friendName)
			friend.setChecked(checked, finder)

	
