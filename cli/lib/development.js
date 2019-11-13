"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _child_process = require("child_process");

var _webpackConfig = _interopRequireDefault(require("./config/webpackConfig"));

var _deploy = require("./deploy");

var _utils = require("./utils");

// eslint-disable-next-line
var _require = require((0, _utils.getProjectPath)('package.json')),
    name = _require.name,
    version = _require.version;

var _default = function _default(_ref) {
  var mode = _ref.mode,
      host = _ref.host,
      port = _ref.port;

  if (mode === 'native') {
    var args = [require.resolve('@babel/cli/bin/babel'), 'components', '-d', 'components', '-m', 'es6', '-w', '--extensions', '.ts,.tsx', '--config-file', require.resolve('./config/babelConfig/native'), '--jsx', 'react-native'];
    (0, _child_process.spawnSync)('node', args);
    return;
  }

  var config = (0, _deploy.getCustomConfig)((0, _webpackConfig["default"])('dev'));
  (0, _keys["default"])(config.entry).forEach(function (key) {
    config.entry[key].unshift(require.resolve('react-hot-loader/patch'));
  });

  if (name === 'zarm') {
    config.plugins.push(new _htmlWebpackPlugin["default"]({
      template: './site/demo/index_umd.html',
      filename: 'demo_umd.html',
      inject: false
    }));
  } else if (name === 'zarm-web') {
    config.plugins.push(new _htmlWebpackPlugin["default"]({
      template: './site/index_umd.html',
      filename: 'index_umd.html',
      inject: false
    }));
  }

  var compiler = (0, _webpack["default"])(config);
  var serverConfig = {
    publicPath: '/',
    compress: true,
    noInfo: true,
    inline: true,
    hot: true
  };
  var devServer = new _webpackDevServer["default"](compiler, serverConfig);
  devServer.listen(port, host, function (err) {
    if (err) {
      return console.error(err);
    }

    console.warn("http://".concat(host, ":").concat(port, "\n"));
  });
  ['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      devServer.close();
      process.exit();
    });
  });
};

exports["default"] = _default;