this.cb = {}

class cb.Ingredients

	constructor: () ->
		this.init()
	init: () ->
		@checkboxes = [
			#this._create("Tutti", false).setUpdateHandler( -> this.checked = true)
			this._create("Kapern", false, [this._create("Gross", false)]).setFriends(["Oliven", "Pilze"])
			this._create("Oliven", false).setEnemies ["Sardellen"]
			this._create("Salami", false, [this._create("Scharf", false)])
			this._create("Pilze", false).setFriends ["Sardellen"]
			this._create("Sardellen", false)
		]
		
	_create: (name, checked, children) ->
		new cb.Checkbox(name, checked, children)
		
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
