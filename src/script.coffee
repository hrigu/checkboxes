

jQuery ->
	addCheckboxes()

addCheckboxes = () ->
	container = $('#chooser');
	ingredients = new this.cb.Ingredients
	
	func = (checkbox) ->
		append(container, checkbox)
	
	ingredients.visit(func)

append = (container, checkbox) ->
	html = "<li>#{indent(checkbox)}<input type='checkbox' id='#{checkbox.name}' name=Zutat value='#{checkbox.name}' #{checked_string(checkbox.checked)}>#{checkbox.name}</></li>"
	container.append($(html));
	
indent = (checkbox) ->
	if checkbox.level() is 0 then "" else "&nbsp;&nbsp;"
checked_string = (checked) ->
	if checked then "checked='checked'" else ""
