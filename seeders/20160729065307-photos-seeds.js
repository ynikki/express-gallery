'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('photos', [
  {
    "author": "Natto",
    "description": "Yay",
    "id": 1,
    "url": "http://www.textbooktravel.com/wp-content/uploads/2015/01/Web-Flickr-Northern-Lights-in-Iceland.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    "author": "Poppy Seed",
    "description": "Hooray",
    "id": 2,
    "url": "http://www.textbooktravel.com/wp-content/uploads/2015/01/Web-Maldives-At-Night.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    "author": "Wonderwall",
    "description": "Something Something",
    "id": 3,
    "url": "http://www.textbooktravel.com/wp-content/uploads/2015/01/Web-Flickr-Maldives-Beach-Looks-Like-Starry-Night-Sky.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    "author": "M&M",
    "description": "Sunflower Seeds",
    "id": 4,
    "url": "http://www.textbooktravel.com/wp-content/uploads/2015/05/Web-Australis-aurora-and-Milky-way-at-the-Church-of-the-Good-Shepherd-Lake-Tekapo-New-Zealand.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    "author": "Oasis",
    "description": "Dun dun dun Batman",
    "id": 5,
    "url": "http://www.textbooktravel.com/wp-content/uploads/2015/01/Web2-Starry-Sky-Over-Namib-Desert-in-Sossusvlei-Namibia.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    "author": "Green Latern",
    "description": "Swing swing",
    "id": 6,
    "url": "http://www.textbooktravel.com/wp-content/uploads/2015/01/Web2-Abisko-National-Park-NL.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    "author": "Spins",
    "description": "Spin city",
    "id": 7,
    "url": "http://www.textbooktravel.com/wp-content/uploads/2015/01/Web2-Abisko-National-Park-Northern-Lights.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  }],{
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    queryInterface.bulkDelete('photos');
  }
};
