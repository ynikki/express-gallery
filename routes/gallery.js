var express = require('express');
var router = express.Router();

module.exports = router;

router
  .get('/', function (req, res) {
    res.send('Id');
  })
  .post('/:id', function (req, res) {
    res.send('Create a Id');
  })
  .put('/', function (req, res) {
    res.send('Update Id');
  })
  .delete('/:id', function (req, res) {
    res.send('Delete Id');
  });