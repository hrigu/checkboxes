this.cb = {}

class cb.Ingredients
	checkboxes: [
		new cb.Checkbox("Kapern", true)
	,
		new cb.Checkbox("Oliven", false)
	,
		new cb.Checkbox("Salami", false)
	,
		new cb.Checkbox("Pilze", false)
	,
		new cb.Checkbox("Sardellen", true)
	]

	visit: (func) ->
		checkbox.visit(func) for checkbox in @checkboxes

class cb.Checkbox
	constructor: (@name, @checked, @children) ->
	visit: (func) ->
		func(this)
