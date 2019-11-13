"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports["default"] = exports.getCustomConfig = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _webpack = _interopRequireDefault(require("webpack"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _webpackPlugin = _interopRequireDefault(require("@sentry/webpack-plugin"));

var _webpackConfig = _interopRequireDefault(require("./config/webpackConfig"));

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys["default"])(object); if (_getOwnPropertySymbols["default"]) { var symbols = (0, _getOwnPropertySymbols["default"])(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor["default"])(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3["default"])(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors["default"]) { (0, _defineProperties["default"])(target, (0, _getOwnPropertyDescriptors["default"])(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2["default"])(target, key, (0, _getOwnPropertyDescriptor["default"])(source, key)); }); } } return target; }

// eslint-disable-next-line
var _require = require((0, _utils.getProjectPath)('package.json')),
    name = _require.name,
    version = _require.version;

var getCustomConfig = function getCustomConfig(config) {
  if (name === 'zarm') {
    config.entry = {
      index: ['./site/web/index.js'],
      demo: ['./site/demo/index.js']
    };
    config.module.rules[0].use[0].options.plugins.push( // plugin-babel-import config
    [require.resolve('babel-plugin-import'), {
      libraryName: 'dragon-ui',
      style: true
    }, 'dragon-ui']);
    config.plugins.push(new _htmlWebpackPlugin["default"]({
      template: './site/web/index.html',
      filename: 'index.html',
      chunks: ['manifest', 'index'],
      favicon: './site/favicon.ico'
    }), new _htmlWebpackPlugin["default"]({
      template: './site/demo/index.html',
      filename: 'demo.html',
      chunks: ['manifest', 'demo'],
      favicon: './site/favicon.ico'
    }));
    config.resolve.alias = _objectSpread({}, config.resolve.alias, {
      zarm: (0, _utils.getProjectPath)('components'),
      '@': (0, _utils.getProjectPath)('/'),
      '@site': (0, _utils.getProjectPath)('site')
    });
  } else if (name === 'zarm-web') {
    config.entry = {
      index: ['./site/index.js']
    }; // config.module.rules[0].exclude = [/[/\\\\]node_modules[/\\\\](?!zarm)/];

    config.plugins.push(new _htmlWebpackPlugin["default"]({
      template: './site/index.html',
      filename: 'index.html',
      chunks: ['manifest', 'index'],
      favicon: './site/favicon.ico'
    }));
    config.resolve.alias = _objectSpread({}, config.resolve.alias, {
      'zarm-web': (0, _utils.getProjectPath)('components'),
      '@': (0, _utils.getProjectPath)('/'),
      '@site': (0, _utils.getProjectPath)('site')
    });
  }

  return config;
};

exports.getCustomConfig = getCustomConfig;

var _default = function _default(_ref) {
  var pushGh = _ref.pushGh,
      outDir = _ref.outDir;
  var config = getCustomConfig((0, _webpackConfig["default"])('deploy'));
  config.output.path = (0, _utils.getProjectPath)(outDir);
  pushGh && config.plugins.push(new _webpackPlugin["default"]({
    release: version,
    include: outDir,
    sourceMapReference: false
  }));
  (0, _webpack["default"])(config).run(function () {});
};

exports["default"] = _default;