this.cb = {}

class cb.Ingredients

	constructor: () ->
		this.init()
	init: () ->
		@checkboxes = [
			this._create("Kapern", true)
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
		console.log name
		new cb.Checkbox(name, checked, children)
			
	visit: (func) ->
		checkbox.visit(func) for checkbox in @checkboxes

class cb.Checkbox
	parent: null
	constructor: (@name, @checked, @children = null) ->
		if (@children != null)
			child.parent = this for child in @children
			
	level: (size = 0) ->
		if @parent != null then @parent.level(size+1) else size	
	visit: (func) ->
		func(this)
		if @children != null
			child.visit(func) for child in @children
