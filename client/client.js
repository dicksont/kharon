/*
 * Copyright (c) 2015 Dickson Tam
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 */


(function(window) {

  var XMLHttpRequest = window.XMLHttpRequest;

  function post(str) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/kharon/log', true);
    xhr.setRequestHeader('Content-type', 'text/plain');
    /*xhr.setRequestHeader('Content-length', str.length);
    xhr.setRequestHeader('Connection', 'close');*/

    xhr.onreadystatechange = function() {
      if (xhr.readerState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
      }
    };
    xhr.send(str);
  }

  var Kharon = {
    post: post,
    log: post,
  }

  window.kharon = Kharon;
  Kharon.post("\nBrowser loaded Kharon's client library.");
})(this);
