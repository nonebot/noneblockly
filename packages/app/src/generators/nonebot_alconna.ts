import { PythonGenerator, Order } from "blockly/python";
import * as Blockly from "blockly/core";

import { AlconnaBlock } from "@/blocks/nonebot_alconna";

export const forBlock = Object.create(null);

forBlock["nonebot_on_alconna"] = function (block: AlconnaBlock, generator: PythonGenerator) {
  const command = block.getFieldValue("COMMAND");
  const checkbox_tome = block.getFieldValue("TOME") === "TRUE";
  const statements_handle = generator.statementToCode(block, "HANDLE") || generator.PASS;
  // generator["definitions_"]["from nonebot.adapters import Bot"] = "from nonebot.adapters import Bot";
  // generator["definitions_"]["from nonebot.adapters import Event"] = "from nonebot.adapters import Event";
  generator["definitions_"]["from nonebot.matcher import Matcher"] = "from nonebot.matcher import Matcher";
  generator["definitions_"]["from nonebot_plugin_alconna import on_alconna"] =
    "from nonebot_plugin_alconna import on_alconna";
  let tome_statement = "";
  if (checkbox_tome) {
    generator["definitions_"]["from nonebot.rule import to_me"] = "from nonebot.rule import to_me";
    tome_statement = ", rule=to_me()";
  }
  let args: String[] = [];
  let args_matcher = "";
  let args_function = "";
  if (block.itemCount_ != 0) {
    for (let n = 0; n < block.itemCount_; n++) {
      const block_type = block.getInput("ARG" + String(n))?.connection?.targetConnection?.getSourceBlock().type;
      const arg_code = generator.valueToCode(block, "ARG" + String(n), Order.NONE);
      if (block_type === "alconna_const") {
        args_matcher += ` ${arg_code}`;
      } else if (block_type === "alconna_arg") {
        args_matcher += ` {${arg_code}}`;
        args_function += `, ${arg_code}`;
        // get name before `: type`
        args.push(arg_code.split(":")[0]);
      }
    }
  }
  let code = `@on_alconna("${command}${args_matcher}"${tome_statement}).handle()\n`;
  // code += `async def _(matcher: Matcher, bot: Bot, event: Event, message: Annotated[Message, CommandArg()]):\n`;
  code += `async def _(matcher: Matcher${args_function}):\n`;
  code += statements_handle;
  code += "\n";
  return code;
};

forBlock["alconna_const"] = function (block: Blockly.Block, generator: PythonGenerator) {
  const text = block.getFieldValue("TEXT");
  return [text, Order.ATOMIC];
};

forBlock["alconna_arg"] = function (block: Blockly.Block, generator: PythonGenerator) {
  const arg_name = block.getFieldValue("NAME");
  const arg_type = block.getFieldValue("TYPE");
  if (arg_name) {
    return [`${generator.getVariableName("arg_" + arg_name)}: ${arg_type}`, Order.NONE];
  }
  return ["", Order.ATOMIC];
};
