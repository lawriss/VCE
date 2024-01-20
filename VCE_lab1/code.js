
// Hide and show elements by changing its display property:
/*var elem = document.querySelector(".message-sent");
elem.style.display = "none"; //disapear
elem.style.display = ""; //reapear*/

//hide elements from being displayed when the web loads by setting its style in the HTML:
///////<div id="templates" style="display: none;"></div>

//Clone an element by using the function cloneNode:
///var message_sent = document.querySelector(".message-sent")
///var cloned = message_sent.cloneNode( true ); //returns a copy of this element

//capture user actions
var chat = document.querySelector(".scroll");
var input = document.querySelector(".typing-area input");
input.focus();

function addMessage(str){
   //create element for the DOM
   var elem = document.createElement("div");
   elem.className = "message-sent";
   elem.innerHTML = str;
   chat.appendChild(elem);
   chat.scrollTop = 10000;
}

function onKeyPress(event){
   if(event.code == "Enter" && user_screen.scree_two==true){
      addMessage(input.value);
      input.value = "";
   }
}

function send(){
   addMessage(input.value);
   input.value = "";
}

input.addEventListener("keydown", onKeyPress);

var send_button = document.querySelector(".send-message");
send_button.addEventListener("click", send);


var user = {
   username: null,
   room_name: null
};

var user_screen = {
   screen_one: true,
   scree_two: false
};

function accept(){
   user.username = document.querySelector(".log-in-username").value;
   user.room_name = document.querySelector(".log-in-room").value;
   console.log(user.username);
   console.log(user.room_name);
   //////
   var intro = document.querySelector(".intro-container");
   intro.style.display = "none";
   var main = document.querySelector(".main-container");
   main.style.display = ""; //reapear
   /////
   var aaa = document.querySelector(".profile-bar p");
   aaa.innerHTML = user.username;
   ////
   user_screen.screen_one = false;
   user_screen.scree_two = true;
}

var send_button = document.querySelector(".button-go");
send_button.addEventListener("click", accept);


// We define a protocol
var msg = {
	type: "text",
	content: "hello",
	username: "Javi"
};





// Sockets only allow to send strings, 
// so any object must be converted to string before being sent:
//var msg_str = JSON.stringify( msg );

// And when a message is received from the server, it must be transformed back to object:
//var msg = JSON.parse( msg_str );

//Try to reuse functions, so you do not have to code a different function to show a message from the users than to show a message from another user.
//Keep the important data stored in some global vars: data like the users, past messages, etc (!!!!!)
//You can use several JS files if you want, or Classes.
//Do not use the DOM to store your data, use global variables. The DOM is only to show info to the user.

//global container to store important stuff
var DB = {
	msgs: []
};

function onMessage(id,msg){
	//store message
	DB.msgs.push( msg );
	displayMessage( msg );
}

/////////
/*
var server = new SillyClient();
server.connect( "protocol://host_address:port", "room_name");
server.on_ready = function( my_id )
{
	//you know now which is your id
}
*/

/*var room_name = "MYSUPERAPP_" + room;*/
