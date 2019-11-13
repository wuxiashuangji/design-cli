"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _default = function _default(compName) {
  return "\nimport React from 'react';\nimport { render } from 'enzyme';\nimport toJson from 'enzyme-to-json';\nimport ".concat(compName, " from '../index';\n\ndescribe('").concat(compName, "', () => {\n  it('renders correctly', () => {\n    const wrapper = render(\n      <").concat(compName, " />,\n    );\n    expect(toJson(wrapper)).toMatchSnapshot();\n  });\n});\n");
};

exports["default"] = _default;