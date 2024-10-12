import { PythonGenerator, Order } from "blockly/python";
import * as Blockly from "blockly/core";

export const forBlock = Object.create(null);

forBlock["request_get"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const url = generator.valueToCode(block, "URL", Order.ATOMIC);
  const params = generator.valueToCode(block, "PARAMS", Order.ATOMIC) || "None";
  const headers =
    generator.valueToCode(block, "HEADERS", Order.ATOMIC) || "None";
  const type = block.getFieldValue("TYPE");
  const timeout = block.getFieldValue("TIMEOUT");
  if (url === "" || url === "None") {
    return ["None", Order.ATOMIC];
  }
  generator["definitions_"]["from nonebot import get_driver"] =
    "from nonebot import get_driver";
  generator["definitions_"]["from nonebot.drivers import Request"] =
    "from nonebot.drivers import Request";
  generator["definitions_"]["from nonebot.drivers import HTTPClientMixin"] =
    "from nonebot.drivers import HTTPClientMixin";
  generator["definitions_"]["nonebot_request_driver"] =
    'driver = get_driver() \n\
if not isinstance(driver, HTTPClientMixin): \n\
    raise RuntimeError( \n\
        f"Current driver {driver} does not support http client requests!" \n\
)';
  const request = `Request("GET", ${url}, params=${params}, headers=${headers}, timeout=${timeout})`;
  const content = `(await driver.request(${request})).content`;
  let code = content;
  if (type === "dict") {
    generator["definitions_"]["import json"] = "import json";
    code = `json.loads(${content} or "{}")`;
  }
  return [code, Order.ATOMIC];
};

forBlock["request_post"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const code = `\n`;
  return [code, Order.ATOMIC];
};
