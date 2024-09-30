import { BlockDefinition } from "blockly/core/blocks";

export const definitions: BlockDefinition[] = [
  {
    type: "store_save_json",
    tooltip: "",
    helpUrl: "",
    message0: "保存字典 %1 到文件 %2 %3",
    args0: [
      {
        type: "input_value",
        name: "DICT",
        check: "dict",
      },
      {
        type: "field_input",
        name: "FILE",
        text: "save.json",
      },
      {
        type: "input_dummy",
        name: "PARAMS",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 150,
    inputsInline: true,
  },
  {
    type: "store_load_json",
    tooltip: "",
    helpUrl: "",
    message0: "读取文件 %1 %2 的字典",
    args0: [
      {
        type: "field_input",
        name: "FILE",
        text: "save.json",
      },
      {
        type: "input_dummy",
        name: "PARAMS",
      },
    ],
    output: "DICT",
    colour: 150,
    inputsInline: true,
  },
  {
    type: "store_save_text",
    tooltip: "",
    helpUrl: "",
    message0: "保存文本 %1 到文件 %2 %3",
    args0: [
      {
        type: "input_value",
        name: "TEXT",
        check: "String",
      },
      {
        type: "field_input",
        name: "FILE",
        text: "save.txt",
      },
      {
        type: "input_dummy",
        name: "PARAMS",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 180,
    inputsInline: true,
  },
  {
    type: "store_load_text",
    tooltip: "",
    helpUrl: "",
    message0: "读取文件 %1 %2 的文本",
    args0: [
      {
        type: "field_input",
        name: "FILE",
        text: "save.txt",
      },
      {
        type: "input_dummy",
        name: "PARAMS",
      },
    ],
    output: "String",
    colour: 180,
    inputsInline: true,
  },
];
