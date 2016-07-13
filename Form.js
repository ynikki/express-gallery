var fs = require('fs');
var path = require('path');
var JSON_DATA_PATH = path.resolve('data', 'form.json');
var server = require('./server');
var util = require('util');

module.exports = {
  create: newForms
}

function newForms (data, callback) {
  fs.readFile(JSON_DATA_PATH, 'utf8', function (err, json){
    if (err) {
      throw err;
    }
    var forms = JSON.parse(json);
    forms.push(data);
    fs.writeFile(JSON_DATA_PATH, JSON.stringify(forms), callback);
    fs.end(util.inspect({
      fields: JSON_DATA_PATH
    }));
  });
}