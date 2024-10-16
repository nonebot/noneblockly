import { PythonGenerator, Order } from "blockly/python";
import * as Blockly from "blockly/core";

import { AlconnaBlock, AlconnaArgGetBlock } from "@/blocks/nonebot_alconna";
import { getAlconnaArg } from "@/blocks/fields/alconna_helper";

export const forBlock = Object.create(null);

forBlock["nonebot_on_alconna"] = function (
  block: AlconnaBlock,
  generator: PythonGenerator,
) {
  const command = block.getFieldValue("COMMAND");
  const checkbox_tome = block.getFieldValue("TOME") === "TRUE";
  const statement_handle =
    generator.statementToCode(block, "HANDLE") || generator.PASS;
  // generator["definitions_"]["from nonebot.adapters import Bot"] = "from nonebot.adapters import Bot";
  // generator["definitions_"]["from nonebot.adapters import Event"] = "from nonebot.adapters import Event";
  generator["definitions_"]["from nonebot.matcher import Matcher"] =
    "from nonebot.matcher import Matcher";
  generator["definitions_"]["from nonebot_plugin_alconna import on_alconna"] =
    "from nonebot_plugin_alconna import on_alconna";
  let tome_statement = "";
  if (checkbox_tome) {
    generator["definitions_"]["from nonebot.rule import to_me"] =
      "from nonebot.rule import to_me";
    tome_statement = ", rule=to_me()";
  }
  let args: String[] = [];
  let args_matcher = "";
  let args_function = "";
  for (let n = 0; n < block.itemCount_; n++) {
    const block_type = block
      .getInput("ARG" + String(n))
      ?.connection?.targetConnection?.getSourceBlock().type;
    const arg_code = generator.valueToCode(
      block,
      "ARG" + String(n),
      Order.NONE,
    );
    if (block_type === "alconna_const") {
      args_matcher += ` ${arg_code}`;
    } else if (block_type === "alconna_arg") {
      args_matcher += ` {${arg_code}}`;
      args_function += `, ${arg_code}`;
      // get name before `: type`
      args.push(arg_code.split(":")[0]);
    }
  }
  let code = `@on_alconna("${command}${args_matcher}"${tome_statement}).handle()\n`;
  // code += `async def _(matcher: Matcher, bot: Bot, event: Event, message: Annotated[Message, CommandArg()]):\n`;
  code += `async def _(matcher: Matcher${args_function}):\n`;
  code += statement_handle;
  code += "\n";
  return code;
};

forBlock["alconna_const"] = function (
  block: Blockly.Block,
  _: PythonGenerator,
) {
  const text = block.getFieldValue("TEXT");
  return [text, Order.ATOMIC];
};

forBlock["alconna_arg"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const name = block.getFieldValue("NAME");
  const type = block.getFieldValue("TYPE");
  if (name) {
    return [`${generator.getVariableName("arg_" + name)}: ${type}`, Order.NONE];
  }
  return ["", Order.ATOMIC];
};

forBlock["alconna_arg_get"] = function (
  block: AlconnaArgGetBlock,
  generator: PythonGenerator,
) {
  // This generator will also update the dropdown list
  let name_real = block.getFieldValue("NAME");
  const args = getAlconnaArg(block);
  let options = new Array();
  if (!block.isInitialized_ && block.name_ !== "") {
    // Read from saved
    name_real = block.name_;
    block.isInitialized_ = true;
    if (args.indexOf(name_real) !== -1) {
      options.push([name_real, name_real]);
    }
    args.forEach((arg) => {
      if (arg !== name_real) {
        options.push([arg, arg]);
      }
    });
    this.removeInput("PARAMS");
    this.setWarningText("");
    this.appendDummyInput("PARAMS")
      ?.appendField("获取参数")
      .appendField(new Blockly.FieldDropdown(options), "NAME");
  } else {
    args.forEach((arg) => {
      options.push([arg, arg]);
    });
  }
  if (args.length === 0) {
    this.removeInput("PARAMS");
    this.setWarningText("请放置在“跨平台命令处理”中使用");
    this.appendDummyInput("PARAMS")
      .appendField("获取参数")
      .appendField(new Blockly.FieldDropdown([["-", ""]]), "NAME");
    return ["", Order.ATOMIC];
  }
  if (!args.find((arg) => arg === name_real)) {
    this.removeInput("PARAMS");
    this.setWarningText("");
    this.appendDummyInput("PARAMS")
      ?.appendField("获取参数")
      .appendField(new Blockly.FieldDropdown(options), "NAME");
  }
  if (name_real) {
    return [generator.getVariableName("arg_" + name_real), Order.NONE];
  }
  return ["", Order.ATOMIC];
};
