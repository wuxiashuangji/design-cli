"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _compTemp = _interopRequireDefault(require("./compTemp"));

var _indexTemp = _interopRequireDefault(require("./indexTemp"));

var _demoTemp = _interopRequireDefault(require("./demoTemp"));

var _default = {
  compTemp: _compTemp["default"],
  indexTemp: _indexTemp["default"],
  demoTemp: _demoTemp["default"]
};
exports["default"] = _default;