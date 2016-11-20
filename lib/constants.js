(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'mola', './babelHelpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('mola'), require('./babelHelpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.mola, global.babelHelpers);
    global.constants = mod.exports;
  }
})(this, function (exports, _mola, babelHelpers) {
  'use strict';

  exports.__esModule = true;
  exports.type = exports.level = undefined;
  /**
   * @file 常量
   * @author cxtom (cxtom208@gmail.com)
   */

  var level = exports.level = _mola.MOLA_COMPONENT_LEVEL_FIXED;
  var type = exports.type = 'ScrollTip';
});
//# sourceMappingURL=constants.js.map
