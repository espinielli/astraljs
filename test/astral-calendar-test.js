var vows = require("vows"),
    assert = require("./assert"),
    load = require("./load");

var suite = vows.describe("astral-calendar");

suite.addBatch({
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