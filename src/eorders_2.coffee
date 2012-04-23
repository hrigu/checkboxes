jQuery ->
	model = createModel()
	createView(model)
	$(".mycheckbox").click -> 		
		model.update(this.id, this.checked)
		updateUI(model)
	
createModel = ->
	parser = new cb.Parser()
	parser.parse(modelDesc)

createView = (model) ->
	#create the checkboxes
	container = $('#chooser')
	func = ->
		append(container, this)
	model.visit(func)

append = (container, checkbox) ->
	html = "<li><input type='checkbox' class='mycheckbox' id='#{checkbox.name}' name=Zutat value='#{checkbox.name}' #{checked_string(checkbox.checked)}>#{checkbox.name}</></li>"
	container.append($(html));
	
checked_string = (checked) ->
	if checked then "checked='checked'" else ""
	
updateUI = (model) ->
	model.visit ->
		uiCheckbox = $("##{this.name}")[0]
		uiCheckbox.checked = this.checked		
		uiCheckbox.disabled = this.disabled	
	
