function send(){
   var msg = {
      type: "text",
      content: input.value, //string var
      id: user.id, //user var
      name: user.username
   };
   //addMessage(msg);
   display_my_msg(msg.content);
   msg_history.content.push( msg );
   chat_server.sendMessage(JSON.stringify(msg)); // we convert object to string to send the msg
   input.value = "";
}

function welcomed(m){
   chat_server.sendMessage(JSON.stringify(m));
}



// display my message
function display_my_msg(str){
   var chat = document.querySelector(".scroll");
   var elem = document.createElement("div");
   elem.className = "message-sent";
   elem.innerHTML = str;
   chat.appendChild(elem);
   chat.scrollTop = 10000;
}

// display sent message, add it to the database and send it to all users
//function addMessage(msg){
   //display_my_msg(msg.content);
   //msg_history.content.push( msg );
   //chat_server.sendMessage(JSON.stringify(msg));
//}

function onKeyPress(event){
   if(event.code == "Enter" ){ //&& user_screen.scree_two==true
      send();
   }
}



// We hide intro-container and display main-container
function display_chat(){
   var intro = document.querySelector(".intro-container");
   intro.style.display = "none";
   var main = document.querySelector(".main-container");
   main.style.display = ""; 
}

// add new chat to the list of users area
function add_new_chat(str){
   var array_chats = document.querySelector(".users-area");
   var user_chat = document.querySelector(".user-chat")
   var cloned = user_chat.cloneNode( true );
   info_user = cloned.querySelector('p');
   info_user.textContent = str; //posar username, no id (ns com)
   array_chats.appendChild(cloned);
   array_chats.scrollTop = 10000;
}

function accept()
{
   user.username = document.querySelector(".log-in-username").value;
   user.room_name = document.querySelector(".log-in-room").value;
   //console.log("username: "+user.username);
   //console.log("room_name: "+user.room_name);
   display_chat();

   // Change username of profile-bar
   var username_profile = document.querySelector(".profile-bar p");
   username_profile.innerHTML = user.username;

   var msg_welcome = {
      type: "welcome",
      content: user.username
   };
   // create server
   chat_server = new SillyClient();
   // assign url and roomname to the server
   chat_server.connect("wss://ecv-etic.upf.edu/node/9000/ws", user.room_name);
   // assign id to user
   chat_server.on_ready = function(my_id)
   {
      user.id = my_id;
      //console.log("You are connected, your id is: " + my_id);
      chat_server.sendMessage(JSON.stringify(msg_welcome));
   }

   // send a "welcome" message so that all connected users know your username
   

   //welcomed(msg_welcome);
   //chat_server.sendMessage(JSON.stringify(msg_welcome));


   // CALLBACK FUNCTIONS

   // on_message: to get message sent by other users
   chat_server.on_message = function(author_id, msg)
   {
      // When a message is received from the server, it must be transformed back to object:
      var msg_received = JSON.parse( msg );

      if (msg_received.type=="text"){
         load_user_message(msg_received);
         msg_history.content.push( msg_received ); // store data
      }
      else if (msg_received.type=="history" && h==false){
         h=true;
         for (var i = 0; i < msg_received.content.length; i++) {
            load_user_message(msg_received.content[i]);
            msg_history.content.push( msg_received.content[i] ); // store data
        }
      }else if (msg_received.type=="welcome"){
         //add_new_chat(msg_received.name);
         //console.log('nnnnnnnnn');
         //console.log(msg_received.content);
         add_new_chat(msg_received.content);
      }
      
   }

   // on_user_connected: to know when new users enter the room
   chat_server.on_user_connected = function(user_id)
   {
      // send history msg to the new user 
      chat_server.sendMessage(JSON.stringify(msg_history), user_id);
      // send my username to the new user
      chat_server.sendMessage(JSON.stringify(msg_welcome), user_id); ///???
   }

}

function load_user_message(message){
   //console.log(message);
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

// on_user_disconnected: to know when users leave the room
server.on_user_disconnected = function(user_id)
{
	// remove user chat to the list of users area
	var user_discon = document.querySelector("#"+user_id);
	user_discon.style.display = "none"; //disapear

	// remove historial ...
}
*/

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

/* AAAAAAAAAAAAAAAAAAA
var msg = {
	type: "text",
	content: null, //string var
	id: null, //user var
   name: null
};*/

/*var msg_welcome = {
   type: "welcome",
   content: null
};*/


var input = document.querySelector(".typing-area input");
input.focus();
var send_msg = document.querySelector(".send-message");
send_msg.addEventListener("click", send);
input.addEventListener("keydown", onKeyPress);
