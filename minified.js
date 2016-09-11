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
module.exports = {stringify:function(r){function n(r,t,e,i){function f(r,n){var t=[];if(n||(n=[]),"object"!=typeof r)return t;n.push(r);for(var e in r)-1==n.indexOf(r[e])?t=t.concat(f(r[e],n)):t.push(r[e]);return t}e||(e=[]),t||(t=1),i||(i=f(r));var u="",a="",s="";for(var o in e)if(e[o]&&e[o].ob==r)return"]"+e[o]["in"];if(-1!=i.indexOf(r)&&(s="[",e.push({ob:r,"in":e.length})),r.constructor==Array){e.push(r);for(var o=0;o<r.length;o++)u+=a+n(r[o],t+1,e,i),a="|";return r.length-1&1&&(u+="|"),s+"{"+u+"}"}if("object"==typeof r){e.push(r);var h="";for(var o in r)u+=a+n(r[o],t+1,e,i),a="|",h+="|"+o;return s+"{"+u+h+"}"}return r}return n(r)},parse:function(r){function n(r){var n=!1,t=!1,e=0,i=0,f=!1;n=r.indexOf("{");for(var u=0;u<r.length;u++){var a=r.indexOf("{",e),s=r.indexOf("}",e);if(s>a&&-1!=a?(i++,e=a+1):(i--,e=s+1),0==i)break}t=e;for(var o,h=r.split("|"),v=0,u=0;u<h.length&&(v++,!(h[u]&&(v+=h[u].length,v>n&&f===!1&&(f=v-h[u].length-2,o=u),v>e)));u++);return{start:n,end:e-1,sindex:f,eindex:v-1,index:o}}function t(r,e,i){if("]"==r.charAt(0))return i[r.substring(1)];if(-1==r.indexOf("|"))return r;e||(e=1);var f=[];i||(i=[]);var u=!1;"["==r.charAt(0)&&(u=!0);var a=n(r);r=r.substring(a.start+1,a.end);for(var s=r,o=[],h=0;h<s.length;h++){var a=n(s);if(-1==a.start)break;o[a.index]=s.substring(a.sindex+1,a.eindex),s=s.substring(0,a.start)+s.substring(a.end+1)}var v=s.split("|");if(o.forEach(function(r,n){v[n]=r}),1&v.length){u&&i.push(f);for(var h=0;h<v.length;h++)v[h]&&(f[h]=t(v[h],e+1,i));return f}if(!v[1])return v[0];f={},u&&i.push(f);for(var a=v.length/2,h=0;a>h;h++)v[h]&&(f[v[h+a]]=t(v[h],e+1,i));return f}return t(r)}};
