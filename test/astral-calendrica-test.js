// var vows = require("vows"),
//     assert = require("assert"),
//     load = require("./load");

// var suite = vows.describe("astral-calendrica");



// suite.addBatch({
//   "calendrica": {
//     topic: load("astral-calendrica"),
//     "gregorian leap": {
//       topic: function(astral) { return astral.is_gregorian_leap_year; },
//       'millennium leap year': function (is_leap) {
//         assert.isTrue(is_leap(2000));
//         assert.isFalse(is_leap(1900));
//       },
//       '4-century leap year': function (is_leap) {
//         assert.isTrue(is_leap(1600));
//         assert.isTrue(is_leap(400));
//       },
//       '4-year leap year': function (is_leap) {
//         assert.isTrue(is_leap(4));
//         assert.isTrue(is_leap(8));
//       }
//     },
//     "rd to gregorian conversion": {
//       topic: function(aa) {return aa.gregorian_from_fixed;},
//       'gregorian_from_fixed': function (topic) {
//         assert.deepEqual(topic(710347), [1945, 11, 12]);
//       }
//     },
//     'gregorian to rd conversion': {
//       topic: function(aa) {return aa.fixed_from_gregorian;},
//       'fixed_from_gregorian': function (topic) {
//         assert.equal(topic([1945, 11, 12]), 710347);
//       }
//     }
//   }
// });

// suite.export(module);