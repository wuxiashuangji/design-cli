"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _babelJest = _interopRequireDefault(require("babel-jest"));

var _native = _interopRequireDefault(require("../babelConfig/native"));

module.exports = _babelJest["default"].createTransformer(_native["default"]);