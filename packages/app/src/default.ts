export const StartBlocks = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: "nonebot_on_command",
        id: "!WdCO9=B,k2IY0/Su4|I",
        x: 150,
        y: 210,
        fields: { COMMAND: "save", TOME: true },
        inputs: {
          HANDLE: {
            block: {
              type: "store_load_json",
              id: "d.$llW7Lq)~KG{Z|h1+B",
              fields: { FILE: "save.json" },
              inputs: {
                DICT: {
                  block: {
                    type: "variables_get",
                    id: "E,j@$a(@v[(]u_R${B+Z",
                    fields: { VAR: { id: "VSvr3AeHEP),5NB5v$+;" } },
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
                              fields: {
                                VAR: { id: "VSvr3AeHEP),5NB5v$+;" },
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
        x: 150,
        y: 30,
        fields: { TOME: false },
        inputs: {
          HANDLE: {
            block: {
              type: "controls_if",
              id: "SBBb-4DL]Ofg,o5,lix9",
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
  ],
};
