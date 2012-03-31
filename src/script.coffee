

jQuery ->
	addCheckboxes(new this.cb.Selection().selection)

addCheckboxes = (selection) ->
	container = $('#chooser');
	append container, value for value in selection

append = (container, value) ->
	html = "<input type='checkbox' id='#{value.name}' name=Zutat value='#{value.name}' #{checked_string(value.checked)}>#{value.name}</><br>"
	container.append($(html));
	
checked_string = (checked) ->
	if checked then "checked='checked'" else ""
