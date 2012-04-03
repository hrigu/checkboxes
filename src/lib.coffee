this.cb = {}

class cb.CheckboxGroup

	constructor: (@checkboxes = [], @supercheckboxes = []) ->

	update: (name, checked) ->
		trigger = this.find(name)
		if (checked)
			if trigger instanceof cb.SuperCheckbox
				for checkbox in @supercheckboxes
					if (checkbox.checked)
						checkbox.setUnchecked()						
			
			trigger.setChecked()
		else 
			trigger.setUnchecked()
		if (!(trigger instanceof cb.SuperCheckbox))	
			checkbox.checkIfAllFriendsAreChecked() for checkbox in @supercheckboxes
			this._deselectAllButTheBoss()
		
		null
			
	visit: (func) ->
		checkbox.visit(func) for checkbox in @checkboxes
		checkbox.visit(func) for checkbox in @supercheckboxes
	
	find: (name) ->
		found = null
		this.visit ->
			if this.name is name
				found = this
		found
		
	_deselectAllButTheBoss:() ->
		checked = []
		for checkbox in @supercheckboxes
			checked.push checkbox if checkbox.checked
		if checked.length > 1
			winner = checked[0]
			for checkbox in checked
				winner = checkbox if  winner.countFriends() < checkbox.countFriends()
			for box in checked
				if box != winner
					box.checked = false
		
class cb.Checkbox
	constructor: (@name, @checked) ->
		@fans = []
		@friends = []
		@isTrigger = false
		
	setFriends: (@friends) -> 
		for friend in @friends
			friend.fans.push(this)
		this		

	visit: (func) ->
		func.call(this)
		
	#some friends are counted several times
	countFriends: ->
		x = @friends.length
		for friend in @friends
			x += friend.countFriends()
		x
		
	setChecked: ->
		@checked = true
		for friend in @friends
			friend.setChecked()
	setUnchecked: ->
		@checked = false
		this._uncheckFans()

	_uncheckFans: -> 
		@checked = false
		for fan in @fans
			fan._uncheckFans()
	
	_uncheckFriends: () ->
		@checked = false
		for friend in @friends
			friend._uncheckFriends()
	
	_areAllFriendsChecked: (checked) ->
		for friend in @friends
			return false if  !friend.checked
		for friend in @friends
			checked = friend._areAllFriendsChecked(checked) 
			break if !checked
		checked
				
		
class cb.SuperCheckbox extends cb.Checkbox	
	
			
	setUnchecked: ->
		this._uncheckFriends()
		
	checkIfAllFriendsAreChecked: ->
		@checked = this._areAllFriendsChecked(true)
