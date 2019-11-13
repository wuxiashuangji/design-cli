"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;
var _default = {
  presets: [[require.resolve('@babel/preset-env'), {
    modules: false
  }], require.resolve('@babel/preset-react'), require.resolve('@babel/preset-typescript')],
  plugins: [require.resolve('@babel/plugin-syntax-dynamic-import'), require.resolve('@babel/plugin-proposal-class-properties'), require.resolve('@babel/plugin-transform-runtime')],
  env: {
    test: {
      plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')]
    }
  }
};
exports["default"] = _default;