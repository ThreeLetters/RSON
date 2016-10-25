module.exports = {
  stringify: require('./stringify.js'),
  parse: require('./parse.js'),
  efficient: require('./rson-efficient.js'),
  version: function() {
    return JSON.parse(require('fs').readFileSync('./package.json',"utf8")).version
  }
}
