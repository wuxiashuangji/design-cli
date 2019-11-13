"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;
var _default = {
  presets: [require.resolve('metro-react-native-babel-preset')],
  plugins: [[require.resolve('@babel/plugin-proposal-decorators'), {
    legacy: true
  }]]
};
exports["default"] = _default;