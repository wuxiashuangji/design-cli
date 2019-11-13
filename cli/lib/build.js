"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _gulp = _interopRequireDefault(require("gulp"));

var _signale = require("signale");

var _jszip = _interopRequireDefault(require("jszip"));

var _child_process = require("child_process");

var _webpackConfig = _interopRequireDefault(require("./config/webpackConfig"));

var _gulpConfig = _interopRequireDefault(require("./config/gulpConfig"));

var _utils = require("./utils");

// eslint-disable-next-line
var _require = require((0, _utils.getProjectPath)('package.json')),
    name = _require.name,
    version = _require.version;

var isZarmGroup = function isZarmGroup() {
  return name === 'zarm' || name === 'zarm-web';
};

var wirte = function wirte(dir, code) {
  _fs["default"].writeSync(_fs["default"].openSync(dir, 'w'), code);
};

var getZarmConfig = function getZarmConfig() {
  return {
    plugins: [new _webpack["default"].BannerPlugin("\n        ".concat(name, " v").concat(version, "\n\n        Github: https://github.com/ZhonganTechENG/").concat(name, "\n\n        Copyright (c) 2013-present, ZhonganTech, Inc.\n\n        This source code is licensed under the MIT license found in the\n        LICENSE file in the root directory of this source tree.\n      "))]
  };
}; // print error


var showErrors = function showErrors(errors) {
  console.error('zarm cli: ');
  errors.forEach(function (e) {
    console.error("  ".concat(e));
  });
  process.exit(2);
}; // build for umd


var umdBuild =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref, barActive) {
    var mode, path, outDir, outZip, libraryName, entryKey, entryFiles, umdTask, jsZip, list;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mode = _ref.mode, path = _ref.path, outDir = _ref.outDir, outZip = _ref.outZip, libraryName = _ref.libraryName;

            if (isZarmGroup()) {
              path = path || 'components/style/entry.tsx,components/index.tsx';
              outDir = outDir || 'dist';
            }

            libraryName = libraryName || name;
            entryKey = mode === 'umd-zip' ? 'index' : libraryName;
            entryFiles = path.split(',').map(function (p) {
              return (0, _utils.getProjectPath)(p);
            });

            umdTask = function umdTask(type) {
              return new _promise["default"](function (resolve, reject) {
                var config = (0, _webpackMerge["default"])((0, _webpackConfig["default"])(type), {
                  entry: (0, _defineProperty2["default"])({}, entryKey, entryFiles),
                  output: {
                    path: (0, _utils.getProjectPath)(outDir),
                    library: libraryName
                  }
                }, isZarmGroup() && getZarmConfig());
                return (0, _webpack["default"])(config).run(function (err, stats) {
                  return err ? reject(err) : resolve(stats);
                });
              });
            };

            barActive.process('building...');

            if (!(mode === 'umd-zip')) {
              _context.next = 18;
              break;
            }

            _context.next = 10;
            return umdTask('umd-zip');

          case 10:
            jsZip = new _jszip["default"]();
            list = [];
            (0, _utils.fileTree)(list, outDir);
            jsZip.file("".concat(outDir, "/manifest.json"), "{\n  \"indicate\": \"".concat(libraryName, "\",\n  \"name\": \"").concat(libraryName, "\",\n  \"propsSchema\": {\n\n  }\n}"));
            list.forEach(function (_ref3) {
              var filePath = _ref3.filePath;
              jsZip.file(filePath, _fs["default"].readFileSync(filePath));
            });
            jsZip.folder(outDir).generateAsync({
              type: 'nodebuffer'
            }).then(function (content) {
              wirte("".concat(outZip, "/").concat(libraryName, ".zip"), content);
            });
            _context.next = 22;
            break;

          case 18:
            _context.next = 20;
            return umdTask('umd');

          case 20:
            _context.next = 22;
            return umdTask('umd-ugly');

          case 22:
            barActive.success('Compiled successfully!');

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function umdBuild(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}(); // build for lib, es


var buildLibrary = function buildLibrary(_ref4, barActive) {
  var mode = _ref4.mode,
      path = _ref4.path,
      ext = _ref4.ext,
      outFile = _ref4.outFile,
      outDir = _ref4.outDir,
      copyFiles = _ref4.copyFiles;

  if (isZarmGroup()) {
    path = path || 'components';
    outDir = outDir || mode === 'native' ? 'components' : mode;
    copyFiles = !(mode === 'native');
  }

  var args = [require.resolve('@babel/cli/bin/babel'), path, '-m', mode === 'lib' ? 'commonjs' : 'es6', '--extensions', ext, '--ignore', '**/*.d.ts', '--config-file', require.resolve("./config/babelConfig/".concat(mode))];

  if (copyFiles) {
    args.push('--copy-files');
  }

  if (outDir) {
    args.push('--out-dir', outDir);
  }

  if (outFile) {
    args.push('--out-file', outFile);
  }

  if (mode === 'native') {
    args.push('--jsx', 'react-native');
  }

  barActive.process('building...');
  var result = (0, _child_process.spawnSync)('node', args);

  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status);
  } else {
    if (isZarmGroup()) {
      barActive.process('building css files');

      if (mode !== 'native') {
        (0, _gulpConfig["default"])(outDir, function () {
          barActive.success('Compiled successfully!');
        })(_gulp["default"]);
        return;
      }
    }

    barActive.success('Compiled successfully!');
  }
};

var _default =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(options) {
    var mode, path, outFile, outDir, outZip, errors, barActive;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mode = options.mode, path = options.path, outFile = options.outFile, outDir = options.outDir, outZip = options.outZip;
            errors = [];

            if (!mode) {
              errors.push('--mode requires define');
            }

            if (mode === 'umd-zip' && !outZip) {
              errors.push('--out-zip requires foldername');
            }

            if (!isZarmGroup()) {
              if (!path) {
                errors.push('--path requires define');
              }

              if (!outDir && !outFile) {
                if (!outDir) {
                  errors.push('--out-dir requires foldername');
                }

                if (!outFile) {
                  errors.push('--out-file requires filename');
                }
              }
            }

            errors.length && showErrors(errors);
            barActive = new _signale.Signale({
              scope: 'Zarm',
              interactive: true,
              types: {
                process: {
                  badge: '●',
                  color: 'yellow',
                  label: "build ".concat(mode)
                },
                success: {
                  label: "build ".concat(mode)
                }
              }
            }); // umd编译模式;

            if (!(mode === 'umd' || mode === 'umd-zip')) {
              _context2.next = 10;
              break;
            }

            umdBuild(options, barActive);
            return _context2.abrupt("return");

          case 10:
            buildLibrary(options, barActive);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
}();

exports["default"] = _default;