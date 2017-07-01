[![NPM](https://img.shields.io/badge/Module-Npm-blue.svg)](https://www.npmjs.com/package/rson)
[![Donate](https://img.shields.io/badge/Donate-Paypal-brightgreen.svg)](https://paypal.me/andrews54757)
# RSON
Recursive Simplified Object Notation

### Why RSON?
Rson is much compacter than JSON. It was designed to have a minimum number of charactors. It also supports recursion and functions. RSON is made for preserving complex object structures as a string.

### Usage
> npm install rson


code


```js
var RSON = require('rson');
...

RSON.stringify(objects); // use to stringify

...

RSON.parse(rsontext,unsafe?); // use to parse (set unsafe to true to parse functions)
```

### For browsers

for minified `https://cdn.rawgit.com/AJS-development/RSON/master/browsers/rson-minified.js`


non-minified `https://cdn.rawgit.com/AJS-development/RSON/master/browsers/rson.js`

##### Usage

```html
<script type="text/javascript" src="https://cdn.rawgit.com/AJS-development/RSON/master/browsers/rson-minified.js"></script>
```
