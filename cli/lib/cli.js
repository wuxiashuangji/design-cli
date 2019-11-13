"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _commander = _interopRequireDefault(require("commander"));

var _build = _interopRequireDefault(require("./build"));

var _development = _interopRequireDefault(require("./development"));

var _deploy = _interopRequireDefault(require("./deploy"));

var _template = _interopRequireDefault(require("./template"));

var _test = _interopRequireDefault(require("./test"));

var _package = _interopRequireDefault(require("../package.json"));

_commander["default"].version(String(_package["default"].version));

_commander["default"].command('build').description('打包编译仓库').option('-m, --mode <es|lib|umd|native|umd-zip>', '选择打包模式').option('-p, --path <path>', '源文件目录').option('-o, --out-file <path>', '输出文件').option('-d, --out-dir <path>', '输出目录').option('-z, --out-zip <path>', '输出zip压缩包存放目录').option('-e, --ext <ext>', '要匹配的文件格式', '.ts,.tsx').option('-l, --library-name <libraryName>', '包名').option('-c, --copy-files', '拷贝不参与编译的文件').action(_build["default"]);

_commander["default"].command('dev').description('运行开发环境').option('-m, --mode <mode>', '编译模式').option('-h, --host <host>', '站点主机地址', '0.0.0.0').option('-p, --port <port>', '站点端口号', 3000).action(_development["default"]);

_commander["default"].command('deploy').description('部署官网站点').option('-p, --push-gh', '是否发布至gh-pages').option('-d, --out-dir <path>', '输出目录', 'assets').action(_deploy["default"]);

_commander["default"].command('test').description('执行单元测试脚本').option('-m, --mode <mode>', '编译模式').option('-u, --update-snapshot', '是否更新快照').option('-c, --coverage', '是否生成覆盖率报告').option('-s, --setupTestFrameworkScriptFile <file>', '测试前装载的脚本文件').action(_test["default"]);

_commander["default"].command('add').description('新增组件模板').action(function () {
  return (0, _template["default"])({
    compName: _commander["default"].args[0]
  });
});

_commander["default"].parse(process.argv);

if (!_commander["default"].args[0]) {
  _commander["default"].help();
}