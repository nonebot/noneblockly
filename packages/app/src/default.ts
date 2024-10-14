export const demoProject = {
  version: "v1",
  data: {
    workspaceComments: [
      {
        height: 79.33334350585938,
        width: 401.33331298828125,
        id: ").5C,33iYe,Es5QP^CZS",
        x: 490,
        y: 50,
        text: '消息处理对整条纯文本消息进行响应\n发送内容为 "ping" 会得到回复 "pong"',
      },
      {
        height: 143.99996948242188,
        width: 480.00006103515625,
        id: "^qq4*u=7LW8i@`p}MbNT",
        x: 970,
        y: 350,
        text: '命令处理只处理以命令起始符和命令字符串起始的消息\n命令起始符可在配置选项卡中设置，默认为 "/"\n选择了空命令起始符时可直接匹配以命令字符串起始的消息\n本例中可相应消息如 "/save 1" "/save 2"\n每次调用会返回上一次的参数，首次为 "None"，第二次为 "1"',
      },
      {
        height: 92,
        width: 483.33331298828125,
        id: "[NvN:*-?JE3}m5R}jIm7",
        x: 970,
        y: 510,
        text: "文件存储支持可以将文本或字典存入本地文件\n或从本地文件读出到对应的变量中",
      },
      {
        height: 104.66668701171875,
        width: 402,
        id: "W;2zsU/+VlY54WQsR)5V",
        x: 490,
        y: 570,
        text: "跨平台命令解析预处理由 alconna 插件提供支持\n可以自由配置固定字符串或多种数据类型的命令参数列表\n并在处理流程中取得对应的命令参数使用",
      },
      {
        height: 82.666748046875,
        width: 401.99993896484375,
        id: "^dl/_H.6Ei@c8]zhc)MI",
        x: 490,
        y: 150,
        text: "网络请求支持可以构建GET或POST网络请求\n需要正确配置返回内容的数据类型以支持后续处理",
      },
      {
        height: 58.00006103515625,
        width: 389.99981689453125,
        id: "6ILVtb0f/4J2QpMw?W?u",
        x: 970,
        y: 810,
        text: "定时任务支持可以根据设定时间重复指定的处理操作",
      },
    ],
    blocks: {
      languageVersion: 0,
      blocks: [
        {
          type: "nonebot_on_command",
          id: "!WdCO9=B,k2IY0/Su4|I",
          x: 970,
          y: 50,
          fields: { COMMAND: "save", TOME: true },
          inputs: {
            HANDLE: {
              block: {
                type: "variables_set",
                id: "9_AQ_@)mWU$=2GkYbT-d",
                fields: { VAR: { id: "VSvr3AeHEP),5NB5v$+;" } },
                inputs: {
                  VALUE: {
                    block: {
                      type: "store_load_json",
                      id: "3~H`IY?A(%(Bb+8/wL3c",
                      fields: { FILE: "save.json" },
                    },
                  },
                },
                next: {
                  block: {
                    type: "variables_set",
                    id: "gc.{0S@R!yzBky.dRf/T",
                    fields: { VAR: { id: "dS|cq^n0{Ep#B]f*RtAH" } },
                    inputs: {
                      VALUE: {
                        block: {
                          type: "dicts_get",
                          id: "R5``m]FzB+yBPW1W2`]$",
                          fields: { KEY: "last" },
                          inputs: {
                            DICT: {
                              block: {
                                type: "variables_get",
                                id: "[Ws*B$JWgLY]BeT`^_=]",
                                fields: { VAR: { id: "VSvr3AeHEP),5NB5v$+;" } },
                              },
                            },
                          },
                        },
                      },
                    },
                    next: {
                      block: {
                        type: "nonebot_send",
                        id: "2VEO#b:zwo|#8!@y%P}q",
                        fields: { FINISH: false },
                        inputs: {
                          MESSAGE: {
                            block: {
                              type: "text_join",
                              id: "~Va]uDcID[2P5@n3z{pe",
                              extraState: { itemCount: 2 },
                              inputs: {
                                ADD0: {
                                  block: {
                                    type: "text",
                                    id: "3Aw,]xK/YxeE+S`=:}vc",
                                    fields: { TEXT: "last: " },
                                  },
                                },
                                ADD1: {
                                  block: {
                                    type: "variables_get",
                                    id: "hF5`vj~{OC2uF+^}Q8yk",
                                    fields: {
                                      VAR: { id: "dS|cq^n0{Ep#B]f*RtAH" },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                        next: {
                          block: {
                            type: "dicts_set",
                            id: "B3Wx%a7x=Pp95taY%.*K",
                            fields: { KEY: "last" },
                            inputs: {
                              DICT: {
                                block: {
                                  type: "variables_get",
                                  id: "7iF8)`YtA.s.-@v_dYNo",
                                  fields: {
                                    VAR: { id: "VSvr3AeHEP),5NB5v$+;" },
                                  },
                                },
                              },
                              VALUE: {
                                block: {
                                  type: "nonebot_param_text",
                                  id: "{eYrM|C4so41hXY4~MtD",
                                },
                              },
                            },
                            next: {
                              block: {
                                type: "store_save_json",
                                id: "sOck!o^D;xHPwNdX0v;s",
                                fields: { FILE: "save.json" },
                                inputs: {
                                  DICT: {
                                    block: {
                                      type: "variables_get",
                                      id: "Z8a4Wo4ae#)plFG}S:6B",
                                      fields: {
                                        VAR: { id: "VSvr3AeHEP),5NB5v$+;" },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          type: "nonebot_on_message",
          id: "rJ[.=4k)POkDVT?Wz%zD",
          x: 70,
          y: 50,
          fields: { TOME: false },
          inputs: {
            HANDLE: {
              block: {
                type: "controls_if",
                id: "SBBb-4DL]Ofg,o5,lix9",
                extraState: { elseIfCount: 2 },
                inputs: {
                  IF0: {
                    block: {
                      type: "logic_compare",
                      id: "3KiI-ePNeWs/tZ.xUQd*",
                      fields: { OP: "EQ" },
                      inputs: {
                        A: {
                          block: {
                            type: "nonebot_param_text",
                            id: "}:vuF-QZzN6NL{}`jW87",
                          },
                        },
                        B: {
                          block: {
                            type: "text",
                            id: ":R-~fjy%Xs,HExpeH$jd",
                            fields: { TEXT: "ping" },
                          },
                        },
                      },
                    },
                  },
                  DO0: {
                    block: {
                      type: "nonebot_send",
                      id: "zyjiCMiE87Wm_gt~i6dj",
                      fields: { FINISH: true },
                      inputs: {
                        MESSAGE: {
                          block: {
                            type: "text",
                            id: "NpK-srq00|eB:+v#I5t?",
                            fields: { TEXT: "pong" },
                          },
                        },
                      },
                    },
                  },
                  IF1: {
                    block: {
                      type: "logic_compare",
                      id: "!Q{^KS]tk}knY$0loSbK",
                      fields: { OP: "EQ" },
                      inputs: {
                        A: {
                          block: {
                            type: "nonebot_param_text",
                            id: "R3^-rcLn~gkf#eJO//|S",
                          },
                        },
                        B: {
                          block: {
                            type: "text",
                            id: "L44H6xsB#jzeNUodNS3*",
                            fields: { TEXT: "plugin" },
                          },
                        },
                      },
                    },
                  },
                  DO1: {
                    block: {
                      type: "variables_set",
                      id: "}8cI$-ju]d/4jbudI(%?",
                      fields: { VAR: { id: "i7%fQRO5s:HNPn!Egg/!" } },
                      inputs: {
                        VALUE: {
                          block: {
                            type: "request_get",
                            id: "i%$0*PV*Q}aD.4uiq,Xk",
                            fields: { TYPE: "list", TIMEOUT: 60 },
                            inputs: {
                              URL: {
                                block: {
                                  type: "text",
                                  id: "ju`#!lmdA,,j~GxD)LdV",
                                  fields: {
                                    TEXT: "https://registry.nonebot.dev/plugins.json",
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                      next: {
                        block: {
                          type: "nonebot_send",
                          id: "I]HVejYi1XMiH7@L#%fa",
                          fields: { FINISH: true },
                          inputs: {
                            MESSAGE: {
                              block: {
                                type: "text_join",
                                id: "TBv3^GAlbgL-)1DGdyI`",
                                extraState: { itemCount: 2 },
                                inputs: {
                                  ADD0: {
                                    block: {
                                      type: "text",
                                      id: "Nr4jVV3k@]@q._B7$O+_",
                                      fields: { TEXT: "当前插件数量为：" },
                                    },
                                  },
                                  ADD1: {
                                    block: {
                                      type: "lists_length",
                                      id: "e8GR1^[w[S5c,=vs`nU(",
                                      inputs: {
                                        VALUE: {
                                          block: {
                                            type: "variables_get",
                                            id: "@^l~%MD,Wm9RLJ|N%Ys4",
                                            fields: {
                                              VAR: {
                                                id: "i7%fQRO5s:HNPn!Egg/!",
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  IF2: {
                    block: {
                      type: "logic_compare",
                      id: "o|dYI,`Cy)u6gPCrP]!r",
                      fields: { OP: "EQ" },
                      inputs: {
                        A: {
                          block: {
                            type: "nonebot_param_text",
                            id: "2_xq)Q*KP{j0d0ZG1y`Z",
                          },
                        },
                        B: {
                          block: {
                            type: "text",
                            id: "S:8I/+[}C@_cjY*@_dhE",
                            fields: { TEXT: "random" },
                          },
                        },
                      },
                    },
                  },
                  DO2: {
                    block: {
                      type: "nonebot_send",
                      id: "[QQQ:Wu;b)hi|C_=p[T(",
                      fields: { FINISH: false },
                      inputs: {
                        MESSAGE: {
                          block: {
                            type: "text_join",
                            id: "NXK(kC#{y^-Wvr2a0_+;",
                            extraState: { itemCount: 1 },
                            inputs: {
                              ADD0: {
                                block: {
                                  type: "variables_get",
                                  id: "-f7]+j)Y],;g0.nxr[Kr",
                                  fields: {
                                    VAR: { id: "dm}-^1M|xx~4#6g~~7e#" },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          type: "nonebot_on_alconna",
          id: "|Fu4X1(2DR;,y_a_tXuZ",
          x: 70,
          y: 610,
          extraState: { itemCount: 3 },
          fields: { COMMAND: "command", TOME: true },
          inputs: {
            ARG0: {
              block: {
                type: "alconna_const",
                id: "F]W)`U.)2h|Wy@y[#X1A",
                fields: { TEXT: "test" },
              },
            },
            ARG1: {
              block: {
                type: "alconna_arg",
                id: "86},)_bY]o`5w*GGsg+o",
                fields: { NAME: "name", TYPE: "str" },
              },
            },
            ARG2: {
              block: {
                type: "alconna_arg",
                id: "}qB@y=xly_6U~?~cTvl7",
                fields: { NAME: "number", TYPE: "int" },
              },
            },
            HANDLE: {
              block: {
                type: "nonebot_send",
                id: "IG0GrnVygzO2N+qv~Wav",
                fields: { FINISH: false },
                inputs: {
                  MESSAGE: {
                    block: {
                      type: "text_join",
                      id: "BYK7GDru]?*p60E0ED!}",
                      extraState: { itemCount: 2 },
                      inputs: {
                        ADD0: {
                          block: {
                            type: "text",
                            id: "Lz;^)x7Ry)aC`;jz(n_[",
                            fields: { TEXT: "参数name为：" },
                          },
                        },
                        ADD1: {
                          block: {
                            type: "alconna_arg_get",
                            id: "kjv.p]ZKq?$Ay!@|(GZz",
                            extraState: { name: "name" },
                            fields: { NAME: "name" },
                          },
                        },
                      },
                    },
                  },
                },
                next: {
                  block: {
                    type: "nonebot_send",
                    id: "Df,m4`}7lCDAVw=}TxLl",
                    fields: { FINISH: false },
                    inputs: {
                      MESSAGE: {
                        block: {
                          type: "text_join",
                          id: ",ujwQq~#eb/c(q9#mKnW",
                          extraState: { itemCount: 2 },
                          inputs: {
                            ADD0: {
                              block: {
                                type: "text",
                                id: "TJ?2:7Q!R$=_eUyD;M8m",
                                fields: { TEXT: "参数number为：" },
                              },
                            },
                            ADD1: {
                              block: {
                                type: "alconna_arg_get",
                                id: "[u:Is_2hXiJap%JWvgl2",
                                extraState: { name: "number" },
                                fields: { NAME: "number" },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          type: "scheduler_add",
          id: "6djmI(1,`~eAj}g=@PXr",
          x: 970,
          y: 650,
          inputs: {
            TIME: {
              block: {
                type: "scheduler_time_interval",
                id: "XCCX[EaW9yKIF;Ck|waX",
                fields: { NUMBER: 10, UNIT: "seconds" },
              },
            },
            ID: {
              block: {
                type: "text",
                id: "@JgyG!7m]+3d#@1GPRaA",
                fields: { TEXT: "refresh_number" },
              },
            },
            HANDLE: {
              block: {
                type: "variables_set",
                id: "iRc7.8GkpN=ZE){MYOG9",
                fields: { VAR: { id: "dm}-^1M|xx~4#6g~~7e#" } },
                inputs: {
                  VALUE: {
                    block: {
                      type: "math_random_float",
                      id: "$oMB|U7+QU_qfCwi,J$j",
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
    variables: [
      { name: "data_dict", id: "VSvr3AeHEP),5NB5v$+;" },
      { name: "last_param", id: "dS|cq^n0{Ep#B]f*RtAH" },
      { name: "plugin_data", id: "i7%fQRO5s:HNPn!Egg/!" },
      { name: "plugin_data2", id: "`a{F^Z`6/mb_37*,mPgL" },
      { name: "random_number", id: "dm}-^1M|xx~4#6g~~7e#" },
    ],
  },
  config: {
    name: "app_demo",
    preset: { name: "console", description: "控制台机器人" },
    port: 8080,
    platform: ["windows", "linux"],
    commandStart: ["/", ""],
    superusers: ["User"],
    kwargs: {},
  },
};
