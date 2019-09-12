var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();


const target =
  'https://my4qgjt3z4.execute-api.ap-southeast-2.amazonaws.com/prod/auth/skygo/token/v1/';
app.use(
  '/api',
  proxy({
    target,
    changeOrigin: true,
  })
);
app.listen(3000);
