export const nonebotOnCommand = {
  type: "nonebot_on_command",
  message0: "创建指令响应器 %1 %2 与我相关 %3",
  args0: [
    {
      type: "field_input",
      name: "CMD",
      text: "指令",
    },
    {
      type: "input_dummy",
    },
    {
      type: "field_checkbox",
      name: "TO_ME",
      checked: false,
    },
  ],
  inputsInline: true,
  output: "Matcher",
  colour: 20,
  tooltip:
    "请在第一个格子中填写命令触发词；若勾选“与我相关”，只有在私聊、群聊中@或回复、消息以机器人名字开始或结束时会触发",
  helpUrl: "https://nonebot.dev/docs/next/advanced/matcher#command",
};
