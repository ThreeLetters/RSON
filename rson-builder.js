"use strict"

module.exports = class RSONBuilder {
  constructor() {
    this.obj = []
  }
  append(a) {
  
    this.obj.push(a) 
  }
  parse() {
   return "{" + this.obj.join("|") + "}"
   
  }
  
}
