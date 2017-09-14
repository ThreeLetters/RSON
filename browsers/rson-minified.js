"use strict";
/*
MIT License

Copyright (c) 2017 Andrew S (Andrews54757_at_gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var RSON={stringify:function(f){function k(c){if(null===c)return"l";if("object"===typeof c){var b=[];if(c.constructor===Array){var a=l.indexOf(c);if(-1!=a)return"a"+a;l.push(c);for(var d=0;d<c.length;++d)b.push(k(c[d]));return"{"+b.join("|")+(c.length-1&1?"|":"")+"}"}a=g.indexOf(c);if(-1!=a)return"o"+a;g.push(c);a=[];for(d in c)b.push(k(c[d])),a.push(d);return"{"+b.join("|")+"|"+a.join("|")+"}"}if("string"===typeof c)return"s"+c.replace(/[{}|\\]/g,"$&");if("number"===typeof c)return"n"+c;if("undefined"===
typeof c)return"u"}var g=[],l=[];return k(f)},parse:function(f){function k(b){switch(b[0]){case "s":return b.slice(1).join("");case "n":return parseFloat(b.slice(1).join(""));case "l":return null;case "o":return l[parseInt(b.slice(1).join(""))];case "a":return c[parseInt(b.slice(1).join(""))]}}function g(b){if("{"!==b[0])return k(b);b=b.slice(1,b.length-1);for(var a=0,d=b.length,h=[],e=[];a<d;++a)switch(b[a]){case "\\":++a;break;case "{":h.push("{");var f=1;for(++a;a<d;a++)if(h.push(b[a]),"\\"===
b[a])a++;else if("{"===b[a])f++;else if("}"===b[a]&&(f--,0===f))break;break;case "|":e.push(h);h=[];break;default:h.push(b[a])}e.push(h);if(e.length&1){b=[];c.push(b);for(a=0;a<e.length;a++)void 0!==e[a][0]&&b.push(g(e[a]));return b}b={};l.push(b);d=e.length/2;for(a=0;a<d;++a)b[e[a+d].join("")]=g(e[a]);return b}var l=[],c=[];return g(f.split(""))}};
"undefined"!==typeof module&&"undefined"!==typeof module.exports?module.exports=RSON:"function"===typeof define&&define.amd?define([],function(){return RSON}):window.RSON=RSON;