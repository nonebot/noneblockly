import { PythonGenerator, Order } from "blockly/python";
import * as Blockly from "blockly/core";

import { getGlobalStatement } from "./helper";

export const forBlock = Object.create(null);

forBlock["scheduler_add"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const time = generator.valueToCode(block, "TIME", Order.ATOMIC);
  const id = generator.valueToCode(block, "ID", Order.ATOMIC);
  if (time === "" || time === "None" || id === "" || id === "None") {
    return "";
  }
  generator["definitions_"][
    "from nonebot_plugin_apscheduler import scheduler"
  ] = "from nonebot_plugin_apscheduler import scheduler";
  const globalStatement =
    generator.INDENT + getGlobalStatement(block, generator);
  const handleStatement =
    generator.statementToCode(block, "HANDLE") || generator.PASS;
  const code = `@scheduler.scheduled_job(${time}, id=${id})\nasync def _():\n${globalStatement}${handleStatement}\n`;
  return code;
};

forBlock["scheduler_remove"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const id = generator.valueToCode(block, "ID", Order.ATOMIC);
  generator["definitions_"][
    "from nonebot_plugin_apscheduler import scheduler"
  ] = "from nonebot_plugin_apscheduler import scheduler";
  const code = `scheduler.remove_job(${id})\n`;
  return code;
};

forBlock["scheduler_time_interval"] = function (
  block: Blockly.Block,
  _: PythonGenerator,
) {
  const number = block.getFieldValue("NUMBER");
  const unit = block.getFieldValue("UNIT");
  const code = `"interval", ${unit}=${number}`;
  return [code, Order.ATOMIC];
};

forBlock["scheduler_time_cron_daily"] = function (
  block: Blockly.Block,
  _: PythonGenerator,
) {
  const hour = block.getFieldValue("HOUR");
  const minute = block.getFieldValue("MINUTE");
  const second = block.getFieldValue("SECOND");
  const code = `"cron", hour=${hour}, minute=${minute}, second=${second}`;
  return [code, Order.ATOMIC];
};

forBlock["scheduler_time_cron"] = function (
  block: Blockly.Block,
  _: PythonGenerator,
) {
  const month = block.getFieldValue("MONTH");
  const day = block.getFieldValue("DAY");
  const hour = block.getFieldValue("HOUR");
  const minute = block.getFieldValue("MINUTE");
  const second = block.getFieldValue("SECOND");
  const code = `"cron", month=${month}, day=${day}, hour=${hour}, minute=${minute}, second=${second}`;
  return [code, Order.ATOMIC];
};
