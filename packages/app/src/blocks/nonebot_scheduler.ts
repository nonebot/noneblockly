import { BlockDefinition } from "blockly/core/blocks";

export const definitions: BlockDefinition[] = [
  {
    type: "scheduler_add",
    tooltip: "",
    helpUrl: "",
    message0: "添加定时任务 %1 定时时间 %2 ID %3 %4",
    args0: [
      {
        type: "input_dummy",
        name: "NAME",
      },
      {
        type: "input_value",
        name: "TIME",
        align: "RIGHT",
        check: "time",
      },
      {
        type: "input_value",
        name: "ID",
        align: "RIGHT",
        check: "String",
      },
      {
        type: "input_statement",
        name: "HANDLE",
      },
    ],
    colour: 210,
  },
  {
    type: "scheduler_remove",
    tooltip: "",
    helpUrl: "",
    message0: "移除定时任务 %1 ID %2",
    args0: [
      {
        type: "input_dummy",
        name: "NAME",
      },
      {
        type: "input_value",
        name: "ID",
        check: "String",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    inputsInline: true,
  },
  {
    type: "scheduler_time_interval",
    tooltip: "",
    helpUrl: "",
    message0: "每 %1 %2 %3",
    args0: [
      {
        type: "field_number",
        name: "NUMBER",
        value: 30,
        min: 0,
      },
      {
        type: "field_dropdown",
        name: "UNIT",
        options: [
          ["秒", "seconds"],
          ["分", "minutes"],
          ["时", "hours"],
          ["天", "days"],
          ["周", "weeks"],
        ],
      },
      {
        type: "input_dummy",
        name: "NAME",
      },
    ],
    output: "time",
    colour: 240,
  },
  {
    type: "scheduler_time_cron_daily",
    tooltip: "",
    helpUrl: "",
    message0: "每天 %1 时 %2 分 %3 秒 %4",
    args0: [
      {
        type: "field_dropdown",
        name: "HOUR",
        options: [["任意", '"*"']].concat(
          Array.from({ length: 24 }, (_, i) => [String(i), String(i)]),
        ),
      },
      {
        type: "field_dropdown",
        name: "MINUTE",
        options: [["任意", '"*"']].concat(
          Array.from({ length: 60 }, (_, i) => [String(i), String(i)]),
        ),
      },
      {
        type: "field_dropdown",
        name: "SECOND",
        options: Array.from({ length: 60 }, (_, i) => [String(i), String(i)]),
      },
      {
        type: "input_dummy",
        name: "NAME",
      },
    ],
    output: "time",
    colour: 240,
  },
  {
    type: "scheduler_time_cron",
    tooltip: "",
    helpUrl: "",
    message0: "在 %1 月 %2 日 %3 时 %4 分 %5 秒 %6",
    args0: [
      {
        type: "field_dropdown",
        name: "MONTH",
        options: [["任意", '"*"']].concat(
          Array.from({ length: 12 }, (_, i) => [String(i + 1), String(i + 1)]),
        ),
      },
      {
        type: "field_dropdown",
        name: "DAY",
        options: [["任意", '"*"']].concat(
          Array.from({ length: 31 }, (_, i) => [String(i + 1), String(i + 1)]),
        ),
      },
      {
        type: "field_dropdown",
        name: "HOUR",
        options: [["任意", '"*"']].concat(
          Array.from({ length: 24 }, (_, i) => [String(i), String(i)]),
        ),
      },
      {
        type: "field_dropdown",
        name: "MINUTE",
        options: [["任意", '"*"']].concat(
          Array.from({ length: 60 }, (_, i) => [String(i), String(i)]),
        ),
      },
      {
        type: "field_dropdown",
        name: "SECOND",
        options: Array.from({ length: 60 }, (_, i) => [String(i), String(i)]),
      },
      {
        type: "input_dummy",
        name: "NAME",
      },
    ],
    output: "time",
    colour: 240,
  },
];
