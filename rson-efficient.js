
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
module.exports = function(text,unsafe) {
    
        var stack = [];
        var root = false;
  var current = [];
        var skip = false;
        var tex = "";
    var q = false;
    var w = false;
    var se = false;
    var seen = [];
    var donot = false;
   function peek() {
        return stack[stack.length - 1]
    }
    
        for (var i = 0; i < text.length; i ++) {
           
            var char = text.charAt(i)
            if (skip) {
                tex += char
                skip = false;
                continue;
            }
             
            if (char == "{" && !w && !q) {
               
                var a = {
                    data: [],
                    seen: false,
                    build: function() {
                var isEven = this.data.length % 2 == 0
                        var len = (!isEven) ? this.data.length : this.data.length /2
                        var final = (!isEven) ? [] : {};
                        if (this.seen) seen.push(final)
                        var buf = this.data.length /2
                        
                       
                        for (var l = 0; l < len; l ++) {
                         var d = this.data[l]
                        var iq = (!isEven) ? l : this.data[l+buf]
        
                         if (typeof d == "string") {
                             
                             var pre = d.charAt(0)
                             if (pre == "]") {
                                 var num = parseInt(d.substr(1))
                                 final[iq] = seen[num]
                                 continue;
                             }
                             final[iq] = d;
                             
                             
                         } else if (typeof d == "object") {
                             
                             final[iq] = d.build()
                         }
                        }
                        return final;
                    }
                }
         
                var v = peek()
              
               if (v) v.data.push(a)
               
               if (!root) root = a
       
                stack.push(a)
                current = a
                if (se) a.seen = true;
                se = false;
                continue;
            } 
            if (char == "}" && !w && !q) {
                current.data.push(tex)
          donot = true;
                tex = "";
               stack.pop() 
       current = peek()

                continue;
            }
            if (char == "]" && text.charAt(i + 1) == "{") {
                
              var se = true;
                continue;
            }
            if (char == "\"" && !w) {
                q = !q
            }
            if (char == "'" && !q) {
                w = !w
            }
            if (char == "\\") {
                skip = true;
            }
            if (char == "|") {
                
                if (!donot) current.data.push(tex)
                donot = false;
                tex = "";
                continue;
            }

            tex += char
        }
        
   
    return root.build()
    
    
    
    
}
