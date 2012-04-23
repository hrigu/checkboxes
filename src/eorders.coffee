jQuery ->
	model = createModel()
	createView(model)
	$(".mycheckbox").click -> 		
		model.update(this.id, this.checked)
		updateUI(model)
	
createModel = () ->
	desc = [
		name: "Teleclub_Basic", checked: false
	,
		name: "Teleclub_Cinema_HD", checked: false, friends: ["Teleclub_Basic"]
	,
		name: "Teleclub_Sport", checked: false, friends: ["Teleclub_Basic"]
	,			
		name: "Teleclub_Sport_HD", checked: false, friends: ["Teleclub_Sport"]
	,
		name: "Teleclub_Family", checked: false, friends: ["Teleclub_Basic"]
	,
		name: "Teleclub_Family_HD", checked: false, friends: ["Teleclub_Family"]			
	,
		name: "Teleclub_Movie", checked: false, friends: ["Teleclub_Basic"]
	,
		name: "Teleclub_Entertainment_HD", checked: false, friends: ["Teleclub_Movie"]			
	,
		name: "Teleclub_Superpaket", checked: false, type: "super", friends: ["Teleclub_Basic", "Teleclub_Sport", "Teleclub_Family", "Teleclub_Movie"]
	,
		name: "Teleclub_Supepaket_HD", checked: false, type: "super", friends: ["Teleclub_Cinema_HD", "Teleclub_Sport_HD", "Teleclub_Family_HD", "Teleclub_Entertainment_HD"]			
	,
		name: "German_channels", checked: false			
	]
	parser = new cb.Parser()
	parser.parse(desc)

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
	
