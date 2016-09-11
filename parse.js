module.exports = function(text) {
    parse(text)

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
    var c = text.split("|");
    var f = 0;
    var indf
    for (var i = 0; i < c.length; i++) {
        f ++
        if (!c[i]) continue;
        
        f += c[i].length;
        if (start < f && ind === false) {
            ind = f - c[i].length - 2;
         indf = i   
        }
        if (index < f) {
            
            break;
        }
    }
   
    return {start: start,end: index - 1,sindex: ind,eindex: f - 1,index: indf}
    
}
    function parse(text,level,rlist) {
        if (text.charAt(0) == "]") {
            return rlist[text.substring(1)]
            
        }
        
      if (text.indexOf("|") == -1) return text
        if (!level) level = 1
            var final = [];
            if (!rlist) rlist = [];
        var save = false;
        if (text.charAt(0) == "[") save = true
        var a = getBPos(text)
        text = text.substring(a.start + 1,a.end)
        
       var texts = text;
        var g = [];
        for (var i = 0; i < texts.length; i++) {
            var a = getBPos(texts)
            if (a.start == -1) break;
            
            g[a.index] = texts.substring(a.sindex + 1,a.eindex)
            
            texts = texts.substring(0,a.start) + texts.substring(a.end + 1)
            
        }
        
        var d = texts.split("|");
        g.forEach((h,j)=>{
            d[j] = h;
        })
        
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
        
    }
}
