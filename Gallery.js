var fs = require('fs');
var path = require('path');
var JSON_DATA_PATH = path.resolve('data', 'gallery.json');
var galleries = require('./data/gallery');
var id = galleries.length;

function find(id, callback) {
  // var data = require('./data/gallery');
  fs.readFile(JSON_DATA_PATH, 'utf8', function (err, json) {
    if (err) {
      throw err;
    }

    var gallerycontents = JSON.parse(json);
    var match = null;
    id = parseInt(id);
    for(var i=0; i<gallerycontents.length; i++){
      if(id === gallerycontents[i].id){
        match = gallerycontents[i];
        break;
        // adding a break will not execute the whole function.
      }
    }
      callback(null, match);
  });
}

module.exports = {
  create: addGallery,
  find // use instead of find:find
};

function addGallery(formData, callback) {
  fs.readFile(JSON_DATA_PATH, 'utf8', function (err, json) {
    if (err) {
      throw err;
    }

    id++;

    var gallerycontents = JSON.parse(json);
    formData['id'] = id;
    gallerycontents.push(formData);

    fs.writeFile(JSON_DATA_PATH, JSON.stringify(gallerycontents), callback.bind(this, null, formData));
    // bind returns a function, as oppose to calling a function.
    // pass functions around & give it arguements.
    // pass ID to result.
  });
}