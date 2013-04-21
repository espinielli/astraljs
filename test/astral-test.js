var vows = require('vows'),
  assert = require('./assert'),
      fs = require('fs'),
      aa = eval(fs.readFileSync('astral.js')+''),
       τ = 2 * Math.PI,
 degrees = 360 / τ,
 radians = τ / 360;


// Create a Test Suite
var suiteBasics = vows.describe('Basic functions'),
  suiteCalendar = vows.describe('Calendar functions'),
    suiteLunar  = vows.describe('Lunar functions');

suiteBasics.addBatch({
  'floor': {
    topic: function() {return aa.ifloor;},
    'integer towards -∞': function (topic) {
      assert.equal(topic( 1.4),  1);
      assert.equal(topic(-1.4), -2);
      assert.equal(topic(1.6),   1);
      assert.equal(topic(-1.6), -2);
    }
  },
  'round: round': {
    topic: function() { return aa.round;},
    'round to nearest integer': function(topic) {
      assert.equal(topic(+23.67),  24);
      assert.equal(topic(+23.50),  24);
      assert.equal(topic(+23.35),  23);
      assert.equal(topic(+23.00),  23);
      assert.equal(topic(  0.00),   0);
      assert.equal(topic(-23.00), -23);
      assert.equal(topic(-23.35), -23);
      assert.equal(topic(-23.50), -24);
      assert.equal(topic(-23.67), -24);
    }
  },
  'round: iround': {
    topic: function() { return aa.iround;},
    'round to nearest integer': function(topic) {
      assert.equal(topic(+23.67),  24);
      assert.equal(topic(+23.50),  24);
      assert.equal(topic(+23.35),  23);
      assert.equal(topic(+23.00),  23);
      assert.equal(topic(  0.00),   0);
      assert.equal(topic(-23.00), -23);
      assert.equal(topic(-23.35), -23);
      assert.equal(topic(-23.50), -24);
      assert.equal(topic(-23.67), -24);
    }
  },
  'trigonometry in degrees: sin': {
    topic: function() { return aa.sin_degrees;},
    'sin in degrees': function(topic) {
      assert.inDelta(topic(30), 0.5, 1e-6);
      assert.inDelta(topic(60), Math.sqrt(3)/2, 1e-6);
      assert.equal(topic(0), 0.0);
      assert.equal(topic(90), 1.0);
    }
  },
  'trigonometry in degrees: cos': {
    topic: function() { return aa.cos_degrees;},
    'cos in degrees': function(topic) {
      assert.inDelta(topic(60), 0.5, 1e-6);
      assert.inDelta(topic(30), Math.sqrt(3)/2, 1e-6);
      assert.inDelta(topic(90), 0.0, 1e-6);
      assert.equal(topic(0), 1.0);
    }
  },
  'remainder: mod': {
    topic: function() { return aa.mod;},
    'mod': function(topic) {
      assert.equal(topic(1.5,  1),  0.5);
      assert.equal(topic(1.5, -1), -0.5);
      assert.equal(topic(-1.5,  1),  0.5);
      assert.equal(topic(-1.5, -1), -0.5);
    }
  },
  'remainder: amod': {
    topic: function() { return aa.amod;},
    'mod': function(topic) {
      assert.equal(topic(1.5,  1),  0.5);
      assert.equal(topic(6,  3),    3);
      assert.equal(topic(6,  6),    6);
      assert.equal(topic(6, -6),   -6);
      assert.equal(topic(2  , -1), -1);
    }
  },
  'quotient': {
    topic: function() { return aa.quotient;},
    'mod': function(topic) {
      assert.equal(topic(3,  1),  3);
      assert.equal(topic(6,  3),  2);
      assert.equal(topic(6, -3), -2);
      assert.equal(topic(-6, 3), -2);
      assert.equal(topic(-6,-3),  2);
      assert.equal(topic(6, 5),   1);
    }
  },
  'signum': {
    topic: function() { return Math.signum;},
    'signum': function(topic) {
      assert.equal(topic(1),  1);
      assert.equal(topic(3),  1);
      assert.equal(topic(-1),-1);
      assert.equal(topic(-3),-1);
      assert.equal(topic(0),  0);
      assert.equal(topic(-0), 0);
    }
  },
  'next': {
    topic: function() { return aa.next;},
    'next': function(topic) {
      assert.equal(topic(0, function(i){return i == 3;}),  3);
      assert.equal(topic(0, function(i){return i == 0;}),  0);
    }
  },
  'final': {
    topic: function() { return aa.final;},
    'final': function(topic) {
      assert.equal(topic(0, function(i){return i == 3;}),-1);
      assert.equal(topic(0, function(i){return i < 3;}),  2);
      assert.equal(topic(0, function(i){return i < 0;}), -1);
    }
  },
  'summa': {
    topic: function() { return aa.summa;},
    'summa': function(topic) {
      assert.equal(topic(function(x){return 1;}, 1, function(i){return i <= 4;}), 4);
      assert.equal(topic(function(x){return 1;}, 0, function(i){return i >= 4;}), 0);
      assert.equal(topic(function(x){return x*x;}, 1, function(i){return i <= 4;}), 30);
    }
  },
  'binary search': {
    topic: function() { return aa.binary_search;},
    'binary_search': function(topic) {
      function fminusy(x, y) { return fx(x) - y; }
      function p(a, b) { return Math.abs(fminusy(0.5*(a+b), y)) <= 1e-5;}
      function e(x) { return fminusy(x, y) >= 0;}
      var fx, y, x0;

      // function y = f(x), f(x) = x, y0 = 1.0; solution is x0 = 1.0
      fx = function(x) {return x;},
      y  = 1.0,
      x0 = 1.0;
      assert.inDelta(topic(0.0, 3.1, p, e), x0, 1e-5);

      // new function y = f(x), f(x) = x**2 - 4*x + 4, y0 = 0.0; solution x0=2.0
      fx = function(x) { return x*x -4 * x + 4.0;};
      y = 0.0;
      x0 = 2.0;
      assert.inDelta(topic(1.5, 2.5, p, e), x0, 1e-5);
    }
  },
  'invert angular': {
    topic: function() { return aa.invert_angular;},
    'invert_angular': function(topic) {
      assert.inDelta(topic(Math.tan, 1.0, 0, 60*radians), 45*radians, 1e-5);
    }
  },
  'zip': {
    topic: function() { return aa.zip;},
    'zip': function(topic) {
      assert.deepEqual(topic([[1,2],[11,22],[111,222]]), [[1,11,111],[2,22,222]]);
      assert.deepEqual(topic([]), []);
    }
  },
  'sigma': {
    topic: function() { return aa.sigma;},
    'sigma': function(topic) {
      var a = [ 1, 2, 3, 4],
          b = [ 5, 6, 7, 8],
          c = [ 9,10,11,12],
        ell = [a,b,c],
        bi  = function(x, y, z) {return x * y * z;};
      assert.equal(topic(ell, bi), 780);
    }
  },
  'polynomial evaluation': {
    topic: function() { return aa.poly;},
    'poly': function(topic) {
      assert.equal(topic(0, [2, 2, 1]), 2);
      assert.equal(topic(1, [2, 2, 1]), 5);
    }
  }



});
suiteBasics.export(module);



suiteLunar.addBatch({
  'julian centuries': {
    topic: function() {return aa.julian_centuries;},
    'julian_centuries': function (topic) {
      // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
      assert.inDelta(topic(1234), -19.955821423407599, 1e-6);
      assert.inDelta(topic(123456789), 3360.1894633885022, 1e-6);
    }
  },
  'mean lunar longitude': {
    topic: function() {return aa.mean_lunar_longitude;},
    'mean_lunar_longitude': function (topic) {
      // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
      assert.inDelta(topic(1234), 59.727982521057129, 1e-6);
      assert.inDelta(topic(12345.6789), 190.31678771972656, 1e-6);
    }
  },
  'lunar elongation': {
    topic: function() {return aa.lunar_elongation;},
    'lunar_elongation': function (topic) {
      // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
      assert.inDelta(topic(-0.077221081451), 113.842304, 1e-6);
    }
  },
  'solar anomaly': {
    topic: function() {return aa.solar_anomaly;},
    'solar_anomaly': function (topic) {
      // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
      assert.inDelta(topic(-0.077221081451), 97.643514, 1e-6);
    }
  },
  'lunar anomaly': {
    topic: function() {return aa.lunar_anomaly;},
    'lunar_anomaly': function (topic) {
      // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
      assert.inDelta(topic(-0.077221081451), 5.150833, 1e-6);
    }
  },
  'moon node': {
    topic: function() {return aa.moon_node;},
    'moon_node': function (topic) {
      // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
      assert.inDelta(topic(-0.077221081451), 219.889721, 1e-6);
    }
  },
  'nutation': {
    topic: function() {return aa.nutation;},
    'nutation': function (topic) {
      // from Jan Meeus "Astronomical Algorithms", pag 343
      var TD  = aa.fixed_from_gregorian(aa.gregorian_date(1992, 4, 12)),
      tee = aa.universal_from_dynamical(TD);
      assert.inDelta(topic(tee), 0.004610, 1e-3);
    }
  },
  'lunar longitude': {
    topic: function() {return aa.lunar_longitude;},
    'lunar_longitude': function (topic) {
      [[-214193,244.874423],
       [-61387,208.899019],
       [25469,213.737971],
       [49217,292.023244],
       [171307,156.788280],
       [210155,108.049774],
       [253427,39.379279],
       [369740,98.640750],
       [400085,333.042222],
       [434355,92.324006],
       [452605,78.197657],
       [470160,275.005178],
       [473837,128.410088],
       [507850,89.554059],
       [524156,24.630218],
       [544676,53.502041],
       [567118,187.906162],
       [569477,320.178528],
       [601716,314.042381],
       [613424,145.473477],
       [626596,185.030508],
       [645554,142.189133],
       [664224,253.743375],
       [671401,151.648685],
       [694799,287.987744],
       [704424,25.626707],
       [708842,290.288301],
       [709409,189.913142],
       [709580,284.931730],
       [727274,152.339160],
       [728714,51.662468],
       [744313,26.691791],
       [764652,175.500184]].forEach(function(elem, idx, a){
           assert.inDelta(topic(elem[0]), elem[1], 1e-6);
       });
    }
  },
  'lunar latitude': {
    topic: function() {return aa.lunar_latitude;},
    'lunar_latitude': function (topic) {
      [[-214193,2.4512210894089499],
       [-61387,-4.900974878748535],
       [25469,-2.9386466549932742],
       [49217,5.0024409717578777],
       [171307,-3.2110619584981279],
       [210155,0.89488090123712993],
       [253427,-3.8646603628793983],
       [369740,-2.5169261597902022],
       [400085,1.0392112793217603],
       [434355,3.001254715248308],
       [452605,1.6194118023686688],
       [470160,4.7690127800072304],
       [473837,4.8975443742093034],
       [507850,4.8392647850456427],
       [524156,2.2998648348671367],
       [544676,-0.89189979939658848],
       [567118,4.7659766484954176],
       [569477,-2.7370847328778893],
       [601716,-4.0358542177331955],
       [613424,-3.1571621380880295],
       [626596,-1.8795713844018991],
       [645554,-3.3793367961675287],
       [664224,-4.3983946303430344],
       [671401,2.0989965374597652],
       [694799,5.2687039601075085],
       [704424,-1.6724351785548262],
       [708842,4.6820075588690742],
       [709409,3.7055293518875878],
       [709580,2.4939135456237231],
       [727274,-4.1678043036301489],
       [728714,-2.8736323177607233],
       [744313,-4.6666633728184834],
       [764652,5.1387558414524648]
       ].forEach(function(elem, idx, a){
           assert.inDelta(topic(elem[0]), elem[1], 1e-6);
       });
    }
  },
  'lunar distancee': {
    topic: function() {return aa.lunar_distance;},
    'lunar_distance': function (topic) {
      [
[-214193,387615669.677],
[-61387,393689445.58352],
[25469,402231258.0365],
[49217,392549678.50526],
[171307,366788092.28699],
[210155,365106827.09545],
[253427,401999414.31386],
[369740,404013714.6206],
[400085,377640724.58798],
[434355,403150704.91632],
[452605,375139815.92662],
[470160,369933158.03617],
[473837,402551994.37319],
[507850,374838521.76001],
[524156,403464910.44759],
[544676,386217624.53985],
[567118,385333979.45035],
[569477,400373055.44669],
[601716,395970156.05463],
[613424,383857861.9552],
[626596,389634540.77273],
[645554,390868707.66102],
[664224,368015493.69418],
[671401,399800095.78048],
[694799,404273360.30398],
[704424,382777325.70491],
[708842,378047375.33606],
[709409,385774023.99314],
[709580,371763698.09795],
[727274,362461695.98882],
[728714,394214547.74925],
[744313,405788740.12495],
[764652,404202927.44438]
       ].forEach(function(elem, idx, a){
           assert.inDelta(topic(elem[0]), elem[1], 1e-2);
       });
    }
  }




});
suiteLunar.export(module);


suiteCalendar.addBatch({
  'time conversion': {
    topic: function() {return aa.universal_from_dynamical;},
    'universal_from_dynamical': function (topic) {
      // from Meeus Example 10.a, pag 78
      var date = aa.gregorian_date(1977, 2, 18),
        time = aa.time_from_clock([3, 37, 40]),
      td   = aa.fixed_from_gregorian(date) + time,
      utc  = aa.universal_from_dynamical(td),
      clk  = aa.clock_from_moment(utc);
      assert.equal(clk[0], 3);
      assert.equal(clk[1], 36);
      assert.equal(aa.iround(clk[2]), 52);
    }
  },
  'Gregorian leap year': {
    topic: function() {return aa.is_gregorian_leap_year;},
    'is_gregorian_leap_year': function (topic) {
      assert.ok(topic(2000));
      assert.ok(!topic(1900));
    }
  },
  'Gregorian conversion': {
    topic: function() {return aa.gregorian_from_fixed;},
    'gregorian_from_fixed': function (topic) {
      assert.equal(topic(710347), [1945, 11, 12]);
    }
  },
  'Gregorian conversion': {
    topic: function() {return aa.fixed_from_gregorian;},
    'fixed_from_gregorian': function (topic) {
      assert.equal(topic([1945, 11, 12]), 710347);
    }
  }

});
suiteCalendar.export(module);

