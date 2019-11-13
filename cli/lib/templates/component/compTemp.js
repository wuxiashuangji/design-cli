"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _changeCase = _interopRequireDefault(require("change-case"));

var _default = function _default(compName) {
  return "\nimport React, { PureComponent } from 'react';\nimport classnames from 'classnames';\n\nexport interface ".concat(compName, "Props {\n  prefixCls?: string;\n  className?: string;\n}\n\nexport interface ").concat(compName, "States {\n\n}\n\nexport default class ").concat(compName, " extends PureComponent<").concat(compName, "Props, ").concat(compName, "States> {\n  static displayName = '").concat(compName, "';\n\n  static defaultProps = {\n    prefixCls: 'za-").concat(_changeCase["default"].paramCase(compName), "',\n  };\n\n  render() {\n    const {\n      prefixCls,\n      className,\n      children,\n    } = this.props;\n\n    const cls = classnames(prefixCls, className);\n\n    return (\n      <div className={cls}>\n        {children}\n      </div>\n    );\n  }\n}\n");
};

exports["default"] = _default;