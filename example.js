var RSON = require("rson")
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
console.log("RSON can parse it back... " + RSON.parse(a))
