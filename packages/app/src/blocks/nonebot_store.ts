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
    message0: "读取文件 %1 %2 到字典 %3",
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
      {
        type: "input_value",
        name: "DICT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 150,
    inputsInline: true,
  },
];
