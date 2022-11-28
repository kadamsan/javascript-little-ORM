var _ = require('lodash');

var sampleData = {
	apps: [
    { id: 1, title: 'Lorem', published: true, userId: 123 },
    { id: 2, title: 'Ipsum', published: false, userId: 123 },
    { id: 3, title: 'Dolor', published: true, userId: 456 },
    { id: 4, title: 'Sit', published: true, userId: 789 },
    { id: 5, title: 'Amet', published: false, userId: 123 },
    { id: 6, title: 'Et', published: true, userId: 123 }
  ],
  organizations: [
  	{ id: 1, name: 'Google', suspended: true, userId: 123 },
    { id: 2, name: 'Apple', suspended: false, userId: 456 },
    { id: 3, name: 'Fliplet', suspended: false, userId: 123 }
  ]
}

// @TODO: This is the model/class you should work out
// var User;

// constructor function
function User (user) {
    this.id = user.id;
}

// adding a method to the constructor function
User.prototype.greet = function(name) {
    console.log('hello' + ' ' +  this.id + ' ' + name);
}

User.prototype.select = function(select) {
    //console.log('select' + ' ' +  select);
    this.select = select;
   return this;
}

User.prototype.attributes = function(attributes) {
    //console.log('attributes' + ' ' +  attributes);
    this.attributes = attributes;
    return this;
}

User.prototype.where = function(where) {
    //console.log('where' + ' ' +  where);
    this.where = where;
    return this;
}

User.prototype.order = function(order) {
    //console.log('order' + ' ' +  order);
    this.order = order;
    return this;
}

User.prototype.findAll = function() {
    //console.log('in findAll ');
    //console.log('this.id ', this.id);
    //console.log('this.select ', this.select);
    //console.log('this.attributes ', this.attributes);
    //console.log('this.where ', this.where);
    //console.log('this.order ', this.order);
    let arr = _.result(sampleData, this.select);

    arr = _.filter(arr, {userId: this.id});
    arr = _.filter(arr, this.where);
    arr = _.map(arr, (obj) => {
      return {
        id: obj.id,
        title: obj.title        
      }
    });
    arr = _.orderBy(arr, this.order, ['asc']);
     
    let promise = new Promise(function(resolve, reject) {
    //console.log('sampleData - ', sampleData);
    //console.log('arr - ', arr);
    resolve(arr);   
  });
  return promise;
}

User.prototype.findOne = function() {
    //console.log('in findOne ');
    
    //console.log('this.id ', this.id);
    //console.log('this.select ', this.select);
    //console.log('this.attributes ', this.attributes);
    //console.log('this.where ', this.where);
    //console.log('this.order ', this.order);
    let arr = _.result(sampleData, this.select);

    arr = _.filter(arr, {userId: this.id});
    arr = _.filter(arr, this.where);
    arr = _.map(arr, (obj) => {
      return {
        name: obj.name
      }
    });
      
    let promise = new Promise(function(resolve, reject) {
    //console.log('sampleData - ', sampleData);
    //console.log('arr - ', arr);
    resolve(arr);   
  });
  return promise;
}

// ------------------------------------------
// You shouldn't need to edit below this line

var user = new User({
	id: 123
});

// accessing properties
// console.log(user.id); // "123"

// checking the prototype value
// console.log(User.prototype); // { ... }

// Mimic what a ORM-like query engine would do by filtering the
// "sampleData" based on the query and the expected result example.
// Hint: lodash can be quite handly in dealing with this.
user
	.select('apps')
  .attributes(['id', 'title'])
  .where({ published: true })
  .order(['title'])
  .findAll()
  .then(function (apps) {
    // The expected result is for the "apps" array is:
    // [ { id: 6, title: 'Et' }, { id: 1, title: 'Lorem' } ]
    console.log(apps);
  })

//console.log('---------------------------------------');
var user1 = new User({
	id: 123
});

user1
	.select('organizations')
  .attributes(['name'])
  .where({ suspended: false })
  .findOne()
  .then(function (organization) {
    // The expected result is for the "organization" object is:
    // { id: 3, name: 'Fliplet' }
    console.log(organization);
  })