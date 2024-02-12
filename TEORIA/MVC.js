// EJEMPLO MODELO

//containers for our model
var DB = {
	users: [],
	users_by_id: {},
	last_id: 0
};

//example of function to manage our model
DB.addUser = function( user )
{
	user.id = this.last_id++;
	this.users.push(user);
	this.users_by_id[ user.id ] = user;
}

//example of one item in our model
var user1 = new User();
user1.name = "John";
DB.addUser( user1 );



// EJEMPLO VIEW

//declarative
function onModelChange()
{
	div.innerHTML = ""; //clear all 
	for(var i in DB.users)
{
	var user = DB.users[i];
	//create element
	var elem = document.createElement("p");
	elem.className = "user";
	elem.innerText = user.name;
	//add to DOM
	div.appendChild( elem );
}
}

// EJEMPLO CONTROLADOR

function onBuyItem(item)
{
	//remove from stock
	//add to user inventory
	//remove money from account
	//send email of confirmation
}



button.onclick = function(){
	onBuyItem( this.item_id );
}

// EXAMPLE OF USING DATABASES

var DB = {
	getUserById: function(id,callback)
{
	//access DB
	//clean data
	//call callback with data
}
};
