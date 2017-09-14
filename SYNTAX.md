# Note
In order to keep RSON as compact as possible, the syntax is mostly machine readable. 

## Syntax
Any non raw data (such as objects) are wrapped in brackets. Instead of a comma RSON uses the | key for dividers.

#### Types
Data types are determined by reading the first charactor in a value.

```
RSON.stringify([
    'hello',
    52,
    undefined
]);

/* Returns

{shello|n52|u}

Data types:

s -> String
n -> Number
u -> Undefined
l -> Null
a -> Array Pointer  -|- Used for recursive circular data structures
o -> Object Pointer -|
*/
```

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

#### Recursion
RSON automatically detects recursive (circular) data structures.


```
var a = [
"item1",
"item2",
]
a.push(a);
```


Is circular so in RSON it is converted to 


```
{item1|item2|a0}
```

