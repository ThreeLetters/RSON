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
module.exports={stringify:function(t){function r(t,e,n,i){function a(t,r){var e=[];if(r||(r=[]),"object"!=typeof t)return e;r.push(t);for(var n in t)-1==r.indexOf(t[n])?e=e.concat(a(t[n],r)):e.push(t[n]);return e}n||(n=[]),e||(e=1),i||(i=a(t));var u="",f="",s="";for(var l in n)if(n[l]&&n[l].ob==t)return"]"+n[l]["in"];if(-1!=i.indexOf(t)&&(s="[",n.push({ob:t,"in":n.length})),t.constructor==Array){n.push(t);for(var l=0;l<t.length;l++)u+=f+r(t[l],e+1,n,i),f="|";return t.length-1&1&&(u+="|"),s+"{"+u+"}"}if("object"==typeof t){n.push(t);var o="";for(var l in t)u+=f+r(t[l],e+1,n,i),f="|",o+="|"+l;return s+"{"+u+o+"}"}if("function"==typeof t){var v=t.toString();if(v){var c=v.indexOf("(");v=v.substring(c)}return"!{"+v+"}"}return t}return r(t)},parse:function(text){function split(t){for(var r="",e=[],n=0,i=0;i<t.length;i++){var a=t.charAt(i);if("{"==a)n++;else if("}"==a)n--;else if("|"==a&&0==n){e.push(r),r="";continue}r+=a}return e.push(r),e}function getBPos(t){var r=!1,e=!1,n=0,i=0;r=t.indexOf("{");for(var a=0;a<t.length;a++){var u=t.indexOf("{",n),f=t.indexOf("}",n);if(f>u&&-1!=u?(i++,n=u+1):(i--,n=f+1),0==i)break}return e=n,{start:r,end:n-1}}function parse(text,level,rlist){if("]"==text.charAt(0))return rlist[text.substring(1)];if("!"==text.charAt(0)){var a=getBPos(text);text=text.substring(a.start+1,a.end);try{var poiu="[Unevalutated Function]";return eval("poiu = function("+text),poiu}catch(e){return console.log("Couldnt evalute function function("+text+" Error: "+e),"[Unevalutated Function]"}}if(-1==text.indexOf("|"))return text;level||(level=1);var final=[];rlist||(rlist=[]);var save=!1;"["==text.charAt(0)&&(save=!0);var a=getBPos(text);text=text.substring(a.start+1,a.end);var g=[],d=split(text);if(1&d.length){save&&rlist.push(final);for(var i=0;i<d.length;i++)d[i]&&(final[i]=parse(d[i],level+1,rlist));return final}if(!d[1])return d[0];final={},save&&rlist.push(final);for(var a=d.length/2,i=0;a>i;i++)d[i]&&(final[d[i+a]]=parse(d[i],level+1,rlist));return final}return parse(text)}};
