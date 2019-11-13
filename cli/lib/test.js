"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _child_process = require("child_process");

var _utils = require("./utils");

var _default = function _default(_ref) {
  var mode = _ref.mode,
      updateSnapshot = _ref.updateSnapshot,
      coverage = _ref.coverage,
      setupTestFrameworkScriptFile = _ref.setupTestFrameworkScriptFile;

  var configFile = require.resolve("./config/jestConfig/".concat(mode === 'native' ? 'index.native' : 'index'));

  var args = [require.resolve('jest/bin/jest'), "--config=".concat(configFile), "--setupTestFrameworkScriptFile=".concat((0, _utils.getProjectPath)(setupTestFrameworkScriptFile))];
  updateSnapshot && args.push('-u');
  coverage && args.push('--coverage');
  (0, _child_process.spawn)('node', args, {
    stdio: 'inherit'
  });
};

exports["default"] = _default;