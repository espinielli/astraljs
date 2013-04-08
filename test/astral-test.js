// -*-coding: utf-8;-*-

// division-by-zero-test.js

var vows = require('vows'),
  assert = require('assert'),
      fs = require('fs'),
      aa = eval(fs.readFileSync('astral.js')+'');


// Create a Test Suite
var suiteBasics = vows.describe('Basic functions');

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
  'round': {
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
  }


});

suiteBasics.export(module);
