"use strict";
 /*
  Copyright 2016 Andrew S
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   */
var RSON={stringify:function(t){function e(t,r,n,i){function a(t,e){var r=[];if(e||(e=[]),"object"!=typeof t)return r;e.push(t);for(var n in t)-1==e.indexOf(t[n])?r=r.concat(a(t[n],e)):r.push(t[n]);return r}n||(n=[]),r||(r=1),i||(i=a(t));var f="",u="",o="";for(var s in n)if(n[s]&&n[s].ob==t)return"]"+n[s]["in"];if(-1!=i.indexOf(t)&&(o="[",n.push({ob:t,"in":n.length})),t.constructor==Array){n.push(t);for(var s=0;s<t.length;s++)f+=u+e(t[s],r+1,n,i),u="|";return t.length-1&1&&(f+="|"),o+"{"+f+"}"}if("object"==typeof t){n.push(t);var l="";for(var s in t)f+=u+e(t[s],r+1,n,i),u="|",l+="|"+s;return o+"{"+f+l+"}"}if("function"==typeof t){var d=t.toString();if(d){var v=d.indexOf("(");d=d.substring(v+1)}return"!"+d}return t}return e(t)},parse:function(text){function split(t){for(var e="",r=[],n=0,i=0;i<t.length;i++){var a=t.charAt(i);if("{"==a)n++;else if("}"==a)n--;else if("|"==a&&0==n){r.push(e),e="";continue}e+=a}return r.push(e),r}function getBPos(t){var e=!1,r=!1,n=0,i=0;e=t.indexOf("{");for(var a=0;a<t.length;a++){var f=t.indexOf("{",n),u=t.indexOf("}",n);if(u>f&&-1!=f?(i++,n=f+1):(i--,n=u+1),0==i)break}return r=n,{start:e,end:n-1}}function parse(text,level,rlist){if("]"==text.charAt(0))return rlist[text.substring(1)];if("!"==text.charAt(0)){var a=getBPos(text);text=text.substring(a.start+1,a.end);try{var poiu="[Unevalutated Function]";return eval("poiu = function("+text),poiu}catch(e){return console.log("Couldnt evalute function function("+text+" Error: "+e),"[Unevalutated Function]"}}if(-1==text.indexOf("|"))return text;level||(level=1);var final=[];rlist||(rlist=[]);var save=!1;"["==text.charAt(0)&&(save=!0);var a=getBPos(text);text=text.substring(a.start+1,a.end);var g=[],d=split(text);if(1&d.length){save&&rlist.push(final);for(var i=0;i<d.length;i++)d[i]&&(final[i]=parse(d[i],level+1,rlist));return final}if(!d[1])return d[0];final={},save&&rlist.push(final);for(var a=d.length/2,i=0;a>i;i++)d[i]&&(final[d[i+a]]=parse(d[i],level+1,rlist));return final}return parse(text)}};"undefined"!=typeof module&&"undefined"!=typeof module.exports?module.exports=RSON:"function"==typeof define&&define.amd?define([],function(){return RSON}):window.RSON=RSON;
