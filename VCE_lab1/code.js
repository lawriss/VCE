// send my message
function send(){
   var msg = {
      type: "text",
      content: input.value, 
      id: user.id, 
      name: user.username
   };
 
   display_my_msg(msg.content);
   msg_history.content.push( msg );
   chat_server.sendMessage(JSON.stringify(msg)); // we convert object to string to send the msg
   input.value = "";
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

// send message with my username
function welcomed(m){
   chat_server.sendMessage(JSON.stringify(m));
}

// sending text message when pressing "Enter"
function onKeyPress(event){
   if(event.code == "Enter" ){ 
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

// when we press "Go" button, we go from log-in to the main chat and connect to the server
function accept()
{
   // assign the previously written username and room name
   user.username = document.querySelector(".log-in-username").value;
   user.room_name = document.querySelector(".log-in-room").value;
   msg_welcome.content = user.username
   display_chat();

   // Change username of profile-bar
   var username_profile = document.querySelector(".profile-bar p");
   username_profile.innerHTML = user.username;

   // create server
   chat_server = new SillyClient();
   // assign url and roomname to the server
   chat_server.connect("wss://ecv-etic.upf.edu/node/9000/ws", user.room_name);

   // assign id to user
   chat_server.on_ready = function(my_id){
      user.id = my_id;
      console.log("You are connected, your id is: " + my_id);
      // send your username to the rest of connected users
      chat_server.sendMessage(JSON.stringify(msg_welcome));
   }

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
         add_new_chat(msg_received.content);
      }
   }

   // on_user_connected: to know when new users enter the room
   chat_server.on_user_connected = function(user_id){
      // send history msg to the new user 
      chat_server.sendMessage(JSON.stringify(msg_history), user_id);
      // send my username to the new user
      chat_server.sendMessage(JSON.stringify(msg_welcome), user_id);
   }

}

function load_user_message(message){
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

// user info
var user = {
   username: null,
   room_name: null,
   id: null
};

// loaded history
var h = false;

// history message
var msg_history = {
   type: "history",
   content: []
};

// welcome message
var msg_welcome = {
   type: "welcome",
   content: null
};


///// MAIN

// when we log-in and press Go, we move to the principal chat
var send_button = document.querySelector(".button-go");
send_button.addEventListener("click", accept);

// send and type messages
var input = document.querySelector(".typing-area input");
input.focus();
var send_msg = document.querySelector(".send-message");
send_msg.addEventListener("click", send);
input.addEventListener("keydown", onKeyPress);
