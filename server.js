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

var PORT = process.env.PORT || 1337;
var rfline = require('rfline');
var path = require('path');

function kharonServer(port, opts) {
  opts = opts || {};

  var express = require('express');
  var app = express();

  var bodyParser = require('body-parser');
  var proxy = require('express-http-proxy');

  app.get('/', function(req, res){
    var html = path.resolve(__dirname, '../test/test_script.html');
    res.send(rfline.slurp(html));
  });



  app.get('/kharon/log', function(req, res) {
    var html = path.resolve(__dirname, 'client/kharon.html');
    res.send(rfline.slurp(html));
  });

  app.post('/kharon/log', bodyParser.text(), function(req, res) {
    console.log(req.body);
    res.send('OK');
  });


  app.get('/kharon/client.js', function(req, res) {
    var js = path.resolve(__dirname, 'client/client.js');
    res.send(rfline.slurp(js));
  });

  app.get('/kharon/qunit.js', function(req, res) {
    var js = path.resolve(__dirname, 'client/qunit.js');
    res.send(rfline.slurp(js));
  });



  if (opts.proxy) {
    app.use(proxy(opts.proxy));
    console.log('Proxying requests to ' + opts.proxy);
  } else if (opts.httpRoot) {
    opts.httpRoot = path.resolve(__dirname, opts.httpRoot);

    var mwIndex = require('serve-index')(opts.httpRoot, { 'icons' : true});
    var mwServe = require('serve-static')(opts.httpRoot);

    var mwCombo = function(req, res) {
      var done =  require('finalhandler')(req, res);
      mwServe(req, res, function(err) {
        if (err) return done(err);
        mwIndex(req, res, done);
      });
    }


    app.use(mwCombo);
    console.log('Serving request from directory: ' + opts.httpRoot);
  }

  app.listen(port);
  console.log('Kharon started listening on port ' + PORT);
}

kharonServer(PORT, {
  httpRoot: '.'
});
