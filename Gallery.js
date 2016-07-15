var fs = require('fs');
var path = require('path');
var JSON_DATA_PATH = path.resolve('data', 'gallery.json');

function find(id, callback) {
  callback(null, {
    author: 'poop',
    url: 'http://lorempixel.com/400/200/',
    description: 'ideekay'
  });
}

module.exports = {
  create: addGallery,
  find // use instead of find:find
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