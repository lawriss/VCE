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
var myFullArray = ["stuff", "in", "array", 473, false, 2385.334];

myFullArray[0] = "pepe"; //setting a value
var atIndexOne = myFullArray[1]; //getting a value
var theLength = myFullArray.length; //getting the length

for (var i in myFullArray) { // iteration with for… in
   console.log(myFullArray[i]);
   console.log(i);
}