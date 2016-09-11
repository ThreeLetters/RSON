module.exports = function(object) {
  function getBPos(text) {
    var a = 0;
    var start = "n";
    var end = false;
    var index = 0;
    var t = 0;
    for (var i = 0;i<text.length;i++) {
      a = text.indexOf("{",index)
      
      if (a == -1) break;
        if (start == "n") start = a;
    index = a + 1;
          t ++;
      
    }
index = 0;
    for (var i = 0; i < t; i++) {
        a = text.indexOf("}",index)
        
        if (a == -1) break;
        index = a + 1;
    }
    
    return {start: start,end: index - 1}
    
}
 function stringify(object) {
  if (typeof object == "array") {
    
  } else if (typeof object == "object") {
    
  } else {
    return object;
  }
 }
}
