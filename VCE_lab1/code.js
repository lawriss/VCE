/*console.log("helloooo");
var myString = "pepe"; //variable
myString = 'a'
//let myString2 = "pepe2"; //only in this scope
const myString2 = 1; //constant

// this is a comment
for (var i = 0; i < 10; i++) {
   myString += i;
}

console.log(2==='2 ');

for (var i = 0; i < 10; i++) {
    myArray[i] = 0;
 }

 var myString = "pepe";
 for (var i in myString) {
    console.log( myString[i] ); 
 }*/

 //example of creating an array
/*var myFullArray = ["stuff", "in", "array", 473, false, 2385.334];

myFullArray[0] = "pepe"; //setting a value
var atIndexOne = myFullArray[1]; //getting a value
var theLength = myFullArray.length; //getting the length

for (var i in myFullArray) { // iteration with for… in
   console.log(myFullArray[i]);
   console.log(i);
}*/

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
var chat = document.querySelector(".messages-area");
var input = document.querySelector("input");
input.focus();

function addMessage(str){
   //create element for the DOM
   var elem = document.createElement("div");
   elem.className = "message-sent";
   elem.innerHTML = str;
   chat.appendChild(elem);
   chat.scrollTop = 1000;
}

function onKeyPress(event){
   if(event.code == "Enter"){
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
send_button.addEventListener("click", send)

