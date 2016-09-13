# Note
In order to keep RSON as compact as possible, the syntax is mostly machine readable. 

## Syntax
Any non raw data (such as objects) are wrapped in brackets. Instead of a comma RSON uses the | key for dividers.

#### For arrays
Arrays ALLWAYS have an odd number of "|". That is how it knows it is an array. The data is stored in an index fashion like this:


```
{item1|item2|item3|item4}
```


When there is an odd number of items, an extra "|" is added to the end in order to keep the even-odd balance


```
{item1|item2|item3|} // extra | added at end.
```
#### Non-Array Objects
These objects in RSON always have an odd number of "|". They are twice the length of arrays though. This is so the index could also be stored.


```
{item1|item2|item3|item4|I1name|I2name|I3name|I4name}
```

#### Functions
RSON also stores functions unlike JSON, it is stored in this manner
```
var object = [
    "hello",
    function() {return "test"}
]
console.log(RSON.stringify(objects))
/*
{hello|!) {return "test"}}
*/
```


#### Recursion
RSON automatically detects recursive (circular) data structures. It marks the first appearance of that item by putting a "[" before the brackets. For example 


```
var a = [
"item1",
"item2",
]
a.push(a);
```


Is circular so in RSON it is converted to 


```
[{item1|item2|]0}
```


To any duplicates of it, it marks it as a "]" with a numerical index right by it. The index is the index of the recursive item from left to right. Whenever the compiler reads a "[" it pushes it to an array and whenever a "]" is followed, it gets the value stored in the array.


