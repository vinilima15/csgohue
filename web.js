var express = require('express');
var appWeb = express();

appWeb.use(express.static('web'));

appWeb.listen(9002, function() {
   console.log('csgo-hue Web listening on port 9001');
});