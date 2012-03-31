

jQuery ->
	addCheckboxes()

addCheckboxes = () ->
	container = $('#chooser');
	ingredients = new this.cb.Ingredients
	
	func = (checkbox) ->
		append(container, checkbox)
	
	ingredients.visit(func)

append = (container, value) ->
	html = "<input type='checkbox' id='#{value.name}' name=Zutat value='#{value.name}' #{checked_string(value.checked)}>#{value.name}</><br>"
	container.append($(html));
	
checked_string = (checked) ->
	if checked then "checked='checked'" else ""
