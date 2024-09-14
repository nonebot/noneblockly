export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "CATEGORY",
      contents: [
        {
          kind: "BLOCK",
          type: "controls_if",
        },
        {
          kind: "BLOCK",
          type: "logic_compare",
        },
        {
          kind: "BLOCK",
          type: "logic_operation",
        },
        {
          kind: "BLOCK",
          type: "logic_negate",
        },
        {
          kind: "BLOCK",
          type: "logic_boolean",
        },
        {
          kind: "BLOCK",
          type: "logic_null",
        },
        {
          kind: "BLOCK",
          type: "logic_ternary",
        },
      ],
      name: "逻辑",
      categorystyle: "logic_category",
    },
    {
      kind: "CATEGORY",
      contents: [
        {
          kind: "BLOCK",
          type: "controls_repeat_ext",
        },
        {
          kind: "BLOCK",
          type: "controls_repeat",
        },
        {
          kind: "BLOCK",
          type: "controls_whileUntil",
        },
        {
          kind: "BLOCK",
          type: "controls_for",
        },
        {
          kind: "BLOCK",
          type: "controls_forEach",
        },
        {
          kind: "BLOCK",
          type: "controls_flow_statements",
        },
      ],
      name: "循环",
      categorystyle: "loop_category",
    },
    {
      kind: "CATEGORY",
      contents: [
        {
          kind: "BLOCK",
          type: "math_number",
          gap: "32",
        },
        {
          kind: "BLOCK",
          type: "math_arithmetic",
        },
        {
          kind: "BLOCK",
          type: "math_single",
        },
        {
          kind: "BLOCK",
          type: "math_trig",
        },
        {
          kind: "BLOCK",
          type: "math_constant",
        },
        {
          kind: "BLOCK",
          type: "math_number_property",
        },
        {
          kind: "BLOCK",
          type: "math_round",
        },
        {
          kind: "BLOCK",
          type: "math_on_list",
        },
        {
          kind: "BLOCK",
          type: "math_modulo",
        },
        {
          kind: "BLOCK",
          type: "math_constrain",
        },
        {
          kind: "BLOCK",
          type: "math_random_int",
        },
        {
          kind: "BLOCK",
          type: "math_random_float",
        },
        {
          kind: "BLOCK",
          type: "math_atan2",
        },
      ],
      name: "数学",
      categorystyle: "math_category",
    },
    {
      kind: "CATEGORY",
      contents: [
        {
          kind: "BLOCK",
          type: "text",
        },
        {
          kind: "BLOCK",
          type: "text_join",
        },
        {
          kind: "BLOCK",
          type: "text_append",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "",
                },
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_length",
          inputs: {
            VALUE: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "abc",
                },
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_isEmpty",
          inputs: {
            VALUE: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "",
                },
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_indexOf",
          inputs: {
            VALUE: {
              BLOCK: {
                type: "variables_get",
              },
            },
            FIND: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "abc",
                },
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_charAt",
          inputs: {
            VALUE: {
              BLOCK: {
                type: "variables_get",
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_getSubstring",
          inputs: {
            STRING: {
              BLOCK: {
                type: "variables_get",
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_changeCase",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "abc",
                },
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_trim",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: "abc",
                },
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_count",
          inputs: {
            SUB: {
              shadow: {
                type: "text",
              },
            },
            TEXT: {
              shadow: {
                type: "text",
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_replace",
          inputs: {
            FROM: {
              shadow: {
                type: "text",
              },
            },
            TO: {
              shadow: {
                type: "text",
              },
            },
            TEXT: {
              shadow: {
                type: "text",
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_reverse",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
              },
            },
          },
        },
      ],
      name: "文本",
      categorystyle: "text_category",
    },
    {
      kind: "CATEGORY",
      contents: [
        {
          kind: "BLOCK",
          type: "lists_create_with",
        },
        {
          kind: "BLOCK",
          type: "lists_repeat",
        },
        {
          kind: "BLOCK",
          type: "lists_length",
        },
        {
          kind: "BLOCK",
          type: "lists_isEmpty",
        },
        {
          kind: "BLOCK",
          type: "lists_indexOf",
        },
        {
          kind: "BLOCK",
          type: "lists_getIndex",
        },
        {
          kind: "BLOCK",
          type: "lists_setIndex",
        },
        {
          kind: "BLOCK",
          type: "lists_getSublist",
        },
        {
          kind: "BLOCK",
          type: "lists_split",
        },
        {
          kind: "BLOCK",
          type: "lists_sort",
        },
        {
          kind: "BLOCK",
          type: "lists_reverse",
        },
      ],
      name: "列表",
      categorystyle: "list_category",
    },
    {
      kind: "CATEGORY",
      contents: [
        {
          kind: "BLOCK",
          type: "dicts_create_with",
        },
        {
          kind: "BLOCK",
          type: "dicts_get",
        },
        {
          kind: "BLOCK",
          type: "dicts_set",
        },
      ],
      name: "字典",
      colour: "0",
    },
    {
      kind: "SEP",
    },
    {
      kind: "CATEGORY",
      contents: [
        {
          kind: "LABEL",
          text: "“消息处理”块会处理所有收到的消息",
        },
        {
          kind: "BLOCK",
          type: "nonebot_on_message",
        },
        {
          kind: "LABEL",
          text: "“命令处理”块只处理以指定前缀和命令起始的消息",
        },
        {
          kind: "BLOCK",
          type: "nonebot_on_command",
        },
        {
          kind: "LABEL",
          text: "以下参数或方法仅能在“消息处理”或“命令处理”语句中使用",
        },
        {
          kind: "BLOCK",
          type: "nonebot_param_text",
        },
        {
          kind: "BLOCK",
          type: "nonebot_send",
        },
      ],
      name: "通用消息处理",
      colour: "0",
    },
    {
      kind: "CATEGORY",
      contents: [
        {
          kind: "LABEL",
          text: "“跨平台命令解析与处理”块提供更加灵活的跨平台命令解析支持",
        },
        {
          kind: "BLOCK",
          type: "nonebot_on_alconna",
        },
        {
          kind: "LABEL",
          text: "以下命令参数只能填充到“跨平台命令解析与处理”中对应位置",
        },
        {
          kind: "BLOCK",
          type: "alconna_const",
        },
        {
          kind: "BLOCK",
          type: "alconna_arg",
        },
        {
          kind: "LABEL",
          text: "以下参数或方法仅能在“跨平台命令解析与处理”语句中使用",
        },
        {
          kind: "BLOCK",
          type: "alconna_arg_get",
        },
      ],
      name: "跨平台命令处理",
      colour: "90",
    },
    {
      kind: "CATEGORY",
      contents: [
        {
          kind: "BLOCK",
          type: "store_save_json",
        },
        {
          kind: "BLOCK",
          type: "store_load_json",
        },
      ],
      name: "文件存储",
      colour: "150",
    },
    {
      kind: "CATEGORY",
      name: "定时任务",
      colour: "210",
    },
    {
      kind: "CATEGORY",
      contents: [
        {
          kind: "BLOCK",
          type: "request_get",
        },
        {
          kind: "BLOCK",
          type: "request_post",
        },
      ],
      name: "网络请求",
      colour: "270",
    },
    {
      kind: "SEP",
    },
    {
      kind: "CATEGORY",
      name: "变量",
      categorystyle: "variable_category",
      custom: "VARIABLE",
    },
    // {
    //   kind: "CATEGORY",
    //   name: "函数",
    //   categorystyle: "procedure_category",
    //   custom: "PROCEDURE",
    // },
  ],
};
