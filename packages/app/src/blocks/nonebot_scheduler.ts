import { BlockDefinition } from "blockly/core/blocks";

export const definitions: BlockDefinition[] = [
  {
    type: "scheduler_add",
    tooltip: "",
    helpUrl: "",
    message0:
      "网络请求 GET %1 链接 %2 （可选）参数字典 %3 （可选）标头字典 %4 返回 %5 %6 %7 秒超时 %8",
    args0: [
      {
        type: "input_dummy",
        name: "NAME",
      },
      {
        type: "input_value",
        name: "URL",
        align: "RIGHT",
        check: "String",
      },
      {
        type: "input_value",
        name: "PARAMS",
        align: "RIGHT",
        check: "dict",
      },
      {
        type: "input_value",
        name: "HEADERS",
        check: "dict",
      },
      {
        type: "field_dropdown",
        name: "TYPE",
        options: [
          ["字典", "dict"],
          ["文本", "string"],
          ["二进制", "binary"],
        ],
      },
      {
        type: "input_dummy",
        name: "TYPE",
        align: "RIGHT",
      },
      {
        type: "field_number",
        name: "TIMEOUT",
        value: 60,
        min: 0,
      },
      {
        type: "input_dummy",
        name: "TIMEOUT",
        align: "RIGHT",
      },
    ],
    output: null,
    colour: 270,
    inputsInline: false,
  },
  {
    type: "request_post",
    tooltip: "",
    helpUrl: "",
    message0:
      "网络请求 POST %1 链接 %2 数据字典 %3 （可选）参数字典 %4 （可选）标头字典 %5 返回 %6 %7 %8 秒超时 %9",
    args0: [
      {
        type: "input_dummy",
        name: "NAME",
      },
      {
        type: "input_value",
        name: "URL",
        align: "RIGHT",
        check: "String",
      },
      {
        type: "input_value",
        name: "JSON",
        align: "RIGHT",
        check: "dict",
      },
      {
        type: "input_value",
        name: "PARAMS",
        align: "RIGHT",
        check: "dict",
      },
      {
        type: "input_value",
        name: "HEADER",
        align: "RIGHT",
        check: "dict",
      },
      {
        type: "field_dropdown",
        name: "TYPE",
        options: [
          ["字典", "dict"],
          ["文本", "string"],
          ["二进制", "binary"],
        ],
      },
      {
        type: "input_dummy",
        name: "TYPE",
        align: "RIGHT",
      },
      {
        type: "field_number",
        name: "TIMEOUT",
        value: 60,
        min: 0,
      },
      {
        type: "input_dummy",
        name: "TIMEOUT",
        align: "RIGHT",
      },
    ],
    output: null,
    colour: 270,
    inputsInline: false,
  },
];
