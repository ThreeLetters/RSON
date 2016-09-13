# RSON
Recursive Simplified Object Notation


### Why RSON?
Rson is much compacter than JSON. It was designed to have a minimum number of charactors. It also supports recursion and functions. Unlike JSON without using much space. RSON is made for pipelines and sockets such as the one you use for child processes where it only supports text. That way, you can send data fast and without lacking detail.

### Usage
> npm install rson


code


```
var RSON = require('rson');

...

RSON.stringify(objects); // use to stringify

...

RSON.parse(rsontext); // use to parse
```

### For browsers

for minified `https://raw.githubusercontent.com/AJS-development/RSON/master/browsers/rson-minified.js`


non-minified `https://raw.githubusercontent.com/AJS-development/RSON/master/browsers/rson.js`

##### Usage

```
<script type="text/javascript" src="https://raw.githubusercontent.com/AJS-development/RSON/master/browsers/rson-minified.js"></script>
```


