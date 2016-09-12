var RSON = require("rson")
console.log(RSON.version())
var objects = {
   name: "RSON",
   awesomeness: "to the roof",
   creator: "andrews54757",
   mainfeature: ["recursion(circular)"]
}
objects.mainfeature.push(objects) // make it loop back on it self to have a recursive/circular structure.

// JSON?

try {
   JSON.stringify(objects) 
} catch (e) {
    console.log("JSON wasnt smart enough and couldnt manage circular data structures")
}

var a = RSON.stringify(objects) // RSON can!
console.log("this is the output for RSON! " + a)
console.log("RSON can parse it back... ")
console.log(RSON.parse(a))
objects = {
   name: "RSON",
   awesomeness: "to the sky",
   creator: "AJS Development",
   anotherfeature: "Compactness!"
}
var a = RSON.stringify(objects)
var b = JSON.stringify(objects)
console.log("Another great feature is its compactness. Look at this sample object")
console.log(objects)
console.log("JSON's outputs length is " + b.length + " but RSON's is " + a.length);
console.log("RSON can also stringify functions!");
objects = {
   name: "RSON",
   awesomeness: "Better than JSON",
   anotherfeature: function() {return "Functions!"}
}
console.log("RSON can also store functions. Example")
console.log(objects);
var a = RSON.stringify(objects);
console.log("RSON results: " + a);
console.log("Parsing back:")
var b = RSON.parse(a);
console.log(b);
console.log("Calling the function..");
console.log(b.anotherfeature())

