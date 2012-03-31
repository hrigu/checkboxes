

jQuery ->
	addCheckboxes()

addCheckboxes = () ->
	container = $('#chooser');
	ingredients = new this.cb.Ingredients
	
	func = (checkbox) ->
		append(container, checkbox)
	
	ingredients.visit(func)

append = (container, checkbox) ->
	html = "<input type='checkbox' id='#{checkbox.name}' name=Zutat value='#{checkbox.name}' #{checked_string(checkbox.checked)}>#{checkbox.name}</><br>"
	container.append($(html));
	
checked_string = (checked) ->
	if checked then "checked='checked'" else ""
