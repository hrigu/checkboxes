jQuery ->
	ingredients = createModel()
	createView(ingredients)
	$(".mycheckbox").click -> 		
		ingredients.update(this.id, this.checked)
		updateUI(ingredients)
	
createModel = () ->
	cbx = [
		new cb.Checkbox("Pizza_Al_Padrone", false).setFriends(["Mozzarella", "Tomaten", "Oliven", "Pilze", "Knoblauch"]).setEnemies(["Artischokken", "Peperoni", "Schinken"])		
		new cb.Checkbox("Pizza_Napoli", false).setFriends(["Mozzarella", "Tomaten", "Oliven", "Kapern", "Sardellen"])
		new cb.Checkbox("Pizza_Diavolo", false).setFriends(["Mozzarella","Tomaten", "Peperoncini", "Knoblauch"])
		new cb.Checkbox("Mozzarella", false)
		new cb.Checkbox("Gemüse", false, [
			new cb.Checkbox("Tomaten", false)
			new cb.Checkbox("Artischokken", false)
			new cb.Checkbox("Peperoni", false)
			new cb.Checkbox("Peperoncini", false)
		])
		new cb.Checkbox("Schinken", false)
		new cb.Checkbox("Salami", false)
		new cb.Checkbox("Oliven", false).setEnemies ["Sardellen"]
		new cb.Checkbox("Kapern", false)
		new cb.Checkbox("Knoblauch", false)
		new cb.Checkbox("Pilze", false).setFriends ["Sardellen"]
		new cb.Checkbox("Sardellen", false)
	]
	new cb.CheckboxGroup(cbx)

createView = (ingredients) ->
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
	
