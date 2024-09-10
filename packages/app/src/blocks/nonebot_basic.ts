import { BlockDefinition } from "blockly/core/blocks";

export const definitions: BlockDefinition[] = [
  {
    type: "nonebot_on_message",
    tooltip: "",
    helpUrl: "",
    message0: "消息处理 %1 仅与我相关 %2 %3 %4",
    args0: [
      {
        type: "input_dummy",
        name: "NAME",
      },
      {
        type: "field_checkbox",
        name: "TOME",
        checked: "FALSE",
      },
      {
        type: "input_dummy",
        name: "PARAMS",
      },
      {
        type: "input_statement",
        name: "HANDLE",
      },
    ],
    colour: 0,
  },
  {
    type: "nonebot_on_command",
    tooltip: "处理指定前缀（默认为'/'）与命令字符串起始的消息，处理块内的消息文本为命令参数",
    helpUrl: "",
    message0: "命令处理 %1 命令字符串 %2 仅与我相关 %3 %4 %5",
    args0: [
      {
        type: "input_dummy",
        name: "NAME",
      },
      {
        type: "field_input",
        name: "COMMAND",
        text: "hello",
      },
      {
        type: "field_checkbox",
        name: "TOME",
        checked: "FALSE",
      },
      {
        type: "input_dummy",
        name: "PARAMS",
      },
      {
        type: "input_statement",
        name: "HANDLE",
      },
    ],
    colour: 0,
  },
  {
    type: "nonebot_param_text",
    tooltip: "",
    helpUrl: "",
    message0: "消息文本 %1",
    args0: [
      {
        type: "input_dummy",
        name: "NAME",
      },
    ],
    output: null,
    colour: 30,
  },
  {
    type: "nonebot_send",
    tooltip: "",
    helpUrl: "",
    message0: "发送消息 %1 %2 结束处理流程 %3 %4",
    args0: [
      {
        type: "input_dummy",
        name: "NAME",
      },
      {
        type: "input_value",
        name: "MESSAGE",
      },
      {
        type: "field_checkbox",
        name: "FINISH",
        checked: "FALSE",
      },
      {
        type: "input_dummy",
        name: "FINISH",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    inputsInline: true,
  },
];
