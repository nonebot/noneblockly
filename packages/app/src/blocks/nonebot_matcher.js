import Blockly from "blockly/core";
import { pythonGenerator, Order } from "blockly/python";

Blockly.defineBlocksWithJsonArray([
  {
    type: "nb_on_command",
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
  },
]);

// The following is for the Python generator

pythonGenerator.forBlock["nb_on_command"] = function (block, generator) {
  const text_cmd = block.getFieldValue("CMD");
  const checkbox_to_me = block.getFieldValue("TO_ME") === "TRUE";
  let to_me_statement = "";
  generator.definitions_["from_nonebot_plugin_import_on_command"] =
    "from nonebot.plugin import on_command";
  if (checkbox_to_me) {
    generator.definitions_["from_nonebot_rule_import_on_command"] =
      "from nonebot.rule import to_me";
    to_me_statement = ", rule=to_me()";
  }
  let code = `on_command("${text_cmd}"${to_me_statement})`;
  return [code, Order.NONE];
};
