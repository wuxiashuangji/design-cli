"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _babelJest = _interopRequireDefault(require("babel-jest"));

var _base = _interopRequireDefault(require("../babelConfig/base"));

module.exports = _babelJest["default"].createTransformer(_base["default"]);