var smash = require("smash");

module.exports = function() {
  var files = [].slice.call(arguments).map(function(d) { return "src/" + d; }),
      sandbox = {astral: astral};
  files.unshift("geo/projection/start");
  files.push("geo/projection/end");

  function topic() {
    smash.load(files, "astral", sandbox, this.callback);
  }

  topic.sandbox = function(_) {
    sandbox = _;
    return topic;
  };

  return topic;
};
