jQuery ->
	ingredients = new cb.Ingredients()
	addCheckboxes(ingredients)	
	$(".mycheckbox").click -> 		
		ingredients.update(this.id, this.checked)
		updateUI(ingredients)
		
addCheckboxes = (ingredients) ->
	
	#create the checkboxes
	container = $('#chooser')
	func = ->
		append(container, this)
	ingredients.visit(func)

append = (container, checkbox) ->
	html = "<li>#{indent(checkbox)}<input type='checkbox' class='mycheckbox' id='#{checkbox.name}' name=Zutat value='#{checkbox.name}' #{checked_string(checkbox.checked)}>#{checkbox.name}</></li>"
	container.append($(html));
	
indent = (checkbox) ->
	if checkbox.level() is 0 then "" else "&nbsp;&nbsp;"
checked_string = (checked) ->
	if checked then "checked='checked'" else ""
	
updateUI = (ingredients) ->
	ingredients.visit ->
		uiCheckbox = $("##{this.name}")[0]
		uiCheckbox.checked = this.checked		
		uiCheckbox.disabled = this.disabled	
	
