jQuery ->
	model = createModel()
	createView(model)
	$(".mycheckbox").click -> 		
		model.update(this.id, this.checked)
		updateUI(model)
	
createModel = () ->

	teleclub_Basic = new cb.Checkbox("Teleclub_Basic", false)

	teleclub_Cinema_HD = new cb.Checkbox("Teleclub_Cinema_HD", false).setFriends([teleclub_Basic])
	teleclub_Sport = new cb.Checkbox("Teleclub_Sport", false).setFriends([teleclub_Basic])
	teleclub_Sport_HD = new cb.Checkbox("Teleclub_Sport_HD", false).setFriends([teleclub_Sport])
	teleclub_Family = new cb.Checkbox("Teleclub_Family", false).setFriends([teleclub_Basic])
	teleclub_Family_HD = new cb.Checkbox("Teleclub_Family_HD", false).setFriends([teleclub_Family])
	teleclub_Movie = new cb.Checkbox("Teleclub_Movie", false).setFriends([teleclub_Basic])
	teleclub_Enterainment_HD = new cb.Checkbox("Teleclub_Enterainment_HD", false).setFriends([teleclub_Movie])
	
	teleclub_Superpaket = new cb.SuperCheckbox("Teleclub_Superpaket", false).setFriends([teleclub_Basic, teleclub_Sport, teleclub_Family, teleclub_Movie])
	teleclub_Superpaket_SD_HD = new cb.SuperCheckbox("Teleclub_Superpaket_SD_HD", false).setFriends([teleclub_Cinema_HD, teleclub_Sport_HD, teleclub_Family_HD, teleclub_Enterainment_HD])
	teleclub_Superpaket_Other = new cb.SuperCheckbox("teleclub_Superpaket_Other", false).setFriends([teleclub_Sport_HD, teleclub_Family_HD, teleclub_Enterainment_HD])
	german_channels = new cb.Checkbox("German_channels", false)
		
	cbx = [
		teleclub_Basic
		teleclub_Cinema_HD
		teleclub_Sport
		teleclub_Sport_HD
		teleclub_Family
		teleclub_Family_HD
		teleclub_Movie
		teleclub_Enterainment_HD
		teleclub_Superpaket
		teleclub_Superpaket_SD_HD
		#teleclub_Superpaket_Other
		german_channels
	]
	new cb.CheckboxGroup(cbx)

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
	
