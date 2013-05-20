var smash = require("smash");


// The following function called like
//      load("Ciao", "Cucu")
// will provide to smash an array of files like:
//      [ 'src/start', 'src/Ciao', 'src/Cucu', 'src/end' ]

module.exports = function() {
  // 'Array.prototype.slice.call(arguments)' converts 'arguments' to a real Array.
  // 'arguments' is an object is a local variable available within all functions.
  //  see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Functions_and_function_scope/arguments
  var files = [].slice.call(arguments).map(function(d) { return "src/" + d; }),
      expression = "",
      sandbox = null;

  files.unshift("src/start");
  files.push("src/end");

  function topic() {
    smash.load(files, expression, sandbox, this.callback);
  }

  topic.expression = function(_) {
    expression = _;
    return topic;
  };

  return topic;
};


