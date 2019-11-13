"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _changeCase = _interopRequireDefault(require("change-case"));

var _default = function _default(compName) {
  return "\n@import '../../style/core/index';\n\n@include b(".concat(_changeCase["default"].paramCase(compName), ") {\n\n}\n");
};

exports["default"] = _default;