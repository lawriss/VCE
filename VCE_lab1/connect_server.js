
var server = new SillyClient();

//connect to the SillyServer course server installed at the UPF
server.connect( "wss://ecv-etic.upf.edu/node/9000/ws", "LAURA_APP_" + user.room_name);

//Also you can have several sillyclient instances if you want to connect to several channels at the same time.

// on_ready: to know which is your user_id
server.on_ready = function( my_id )
{
	user.id = my_id;
}

// on_user_connected: to know when new users enter the room
server.on_user_connected = function(user_id)
{
	// add new chat to the list of users area
	var array_chats = document.querySelector(".users-area");
	var elem = document.createElement("div");
	elem.className = ".user-chat";
	elem.id = user_id;
	elem.innerHTML = "username_"+user_id;
	array_chats.appendChild(elem);
	array_chats.scrollTop = 10000;

	// create new historial of messages
	// ...
}

// on_user_disconnected: to know when users leave the room
server.on_user_disconnected = function(user_id)
{
	// remove user chat to the list of users area
	var user_discon = document.querySelector("#"+user_id);
	user_discon.style.display = "none"; //disapear

	// remove historial ...
}

// on_message: to get message sent by other users
server.on_message = function(author_id, msg)
{

}

// on_close: to know if the connection is lost and try to reconnect.
server.on_close = function(){

}


// RECEIVE MESSAGES
//my function that must be called when a new message arrives from server
function onMessageReceived( author_id, str_msg )
{
  //do anything with the message
}

//tell the silly client which function to call when a message is received
server.on_message = onMessageReceived; 


/* SEND DATA TO OTHER USERS
To send data to other users first you must be connected to the server, and then you can send it like this:
server.sendMessage( "my_message" );
But remember, it is way better to send objects in string format so you can add fields to every message. Use JSON.stringify to transform objects to string.
Also, you can send private message to one (or several) users if you know its ID:
server.sendMessage( "my_message", [user1_id, user2_id] );
 */
server.sendMessage("my_message");

/* PREV MESSAGES
One important feature is that users can see the previous chat when joining an existing channel. 
The problem is that users only get the messages went they are generated, the best solution is that one users sends 
him the previous messages.
To do so you will have to store all the messages received in some array inside your code and send it to a user when he joins.
 */

/*PROTOCOL PROPOSAL */
//example
var msg = {
	type: "text",
	username: "javi",
	content: "hello!!"
};

//history example
var msg = {
	type: "history",
	content: [
		{
			type: "text",
			username: "foo",
			content: "..."
}
]
};



//Try to reuse functions, so you do not have to code a different function to show a message from the users than to show a message from another user.
//Keep the important data stored in some global vars: data like the users, past messages, etc (!!!!!)
//You can use several JS files if you want, or Classes.
//Do not use the DOM to store your data, use global variables. The DOM is only to show info to the user.


/*var ws = new WebSocket("wss://ecv-etic.upf.edu/node/9000/ws");
ws.name = "CONNECTION1"
ws.onmessage = function(msg){
   console.log(this.name, msg);
}

var ws2 = new WebSocket("wss://ecv-etic.upf.edu/node/9000/ws");
ws2.name = "CONNECTION2"
ws2.onmessage = function(msg){
   console.log(this.name, msg);
}*/

var MYCHAT = {
	//root: null,
	server: null,
	//onNewMessage: null,
	connect: function(url, room_chosen){
	   MYCHAT.server = new SillyClient();
	   MYCHAT.server.connect(url, room_chosen);
	   MYCHAT.server.on_message = function(id, msg){
		  console.log(id, msg);
		  MYCHAT.showMessage(id, msg);
 
		  if(MYCHAT.onNewMessage){
			 MYCHAT.onNewMessage(id,msg);
		  }
	   }
	},
	createHTML: function(container){
 
	},
	showMessage: function(author, msg){
	   var elem = document.createElement("div");
	   elem.innerText = msg;
	   this.root.querySelector(".msgs").appendChild(elem);
	},
	create: function(container){
	   var elem = document.createElement("div");
	   elem.innerHTML = `
	   <div class="msgs"></div>
	   <input>`;
	   container.appendChild(elem);
	   //this.root = elem;
	   var input = elem.querySelector("input");
	   input.addEventListener("keydown", function(e){
		  if(e.code == "enter"){
			 MYCHAT.showMessage("unknown", input.value);
			 MYCHAT.server.sendMessage(input.value);
			 input.value = "";
		  }
	   })
	}
 }
 
 
 MYCHAT.createHTML(document.querySelector(".main-container"));
 MYCHAT.connect("wss://ecv-etic.upf.edu/node/9000/ws");
 MYCHAT.onNewMessage = function(id, msg){
	console.log("PLAY SOUND!");
 }