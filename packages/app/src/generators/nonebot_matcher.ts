import { Order } from "blockly/python";
import * as Blockly from "blockly/core";

export const forBlock = Object.create(null);

forBlock["nonebot_on_command"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const text_cmd = block.getFieldValue("CMD");
  const checkbox_to_me = block.getFieldValue("TO_ME") === "TRUE";
  let to_me_statement = "";
  generator["definitions_"]["from nonebot.plugin import on_command"] =
    "from nonebot.plugin import on_command";
  if (checkbox_to_me) {
    generator["definitions_"]["from nonebot.rule import to_me"] =
      "from nonebot.rule import to_me";
    to_me_statement = ", rule=to_me()";
  }
  let code = `on_command("${text_cmd}"${to_me_statement})`;
  return [code, Order.NONE];
};
