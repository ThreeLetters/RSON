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
var RSON = {
stringify: function(object) {
  return stringify(object)
function stringify(object,level,seen,re) {
   if (object === undefined) return object
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
     var ind = seen.indexOf(object) 
     if (ind != -1) {
         return "]" + ind
         
     }
     
    
 if (re.indexOf(object) != -1) {
     k = "["
     
     seen.push(object);
    
 } 
     if (object.constructor == Array) {
    
      for (var i = 0; i < object.length; i++) {
          final += f + stringify(object[i],level + 1,seen,re)
          f = "|"
      }
      if ((object.length - 1) & 1) {
          final += "|"
      }
     
      return k + "{" + final + "}"
  } else if (typeof object == "object") {
      
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
     return "!{" + t + "}"
     } else {
      return object.toString()
  }
 }
},
parse: function(text) {
  return parse(text)
function split(text) {
    var a = "";
    var f = [];
    var t = 0;
    var l = true;
    var h = true;
    var g = true
    var j = false;
    for (var i = 0; i < text.length; i ++) {
        var b = text.charAt(i)
        if (b=="!" && text.charAt(i + 1) == "{") {
           j = true;
        }
        else if (b=="\\" && j) {
        h = !h;
        a += b
        continue;
        } else if (b == "\"" && h && g && j) {
          
        l = !l
       } else if (b == "'" && h && l && j) {
          g = !g
          } else if (b == "{" && l && h) {
            t++;
        } else if (b == "}" && l && h) {
            t--;
            if (t == 0 && j) j = false;
        }
        else if (b == "|" && t == 0) {
            f.push(a);
            a = "";
            continue;
        }
        a += b;
        h = true;
    }
    f.push(a)
    return f
    
}
function getBPos(text) {
    var a = 0;
    var start = false;
    var end = false;
    var index = 0;
    var e = 0;
    var t = 0;
    var lindex = 0;
    var ind = false;

  
    start = text.indexOf("{");
    
    for (var i = 0; i < text.length; i++) {
        var q = text.indexOf("{",index);
        var w = text.indexOf("}",index);
       
        if (q < w && q != -1) {
            t ++;
            index = q + 1;
        } else {
            t--;
            index = w + 1;
        }
        if (t == 0) break
    }
    end = index;
  
  
   
    return {start: start,end: index - 1}
    
}
    function parse(text,level,rlist) {
        if (text.charAt(0) == "]") {
            return rlist[text.substring(1)]
            
        }
        if (text.charAt(0) == "!") {
            var a = getBPos(text)
        text = text.substring(a.start + 1,a.end)
            try {
               var poiu = "[Unevalutated Function]";
            eval("poiu = function(" + text)
            return poiu
            } catch (e) {
               console.log("Couldnt evalute function function(" + text + " Error: " + e);
               return "[Unevalutated Function]"
            }
        }
        
      if (text.indexOf("|") == -1) return text
        if (!level) level = 1
            var final = [];
            if (!rlist) rlist = [];
        var save = false;
        if (text.charAt(0) == "[") save = true
        var a = getBPos(text)
        text = text.substring(a.start + 1,a.end)
        var g = [];
       var d = split(text)
        
        if (d.length & 1) {
            if (save) rlist.push(final)
            for (var i = 0; i < d.length; i ++) {
                if (!d[i]) continue;
                final[i] = parse(d[i],level + 1,rlist)
            }
           
            return final;
        } else 
        if (d[1]) {
            final = {};
            if (save) rlist.push(final)
            var a = d.length/2
            for (var i = 0; i < a; i ++) {
                if (!d[i]) continue;
                final[d[i + a]] = parse(d[i],level + 1,rlist)
            }
        } else {
            return d[0]
        }
        return final;
    }
}
  }
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
     module.exports = RSON;
   }
   else {
     if (typeof define === 'function' && define.amd) {
       define([], function() {
         return RSON;
       });
     }
     else {
       window.RSON = RSON;
     }
    }
