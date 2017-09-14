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
var RSON={stringify:function(g){function k(c){if(null===c)return"l";if("object"===typeof c){var a=[];if(c.constructor===Array){var b=l.indexOf(c);if(-1!=b)return"a"+b;l.push(c);for(var d=0;d<c.length;++d)a.push(k(c[d]));return"{"+a.join("|")+(c.length-1&1?"|":"")+"}"}b=h.indexOf(c);if(-1!=b)return"o"+b;h.push(c);b=[];for(d in c)a.push(k(c[d])),b.push(d);return"{"+a.join("|")+"|"+b.join("|")+"}"}if("string"===typeof c)return"s"+c.replace(/[{}|\\]/g,"\\$&");if("number"===typeof c)return"n"+c;if("undefined"===
typeof c)return"u"}var h=[],l=[];return k(g)},parse:function(g){function k(a){switch(a[0]){case "s":return a.slice(1).join("").replace(/\\(.)/g,"$1");case "n":return parseFloat(a.slice(1).join(""));case "l":return null;case "o":return l[parseInt(a.slice(1).join(""))];case "a":return c[parseInt(a.slice(1).join(""))]}}function h(a){if("{"!==a[0])return k(a);a=a.slice(1,a.length-1);for(var b=0,d=a.length,f=[],e=[];b<d;++b)switch(a[b]){case "\\":f.push("\\",a[++b]);break;case "{":f.push("{");var g=1;
for(++b;b<d;b++)if(f.push(a[b]),"\\"===a[b])f.push(a[++b]);else if("{"===a[b])g++;else if("}"===a[b]&&(g--,0===g))break;break;case "|":e.push(f);f=[];break;default:f.push(a[b])}e.push(f);if(e.length&1){a=[];c.push(a);for(b=0;b<e.length;b++)void 0!==e[b][0]&&a.push(h(e[b]));return a}a={};l.push(a);d=e.length/2;for(b=0;b<d;++b)a[e[b+d].join("")]=h(e[b]);return a}var l=[],c=[];return h(g.split(""))}};
"undefined"!==typeof module&&"undefined"!==typeof module.exports?module.exports=RSON:"function"===typeof define&&define.amd?define([],function(){return RSON}):window.RSON=RSON;