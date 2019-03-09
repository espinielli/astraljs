// var vows = require("vows"),
//     assert = require("assert"),
//     load = require("./load");

// var suite = vows.describe("astral-astronomy");

suite.addBatch({
  "astronomy": {
    topic: load("astral-astronomy"),
    "time conversion": {
      topic: function(aa) { return aa; },
      'universal from dynamical': function (aa) {
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
    }
  }
});


suite.addBatch({
  "astronomy": {
    topic: load("astral-astronomy"),
      'julian centuries': {
        topic: function(aa) {return aa.julian_centuries;},
          'julian_centuries': function (topic) {
            // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
            assert.inDelta(topic(1234), -19.955821423407599, 1e-6);
            assert.inDelta(topic(123456789), 3360.1894633885022, 1e-6);
        }
      },
      'mean lunar longitude': {
        topic: function(aa) {return aa.mean_lunar_longitude;},
        'mean_lunar_longitude': function (topic) {
          // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
          assert.inDelta(topic(1234), 59.727982521057129, 1e-6);
          assert.inDelta(topic(12345.6789), 190.31678771972656, 1e-6);
        }
      },
      'lunar elongation': {
        topic: function(aa) {return aa.lunar_elongation;},
        'lunar_elongation': function (topic) {
          // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
          assert.inDelta(topic(-0.077221081451), 113.842304, 1e-6);
        }
      },
      'solar anomaly': {
        topic: function(aa) {return aa.solar_anomaly;},
        'solar_anomaly': function (topic) {
          // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
          assert.inDelta(topic(-0.077221081451), 97.643514, 1e-6);
        }
      },
      'lunar anomaly': {
        topic: function(aa) {return aa.lunar_anomaly;},
        'lunar_anomaly': function (topic) {
          // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
          assert.inDelta(topic(-0.077221081451), 5.150833, 1e-6);
        }
      },
      'moon node': {
        topic: function(aa) {return aa.moon_node;},
        'moon_node': function (topic) {
          // from Example 47.a in Jan Meeus "Astronomical Algorithms" pag 342
          assert.inDelta(topic(-0.077221081451), 219.889721, 1e-6);
        }
      },
      'nutation': {
        topic: function(aa) {return aa;},
        'nutation': function (astral) {
          // from Jan Meeus "Astronomical Algorithms", pag 343
          var TD  = astral.fixed_from_gregorian(astral.gregorian_date(1992, 4, 12)),
          tee = astral.universal_from_dynamical(TD);
          assert.inDelta(astral.nutation(tee), 0.004610, 1e-3);
        }
      },
      'lunar longitude': {
        topic: function(aa) {return aa.lunar_longitude;},
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
        topic: function(aa) {return aa.lunar_latitude;},
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
          [764652,5.1387558414524648]].forEach(function(elem, idx, a){
            assert.inDelta(topic(elem[0]), elem[1], 1e-6);
          });
        }
      },
      'lunar distancee': {
        topic: function(aa) {return aa.lunar_distance;},
        'lunar_distance': function (topic) {
          [[-214193,387615669.677],
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
          [764652,404202927.44438]].forEach(function(elem, idx, a){
            assert.inDelta(topic(elem[0]), elem[1], 1e-2);
          });
        }
      }
    }
});

// suite.export(module);