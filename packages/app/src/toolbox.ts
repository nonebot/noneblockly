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
          disabled: "true",
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
          text: "需要填入“事件处理”类模块的“响应器”中",
        },
        {
          kind: "LABEL",
          text: "也可以创建一个变量赋值，使用变量传递",
        },
        {
          kind: "BLOCK",
          type: "nonebot_on_command",
        },
      ],
      name: "事件响应器",
      colour: "20",
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
    {
      kind: "CATEGORY",
      name: "函数",
      categorystyle: "procedure_category",
      custom: "PROCEDURE",
    },
  ],
};
