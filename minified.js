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
module.exports = {stringify:function(r){function n(r,t,e,i){function f(r,n){var t=[];if(n||(n=[]),"object"!=typeof r)return t;n.push(r);for(var e in r)-1==n.indexOf(r[e])?t=t.concat(f(r[e],n)):t.push(r[e]);return t}e||(e=[]),t||(t=1),i||(i=f(r));var u="",a="",s="";for(var o in e)if(e[o]&&e[o].ob==r)return"]"+e[o]["in"];if(-1!=i.indexOf(r)&&(s="[",e.push({ob:r,"in":e.length})),r.constructor==Array){e.push(r);for(var o=0;o<r.length;o++)u+=a+n(r[o],t+1,e,i),a="|";return r.length-1&1&&(u+="|"),s+"{"+u+"}"}if("object"==typeof r){e.push(r);var h="";for(var o in r)u+=a+n(r[o],t+1,e,i),a="|",h+="|"+o;return s+"{"+u+h+"}"}return r}return n(r)},parse:function(r){function n(r){for(var n="",t=[],e=0,f=0;f<r.length;f++){var i=r.charAt(f);if("{"==i)e++;else if("}"==i)e--;else if("|"==i&&0==e){t.push(n),n="";continue}n+=i}return t.push(n),t}function t(r){var n=!1,t=!1,e=0,f=0;n=r.indexOf("{");for(var i=0;i<r.length;i++){var u=r.indexOf("{",e),a=r.indexOf("}",e);if(a>u&&-1!=u?(f++,e=u+1):(f--,e=a+1),0==f)break}return t=e,{start:n,end:e-1}}function e(r,f,i){if("]"==r.charAt(0))return i[r.substring(1)];if(-1==r.indexOf("|"))return r;f||(f=1);var u=[];i||(i=[]);var a=!1;"["==r.charAt(0)&&(a=!0);var h=t(r);r=r.substring(h.start+1,h.end);var s=n(r);if(1&s.length){a&&i.push(u);for(var v=0;v<s.length;v++)s[v]&&(u[v]=e(s[v],f+1,i));return u}if(!s[1])return s[0];u={},a&&i.push(u);for(var h=s.length/2,v=0;h>v;v++)s[v]&&(u[s[v+h]]=e(s[v],f+1,i));return u}return e(r)}};
