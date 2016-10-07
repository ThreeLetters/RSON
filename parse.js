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
module.exports = function(text) {
  return parse(text)
function split(text) { // Splits the text at "|" marks. Ignores "|" inside of {}. INEFFICIENT!! (because it is recursive, look at bottom)
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
        else if (b=="\\" && j) { // if the char is the escape char, ignore the next one
        h = !h;
        a += b
        continue;
        } else if (b == "\"" && h && g && j) { // if it has ", then ignore any { or } as functions might contain strings with only one { or } (non matching)
          
        l = !l
       } else if (b == "'" && h && l && j) { // same with ', but also ignore it if it is inside ".
          g = !g
          } else if (b == "{" && l && h) { // check if it is { and add to t
            t++;
        } else if (b == "}" && l && h) { // check if it is } and subtract to t
            t--;
            if (t == 0 && j) j = false; 
        }
        else if (b == "|" && t == 0) {  // if the char is |, split the text, but if t is not 0, then dont.
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
function getBPos(text) { // get the indexes of "{" and "}"
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
            return rlist[text.substring(1)] // circular structures list
            
        }
        if (text.charAt(0) == "!") { // function
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
        
      if (text.indexOf("|") == -1) return text // just text/numerical
        if (!level) level = 1
            var final = [];
            if (!rlist) rlist = [];
        var save = false;
        if (text.charAt(0) == "[") save = true // save this object as it will be called later
        var a = getBPos(text) // remove the surrounding brackets
        text = text.substring(a.start + 1,a.end)
        var g = [];
       var d = split(text) // split the text by "|"
        
        if (d.length & 1) { // array
            if (save) rlist.push(final)
            for (var i = 0; i < d.length; i ++) {
                if (!d[i]) continue;
                final[i] = parse(d[i],level + 1,rlist)
            }
           
            return final;
        } else // object
        if (d[1] !== undefined) {
            final = {};
            if (save) rlist.push(final)
            var a = d.length/2
            for (var i = 0; i < a; i ++) {
                if (!d[i]) continue;
                final[d[i + a]] = parse(d[i],level + 1,rlist)
            }
        } else { // text/number
            return d[0]
        }
        return final;
    }
}
/*
The reason why the split function is inefficient is not because of the function itself, it is mostly because of the way it is used

It is so that

"item1|item2|item3|{item1|item2}|item4" is not interpreted as Array["item1","item2","item3","{item1","item2}","item4"]

but instead is Array["item1","item2","item3","{item1|item2}","item4"]

then, it would take "{item1|item2}" and do it all over again. Which is a waste, since the split functions effeciency is O(n) where n is the amount of chars
*/
