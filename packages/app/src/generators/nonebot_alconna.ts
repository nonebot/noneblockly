import { PythonGenerator, Order } from "blockly/python";
import * as Blockly from "blockly/core";

import { AlconnaBlock, AlconnaArgGetBlock } from "@/blocks/nonebot_alconna";
import { getAlconnaArg } from "@/blocks/fields/alconna_helper";
import { getGlobalStatement } from "./helper";

export const forBlock = Object.create(null);

forBlock["nonebot_on_alconna"] = function (
  block: AlconnaBlock,
  generator: PythonGenerator,
) {
  const command = block.getFieldValue("COMMAND");
  const tomeCheckbox = block.getFieldValue("TOME") === "TRUE";
  const globalStatement =
    generator.INDENT + getGlobalStatement(block, generator);
  const handleStatement =
    generator.statementToCode(block, "HANDLE") || generator.PASS;
  // generator["definitions_"]["from nonebot.adapters import Bot"] = "from nonebot.adapters import Bot";
  // generator["definitions_"]["from nonebot.adapters import Event"] = "from nonebot.adapters import Event";
  generator["definitions_"]["from nonebot.matcher import Matcher"] =
    "from nonebot.matcher import Matcher";
  generator["definitions_"]["from nonebot_plugin_alconna import on_alconna"] =
    "from nonebot_plugin_alconna import on_alconna";
  let tomeStatement = "";
  if (tomeCheckbox) {
    generator["definitions_"]["from nonebot.rule import to_me"] =
      "from nonebot.rule import to_me";
    tomeStatement = ", rule=to_me()";
  }
  let args: String[] = [];
  let argsMatcher = "";
  let argsFunction = "";
  for (let n = 0; n < block.itemCount_; n++) {
    const block_type = block
      .getInput("ARG" + String(n))
      ?.connection?.targetConnection?.getSourceBlock().type;
    const argCode = generator.valueToCode(block, "ARG" + String(n), Order.NONE);
    if (block_type === "alconna_const") {
      argsMatcher += ` ${argCode}`;
    } else if (block_type === "alconna_arg") {
      argsMatcher += ` {${argCode}}`;
      argsFunction += `, ${argCode}`;
      // get name before `: type`
      args.push(argCode.split(":")[0]);
    }
  }
  let code = `@on_alconna("${command}${argsMatcher}"${tomeStatement}).handle()\n`;
  // code += `async def _(matcher: Matcher, bot: Bot, event: Event, message: Annotated[Message, CommandArg()]):\n`;
  code += `async def _(matcher: Matcher${argsFunction}):\n${globalStatement}${handleStatement}\n`;
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
  let name = block.getFieldValue("NAME");
  const args = getAlconnaArg(block);
  let options = new Array();
  // If the block is not initialized, it is reloading from saved
  // Should rebuild the dropdown list and set the name to the saved name `block.name_`
  if (!block.isInitialized_ && block.name_ !== "") {
    name = block.name_;
    block.isInitialized_ = true;
    // Make sure the selected value is the first one of the dropdown list
    // Due to the dynamic dropdowns are not responding to set value calls correctly
    // https://github.com/google/blockly/issues/3099
    // This will also cause warnings in console:
    // `Cannot set the dropdown's value to an unavailable option.`
    if (args.indexOf(name) !== -1) {
      options.push([name, name]);
    }
    args.forEach((arg) => {
      if (arg !== name) {
        options.push([arg, arg]);
      }
    });
    this.removeInput("PARAMS");
    this.setWarningText("");
    this.appendDummyInput("PARAMS")
      ?.appendField("获取参数")
      .appendField(new Blockly.FieldDropdown(options), "NAME");
  } else {
    // If the block is initialized, update the saved name and rebuild the dropdown list
    args.forEach((arg) => {
      options.push([arg, arg]);
    });
    block.name_ = name;
  }
  if (args.length === 0) {
    this.removeInput("PARAMS");
    this.setWarningText("请放置在“跨平台命令处理”中使用");
    this.appendDummyInput("PARAMS")
      .appendField("获取参数")
      .appendField(new Blockly.FieldDropdown([["-", ""]]), "NAME");
    return ["", Order.ATOMIC];
  }
  if (!args.find((arg) => arg === name)) {
    this.removeInput("PARAMS");
    this.setWarningText("");
    this.appendDummyInput("PARAMS")
      ?.appendField("获取参数")
      .appendField(new Blockly.FieldDropdown(options), "NAME");
  }
  if (name) {
    return [generator.getVariableName("arg_" + name), Order.NONE];
  }
  return ["", Order.ATOMIC];
};
