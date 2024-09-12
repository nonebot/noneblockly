import { PythonGenerator, Order } from "blockly/python";
import * as Blockly from "blockly/core";

export const forBlock = Object.create(null);

forBlock["nonebot_on_message"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const checkbox_tome = block.getFieldValue("TOME") === "TRUE";
  const statements_handle =
    generator.statementToCode(block, "HANDLE") || generator.PASS;
  generator["definitions_"]["from typing import Annotated"] =
    "from typing import Annotated";
  // generator["definitions_"]["from nonebot.adapters import Bot"] = "from nonebot.adapters import Bot";
  // generator["definitions_"]["from nonebot.adapters import Event"] = "from nonebot.adapters import Event";
  generator["definitions_"]["from nonebot.matcher import Matcher"] =
    "from nonebot.matcher import Matcher";
  generator["definitions_"]["from nonebot.adapters import Message"] =
    "from nonebot.adapters import Message";
  generator["definitions_"]["from nonebot.params import EventMessage"] =
    "from nonebot.params import EventMessage";
  generator["definitions_"]["from nonebot.plugin import on_message"] =
    "from nonebot.plugin import on_message";
  let tome_statement = "";
  if (checkbox_tome) {
    generator["definitions_"]["from nonebot.rule import to_me"] =
      "from nonebot.rule import to_me";
    tome_statement = "rule=to_me()";
  }
  let code = `@on_message(${tome_statement}).handle()\n`;
  // code += `async def _(matcher: Matcher, bot: Bot, event: Event, message: Annotated[Message, EventMessage()]):\n`;
  code += `async def _(matcher: Matcher, message: Annotated[Message, EventMessage()]):\n`;
  code += statements_handle;
  code += "\n";
  return code;
};

forBlock["nonebot_on_command"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const text_command = block.getFieldValue("COMMAND");
  const checkbox_tome = block.getFieldValue("TOME") === "TRUE";
  const statements_handle =
    generator.statementToCode(block, "HANDLE") || generator.PASS;
  generator["definitions_"]["from typing import Annotated"] =
    "from typing import Annotated";
  // generator["definitions_"]["from nonebot.adapters import Bot"] = "from nonebot.adapters import Bot";
  // generator["definitions_"]["from nonebot.adapters import Event"] = "from nonebot.adapters import Event";
  generator["definitions_"]["from nonebot.matcher import Matcher"] =
    "from nonebot.matcher import Matcher";
  generator["definitions_"]["from nonebot.adapters import Message"] =
    "from nonebot.adapters import Message";
  generator["definitions_"]["from nonebot.params import CommandArg"] =
    "from nonebot.params import CommandArg";
  generator["definitions_"]["from nonebot.plugin import on_command"] =
    "from nonebot.plugin import on_command";
  let tome_statement = "";
  if (checkbox_tome) {
    generator["definitions_"]["from nonebot.rule import to_me"] =
      "from nonebot.rule import to_me";
    tome_statement = ", rule=to_me()";
  }
  let code = `@on_command("${text_command}"${tome_statement}).handle()\n`;
  // code += `async def _(matcher: Matcher, bot: Bot, event: Event, message: Annotated[Message, CommandArg()]):\n`;
  code += `async def _(matcher: Matcher, message: Annotated[Message, CommandArg()]):\n`;
  code += statements_handle;
  code += "\n";
  return code;
};

forBlock["nonebot_param_text"] = function () {
  const code = "message.extract_plain_text()";
  return [code, Order.NONE];
};

forBlock["nonebot_send"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const message = generator.valueToCode(block, "MESSAGE", Order.ATOMIC);
  const checkbox_tome = block.getFieldValue("FINISH") === "TRUE";
  if (checkbox_tome) {
    return `await matcher.finish(${message})\n`;
  } else {
    return `await matcher.send(${message})\n`;
  }
};
