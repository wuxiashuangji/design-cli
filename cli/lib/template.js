"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mkdirp = require("mkdirp");

var _changeCase = _interopRequireDefault(require("change-case"));

var _chalk = _interopRequireDefault(require("chalk"));

var _signale = _interopRequireDefault(require("signale"));

var _templates = require("./templates");

var wirte = function wirte(dir, code) {
  _fs["default"].writeSync(_fs["default"].openSync(dir, 'w'), code);
};

var _default = function _default(_ref) {
  var compName = _ref.compName;
  var rootDir = "components/".concat(_changeCase["default"].paramCase(compName));
  var folder = {
    component: rootDir,
    style: "".concat(rootDir, "/style"),
    test: "".concat(rootDir, "/__tests__")
  };
  var pages = {
    component: [{
      name: 'index.tsx',
      module: _templates.component.indexTemp(compName)
    }, {
      name: 'demo.md',
      module: _templates.component.demoTemp(compName)
    }, {
      name: "".concat(compName, ".tsx"),
      module: _templates.component.compTemp(compName)
    }],
    style: [{
      name: 'index.tsx',
      module: _templates.style.indexTemp()
    }, {
      name: 'index.scss',
      module: _templates.style.indexScssTemp(compName)
    }],
    test: [{
      name: 'index.test.jsx',
      module: _templates.test.indexTemp(compName)
    }]
  };
  (0, _keys["default"])(pages).forEach(function (key) {
    (0, _mkdirp.sync)(folder[key]);
    pages[key].forEach(function (page) {
      wirte(_path["default"].resolve("./".concat(folder[key]), page.name), page.module);
      console.info("   ".concat(_chalk["default"].green('create'), " ").concat(folder[key], "/").concat(page.name));
    });
  });

  _signale["default"].success('create component templates successfully!!');
};

exports["default"] = _default;