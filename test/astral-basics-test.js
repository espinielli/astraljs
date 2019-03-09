var assert = require("./assert");

// var τ = 2 * Math.PI,
//   degrees = 360 / τ,
//   radians = τ / 360;


// var suite = vows.describe("astral-basic");

// suite.addBatch({
//   "basic": {
//     topic: load("astral-basic"),
//     "ifloor": {
//       topic: function(astral) { return astral.ifloor; },
//       "ifloor and Co.": function(ifloor) {
//         assert.equal(ifloor( 1.4),  1.0);
//         assert.equal(ifloor(-1.4), -2);
//         assert.equal(ifloor(1.6),   1);
//         assert.equal(ifloor(-1.6), -2);
//       }
//     },
//     "round": {
//       topic: function(astral) { return astral.round; },
//       'round to nearest integer': function(round) {
//         assert.equal(round(+23.67),  24);
//         assert.equal(round(+23.50),  24);
//         assert.equal(round(+23.35),  23);
//         assert.equal(round(+23.00),  23);
//         assert.equal(round(  0.00),   0);
//         assert.equal(round(-23.00), -23);
//         assert.equal(round(-23.35), -23);
//         assert.equal(round(-23.50), -24);
//         assert.equal(round(-23.67), -24);
//       }
//     },
//     "iround": {
//       topic: function(astral) { return astral.iround; },
//       "round to nearest integer": function(iround) {
//         assert.equal(iround(+23.67),  24);
//         assert.equal(iround(+23.50),  24);
//         assert.equal(iround(+23.35),  23);
//         assert.equal(iround(+23.00),  23);
//         assert.equal(iround(  0.00),   0);
//         assert.equal(iround(-23.00), -23);
//         assert.equal(iround(-23.35), -23);
//         assert.equal(iround(-23.50), -24);
//         assert.equal(iround(-23.67), -24);
//       }
//     },
//     'trigonometry in degrees: sin': {
//       topic: function(aa) { return aa.sin_degrees; },
//       'sin in degrees': function(topic) {
//         assert.inDelta(topic(30), 0.5, 1e-6);
//         assert.inDelta(topic(60), Math.sqrt(3)/2, 1e-6);
//         assert.equal(topic(0), 0.0);
//         assert.equal(topic(90), 1.0);
//       }
//     },
//     'trigonometry in degrees: cos': {
//       topic: function(aa) { return aa.cos_degrees; },
//       'cos in degrees': function(topic) {
//         assert.inDelta(topic(60), 0.5, 1e-6);
//         assert.inDelta(topic(30), Math.sqrt(3)/2, 1e-6);
//         assert.inDelta(topic(90), 0.0, 1e-6);
//         assert.equal(topic(0), 1.0);
//       }
//     },
//     'remainder: mod': {
//       topic: function(aa) { return aa.mod; },
//       'mod': function(topic) {
//         assert.equal(topic(1.5,  1),  0.5);
//         assert.equal(topic(1.5, -1), -0.5);
//         assert.equal(topic(-1.5,  1),  0.5);
//         assert.equal(topic(-1.5, -1), -0.5);
//       }
//     },
//     'remainder: amod': {
//       topic: function(aa) { return aa.amod; },
//       'mod': function(topic) {
//         assert.equal(topic(1.5,  1),  0.5);
//         assert.equal(topic(6,  3),    3);
//         assert.equal(topic(6,  6),    6);
//         assert.equal(topic(6, -6),   -6);
//         assert.equal(topic(2  , -1), -1);
//       }
//     },
//     'quotient': {
//       topic: function(aa) { return aa.quotient; },
//       'mod': function(topic) {
//         assert.equal(topic(3,  1),  3);
//         assert.equal(topic(6,  3),  2);
//         assert.equal(topic(6, -3), -2);
//         assert.equal(topic(-6, 3), -2);
//         assert.equal(topic(-6,-3),  2);
//         assert.equal(topic(6, 5),   1);
//       }
//     },
//     'signum': {
//       topic: function(aa) { return aa.signum; },
//       'signum': function(topic) {
//         assert.equal(topic(1),  1);
//         assert.equal(topic(3),  1);
//         assert.equal(topic(-1),-1);
//         assert.equal(topic(-3),-1);
//         assert.equal(topic(0),  0);
//         assert.equal(topic(-0), 0);
//       }
//     },
//     'next': {
//       topic: function(aa) { return aa.next;},
//       'next': function(topic) {
//         assert.equal(topic(0, function(i){return i == 3;}),  3);
//         assert.equal(topic(0, function(i){return i == 0;}),  0);
//       }
//     },
//     'final': {
//       topic: function(aa) { return aa.final;},
//       'final': function(topic) {
//         assert.equal(topic(0, function(i){return i == 3;}),-1);
//         assert.equal(topic(0, function(i){return i < 3;}),  2);
//         assert.equal(topic(0, function(i){return i < 0;}), -1);
//       }
//     },
//     'summa': {
//       topic: function(aa) { return aa.summa;},
//       'summa': function(topic) {
//         assert.equal(topic(function(x){return 1;}, 1, function(i){return i <= 4;}), 4);
//         assert.equal(topic(function(x){return 1;}, 0, function(i){return i >= 4;}), 0);
//         assert.equal(topic(function(x){return x*x;}, 1, function(i){return i <= 4;}), 30);
//       }
//     },
//     'binary search': {
//       topic: function(aa) { return aa.binary_search;},
//       'binary_search': function(topic) {
//         function fminusy(x, y) { return fx(x) - y; }
//         function p(a, b) { return Math.abs(fminusy(0.5*(a+b), y)) <= 1e-5;}
//         function e(x) { return fminusy(x, y) >= 0;}
//         var fx, y, x0;

//         // function y = f(x), f(x) = x, y0 = 1.0; solution is x0 = 1.0
//         fx = function(x) {return x;},
//         y  = 1.0,
//         x0 = 1.0;
//         assert.inDelta(topic(0.0, 3.1, p, e), x0, 1e-5);

//         // new function y = f(x), f(x) = x**2 - 4*x + 4, y0 = 0.0; solution x0=2.0
//         fx = function(x) { return x*x -4 * x + 4.0;};
//         y = 0.0;
//         x0 = 2.0;
//         assert.inDelta(topic(1.5, 2.5, p, e), x0, 1e-5);
//       }
//     },
//     'invert angular': {
//       topic: function(aa) { return aa.invert_angular;},
//       'invert_angular': function(topic) {
//         assert.inDelta(topic(Math.tan, 1.0, 0, 60*radians), 45*radians, 1e-5);
//       }
//     },
//     'zip': {
//       topic: function(aa) { return aa.zip;},
//       'zip': function(topic) {
//         assert.deepEqual(topic([[1,2],[11,22],[111,222]]), [[1,11,111],[2,22,222]]);
//         assert.deepEqual(topic([]), []);
//       }
//     },
//     'sigma': {
//       topic: function(aa) { return aa.sigma;},
//       'sigma': function(topic) {
//         var a = [ 1, 2, 3, 4],
//             b = [ 5, 6, 7, 8],
//             c = [ 9,10,11,12],
//           ell = [a,b,c],
//           bi  = function(x, y, z) {return x * y * z;};
//         assert.equal(topic(ell, bi), 780);
//       }
//     },
//     'polynomial evaluation': {
//       topic: function(aa) { return aa.poly;},
//       'poly': function(topic) {
//         assert.equal(topic(0, [2, 2, 1]), 2);
//         assert.equal(topic(1, [2, 2, 1]), 5);
//       }
//     }
//   }
// });



// suite.export(module);
