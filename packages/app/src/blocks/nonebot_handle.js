import Blockly from "blockly/core";
import { pythonGenerator, Order } from "blockly/python";

Blockly.defineBlocksWithJsonArray([
  {
    type: "nb_handle",
    message0: "事件处理 %1 响应器 %2 %3",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "MATCHER",
        check: "Matcher",
      },
      {
        type: "input_statement",
        name: "HANDLE",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    tooltip: "",
    helpUrl: "",
  },
]);

// The following is for the Python generator

pythonGenerator.forBlock["nb_handle"] = function (block, generator) {
  const value_matcher = generator.valueToCode(block, "MATCHER", Order.ATOMIC);
  const statements_handle =
    generator.statementToCode(block, "HANDLE") || generator.PASS;
  generator.definitions_["from_nonebot_adapters_import_Bot"] =
    "from nonebot.adapters import Bot";
  generator.definitions_["from_nonebot_adapters_import_Event"] =
    "from nonebot.adapters import Event";
  let code = "";
  if (value_matcher) {
    code += `@${value_matcher}.handle()\n`;
    code += `async def _(bot: Bot, event: Event):\n`;
    code += statements_handle;
  }
  return code;
};
