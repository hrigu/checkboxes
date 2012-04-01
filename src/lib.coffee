this.cb = {}

class cb.Ingredients

	constructor: () ->
		this.init()
	init: () ->
		@checkboxes = [
			this._create("Kapern", false, [this._create("Gross", false)]).setFriends(["Oliven", "Pilze"])
		,
			this._create("Oliven", false)
		,
			this._create("Salami", false, [this._create("Scharf", true)])
		,
			this._create("Pilze", false)
		,
			this._create("Sardellen", true)
		]
		
	_create: (name, checked, children) ->
		new cb.Checkbox(name, checked, children)
		
	update: (name, checked) ->
		element = this.find(name)
		element.checked = checked
		child.checked = checked for child in element.children
		for friendName in element.friends
			this.find(friendName).checked = checked		
			
	visit: (func) ->
		checkbox.visit(func) for checkbox in @checkboxes
	
	find: (name) ->
		found = null
		this.visit (checkbox) ->
			if checkbox.name is name
				found = checkbox
		found

class cb.Checkbox
	parent: null
	friends: []
	constructor: (@name, @checked, @children = []) ->
		if (@children != null)
			child.parent = this for child in @children
	setFriends: (@friends) -> this		
	level: (size = 0) ->
		if @parent != null then @parent.level(size+1) else size	
	visit: (func) ->
		func(this)
		child.visit(func) for child in @children
