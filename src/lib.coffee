this.cb = {}

class cb.Ingredients

	constructor: () ->
		this.init()
	init: () ->
		@checkboxes = [
			new cb.Checkbox("Kapern", true)
		,
			new cb.Checkbox("Oliven", false)
		,
			new cb.Checkbox("Salami", false, [
				new cb.Checkbox("Scharf", true)
			]
			)
		,
			new cb.Checkbox("Pilze", false)
		,
			new cb.Checkbox("Sardellen", true)
		]
		
	visit: (func) ->
		checkbox.visit(func, 0) for checkbox in @checkboxes

class cb.Checkbox
	constructor: (@name, @checked, @children = null) ->
		
	visit: (func, level = 0) ->
		func(this, level)
		if @children != null
			child.visit(func, level + 1) for child in @children
