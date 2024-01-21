
// Hide and show elements by changing its display property:
/*var elem = document.querySelector(".message-sent");
elem.style.display = "none"; //disapear
elem.style.display = ""; //reapear*/

//hide elements from being displayed when the web loads by setting its style in the HTML:
///////<div id="templates" style="display: none;"></div>

//Clone an element by using the function cloneNode:
///var message_sent = document.querySelector(".message-sent")
///var cloned = message_sent.cloneNode( true ); //returns a copy of this element


// SENDING MESSAGES FUNCTIONS

function addMessage(msg){
   var chat = document.querySelector(".scroll");
   var elem = document.createElement("div");
   elem.className = "message-sent";
   elem.innerHTML = msg.content;
   chat.appendChild(elem);
   chat.scrollTop = 10000;

   // store message in database
   msg_history.content.push( msg );

   // Sockets only allow to send strings, so any object must be converted to string before being sent:
   chat_server.sendMessage(JSON.stringify(msg));
   //chat_server.storeData("mykey", "mydata");
}

function onKeyPress(event){
   if(event.code == "Enter" ){ //&& user_screen.scree_two==true
      send();
   }
}

function send(){
   var msg = {
      type: "text",
      content: input.value, //string var
      id: user.id, //user var
      name: user.username
   };
   addMessage(msg);
   input.value = "";
}

/*function send(){
   addMessage(input.value);
   input.value = "";
}*/


// LOG IN WEB

function display_chat(){
   // We hide intro-container and display main-container
   var intro = document.querySelector(".intro-container");
   intro.style.display = "none";
   var main = document.querySelector(".main-container");
   main.style.display = ""; 
}

function accept()
{
   user.username = document.querySelector(".log-in-username").value;
   user.room_name = document.querySelector(".log-in-room").value;
   console.log("username: "+user.username);
   console.log("room_name: "+user.room_name);
   display_chat();

   // Change username of profile-bar
   var username_profile = document.querySelector(".profile-bar p");
   username_profile.innerHTML = user.username;

   // Change user-screen (???)
   //user_screen.screen_one = false;
   //user_screen.scree_two = true;

   ////////////////
   chat_server = new SillyClient();
   // 4. assign url and roomname to the server
   chat_server.connect("wss://ecv-etic.upf.edu/node/9000/ws", user.room_name);

   // 5. assign id to user
   chat_server.on_ready = function(my_id)
   {
      user.id = my_id;
      console.log("You are connected, your id is: " + my_id);
      /*
      priv_msg = {
         type: "private",
         name: user.username
      } 
      chat_server.sendMessage(priv_msg)*/
   }

   // on_message: to get message sent by other users
   chat_server.on_message = function(author_id, msg)
   {
      // When a message is received from the server, it must be transformed back to object:
      var msg_received = JSON.parse( msg );
      if (msg_received.type=="text"){
         load_user_message(msg_received);
         // store data
         msg_history.content.push( msg_received );
      }else if (msg_received.type=="history" && h==false){
         h=true;
         for (var i = 0; i <= msg_received.content.length; i++) {
            load_user_message(msg_received.content[i]);
            // store data
            msg_history.content.push( msg_received.content[i] );
        }
        
      }
      
   }

   // on_user_connected: to know when new users enter the room
   chat_server.on_user_connected = function(user_id)
   {
      // add new chat to the list of users area
      var array_chats = document.querySelector(".users-area");
      var user_chat = document.querySelector(".user-chat")
      var cloned = user_chat.cloneNode( true );
      info_user = cloned.querySelector('p');
      info_user.textContent = "username_"+user_id; //posar username, no id (ns com)
      array_chats.appendChild(cloned);
      array_chats.scrollTop = 10000;

      // create and send history var message
      
      chat_server.sendMessage(JSON.stringify(msg_history), user_id);
   }

}

function load_user_message(message){
   console.log(message);
   if (message.type=="text"){
      var elem1 = document.createElement('div');
      elem1.className = 'message-received';
      var elem2 = document.createElement('p');
      elem2.className = 'name';
      elem2.textContent = '~ '+message.name;
      var elem3 = document.createElement('p');
      elem3.textContent = message.content;
      elem1.appendChild(elem2);
      elem1.appendChild(elem3);
      var scroll_div = document.querySelector('.scroll');
      scroll_div.appendChild(elem1);
      scroll_div.scrollTop = 10000;
   }
   
}
// SERVER CALLBACKS
/*

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
*/

/////// MAIN

/*var user_screen = {
   screen_one: true,
   scree_two: false
};*/


// 1. create user and empty dabatase
var user = {
   username: null,
   room_name: null,
   id: null
};

var h = false;

var msg_history = {
   type: "history",
   content: []
};

// 2. create server
//chat_server = new SillyClient();

// 3. User types username and room_name in log in. Then press "Go" button
var send_button = document.querySelector(".button-go");
send_button.addEventListener("click", accept);

/*// 4. assign url and roomname to the server
chat_server.connect("wss://ecv-etic.upf.edu/node/9000/ws", user.room_name);

// 5. assign id to user
chat_server.on_ready = function(my_id)
{
	user.id = my_id;
   console.log("You are connected, your id is: " + user_id); 
}*/

// 6. user sends a message
var msg = {
	type: "text",
	content: null, //string var
	id: null, //user var
   name: null
};



var input = document.querySelector(".typing-area input");
input.focus();
var send_msg = document.querySelector(".send-message");
send_msg.addEventListener("click", send);
input.addEventListener("keydown", onKeyPress);
