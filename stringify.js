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
module.exports = function(object) {
  return stringify(object)
function stringify(object,level,seen,re) {
     if (!seen) seen = [];
     
     if (!level) level = 1;
     if (!re) {
         function getList(l,g) {
             var final = [];
             if (!g) g = [];
             
             if (typeof l != "object") {
                return final
             }
             g.push(l)
             for (var i in l) {
                 if (g.indexOf(l[i]) != -1) {
                     final.push(l[i])
                     continue;
                 }
                 final = final.concat(getList(l[i],g))
             }
             return final;
         }
        re = getList(object)
     }
     var final = "";
     var f = "";
    
     var k = "";
     for (var i in seen) {
         if (!seen[i]) continue;
         if (seen[i].ob == object) {
             return "]" + seen[i].in
         }
     }
     
    
 if (re.indexOf(object) != -1) {
     k = "["
     seen.push({ob:object,in:seen.length});
    
 } 
     if (object.constructor == Array) {
     seen.push(object)
      for (var i = 0; i < object.length; i++) {
          final += f + stringify(object[i],level + 1,seen,re)
          f = "|"
      }
      if ((object.length - 1) & 1) {
          final += "|"
      }
     
      return k + "{" + final + "}"
  } else if (typeof object == "object") {
      seen.push(object)
      var addon = "";
      for (var i in object) {
          final += f + stringify(object[i],level + 1,seen,re);
          f = "|";
          addon += "|" + i;
      }
      return k + "{" + final + addon + "}"
  } else if (typeof object == "function") {
     var t = object.toString();
     if (t) {
        var a = t.indexOf("(");
        t = t.substring(a + 1)
     }
     return "!" + t + ""
     } else {
      return object
  }
 }
}
