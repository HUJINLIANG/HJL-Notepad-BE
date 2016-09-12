process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var express = require('express');
var mongoose  = require('mongoose');
var path = require('path');
var fs = require('fs');
var errorHandler = require('errorHandler');

var config = require('./config/env')

mongoose.connect(config.mongo.uri,config.mongo.options);
// var modelsPath = path.join(_dirname,'model');
// fs.readdirSync(modelsPath).forEach(function(file){
//     if(/(.*)\.js$/.test(file)){
//         require(modelsPath+'/'+file);
//     }
// })

// if(config.seedDB){
//     require('./config/seed');
// }

var app = express();
require('./config/express')(app);

// require('./routes')(app);

app.get('*',function(req,res){
    res.send('hello world')
})

app.use(function(err,req,res,next){
    return res.status(500).send('error')
})

app.listen(config.port,function(){
    console.log('Listening on %d,in %s mode',config.port,app.get('env'))
})