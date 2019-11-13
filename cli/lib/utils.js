"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.getConfigByProject = exports.getProjectPath = exports.fileTree = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var fileTree = function fileTree(list, dirPath) {
  var files = _fs["default"].readdirSync(dirPath);

  for (var i = 0; i < files.length; i++) {
    var filePath = _path["default"].join(dirPath, files[i]);

    var stats = _fs["default"].statSync(filePath);

    if (stats.isDirectory()) {
      fileTree(list, filePath);
    } else {
      var type = _path["default"].extname(files[i]).substring(1);

      list.push({
        filePath: filePath,
        type: type
      });
    }
  }
}; // 获取项目文件


exports.fileTree = fileTree;

var getProjectPath = function getProjectPath() {
  var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './';
  return _path["default"].join(process.cwd(), dir);
}; // 获取项目文件


exports.getProjectPath = getProjectPath;

var getConfigByProject = function getConfigByProject() {
  var configFileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'zarm.config.js';

  var configPath = _path["default"].join(process.cwd(), configFileName);

  if (_fs["default"].existsSync(configPath)) {
    // eslint-disable-next-line import/no-dynamic-require
    return require(configPath);
  }

  return {};
};

exports.getConfigByProject = getConfigByProject;