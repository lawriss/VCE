
var server = new SillyClient();

//connect to the SillyServer course server installed at the UPF
server.connect( "wss://ecv-etic.upf.edu/node/9000/ws", "CHAT");

server.on_ready = function( my_id )
{
	//you know now which is your id
}

var room_name = "LAURA_APP_" + room;

//Also you can have several sillyclient instances if you want to connect to several channels at the same time.

//SillyClient callbacks. I recommend to have callbacks for:
/*
on_ready: to know which is your user_id
on_user_connected: to know when new users enter the room
on_user_disconnected: to know when users leave the room
on_message: to get message sent by other users
on_close: to know if the connection is lost and try to reconnect.*/


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
