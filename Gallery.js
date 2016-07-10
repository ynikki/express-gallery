var fs = require('fs');
var path = require('path');
var JSON_DATA_PATH = path.resolve('data', 'gallery.json');

module.exports = {
  create: addGallery
};

function addGallery(data, callback) {
  fs.readFile(JSON_DATA_PATH, 'utf8', function (err, json) {
    if (err) {
      throw err;
    }
    var galleries = JSON.parse(json);
    galleries.push(data);
    fs.writeFile(JSON_DATA_PATH, JSON.stringify(galleries), callback);
  });
}