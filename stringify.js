/*
MIT License

Copyright (c) 2017 Andrew S (Andrews54757_at_gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
module.exports = function (object) {
    var OBJ_SEEN = [],
        ARR_SEEN = [];

    function escape(str) {
        return str.replace(/[{}|\\]/g, '\\$&');
    }

    function recurse(object) {
        if (object === null) {
            return 'l';
        } else if (typeof object === 'object') {
            var out = [];
            if (object.constructor === Array) { // array
                var ind = ARR_SEEN.indexOf(object);
                if (ind != -1) return 'a' + ind;
                ARR_SEEN.push(object);
                for (var i = 0; i < object.length; ++i) {
                    out.push(recurse(object[i]));
                }
                return '{' + out.join('|') + (((object.length - 1) & 1) ? '|' : '') + '}';
            } else { // object
                var ind = OBJ_SEEN.indexOf(object);
                if (ind != -1) return 'o' + ind;
                OBJ_SEEN.push(object);
                var out2 = [];
                for (var i in object) {
                    out.push(recurse(object[i]));
                    out2.push(i);
                }
                return '{' + out.join('|') + '|' + out2.join('|') + '}';
            }

        } else if (typeof object === 'string') {
            return 's' + escape(object);
        } else if (typeof object === 'number') {
            return 'n' + object;
        } else if (typeof object === 'undefined') {
            return 'u';
        }

    }
    return recurse(object)
}
