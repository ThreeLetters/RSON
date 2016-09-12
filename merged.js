module.exports = {
stringify: function(object) {
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
     if (t) t = t.replace("function(","")
     return "!{" + t + "}"
     } else {
      return object
  }
 }
}
parse:
}
