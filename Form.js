var fs = require('fs');
var path = require('path');
var JSON_DATA_PATH = path.resolve('data', 'form.json');

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
  });
}

// function add(){
//   var num = document.getElementById("submit").value;
//   if(num === '')num=0;
//   document.getElementById("submit").value = parseInt(num, 10)+1;
// }