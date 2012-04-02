this.cb = {}

class cb.CheckboxGroup

	constructor: (@checkboxes) ->
	update: (name, checked) ->
		element = this.find(name)
		element.checked = checked
		child.checked = checked for child in element.children
		for friendName in element.friends
			this.find(friendName).checked = checked		
		for enemyName in element.enemies
				this.find(enemyName).disabled = checked
		if element.updateHandler != null
			this.visit(element.updateHandler)	
			
	visit: (func) ->
		checkbox.visit(func) for checkbox in @checkboxes
	
	find: (name) ->
		found = null
		this.visit ->
			if this.name is name
				found = this
		found

class cb.Checkbox
	parent: null
	friends: []
	enemies:[]
	disabled: false
	updateHandler: null
	constructor: (@name, @checked, @children = []) ->
		if (@children != null)
			child.parent = this for child in @children
	setFriends: (@friends) -> this		
	setEnemies: (@enemies) -> this
	setUpdateHandler: (@updateHandler) -> this		
	level: (size = 0) ->
		if @parent != null then @parent.level(size+1) else size	
	visit: (func) ->
		func.call(this)
		child.visit(func) for child in @children
