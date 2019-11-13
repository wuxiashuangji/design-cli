"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _default = function _default(compName) {
  return "\n# ".concat(compName, " \u7EC4\u4EF6\u540D\n\n\n\n## \u57FA\u672C\u7528\u6CD5\n```jsx\nimport { ").concat(compName, " } from 'zarm';\n\nReactDOM.render(\n  <>\n    <").concat(compName, " />\n  </>\n, mountNode);\n```\n\n\n\n## \u7528\u6CD5\u4E8C\n```jsx\nimport { ").concat(compName, " } from 'zarm';\n\nclass Demo extends React.Component {\n  state = {\n  }\n\n  render() {\n    return <").concat(compName, " />;\n  }\n}\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n\n\n## API\n\n| \u5C5E\u6027 | \u7C7B\u578B | \u9ED8\u8BA4\u503C | \u8BF4\u660E |\n| :--- | :--- | :--- | :--- |\n");
};

exports["default"] = _default;