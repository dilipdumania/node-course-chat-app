var moment = require('moment');

var date = moment();

console.log(date.format('MMM Do, YYYY'));
console.log(date.calendar());
console.log(date.format('LT'));

console.log(date.format('h:mm a'));