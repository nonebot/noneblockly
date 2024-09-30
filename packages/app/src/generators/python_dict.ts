import { Order } from "blockly/python";
import * as Blockly from "blockly/core";

import { DictCreateWithBlock, DictGetMultiBlock } from "@/blocks/python_dict";

export const forBlock = Object.create(null);

forBlock["dicts_get"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const dict = generator.valueToCode(block, "DICT", Order.MEMBER) || "{}";
  const key = block.getFieldValue("KEY");
  if (!key) {
    return ["None", Order.ATOMIC];
  }
  const code = `${dict}.get("${key}")`;
  return [code, Order.ATOMIC];
};

forBlock["dicts_get_multi"] = function (
  block: DictGetMultiBlock,
  generator: Blockly.CodeGenerator,
) {
  const dict = generator.valueToCode(block, "DICT", Order.MEMBER) || "{}";
  let code = "";
  let key = block.getFieldValue("KEY0");
  if (!key) {
    return ["None", Order.ATOMIC];
  }
  code = `${dict}.get("${key}")`;
  for (let n = 1; n < block.itemCount_; n++) {
    key = block.getFieldValue("KEY" + n);
    if (key) {
      code = `(${code} or {}).get(${key})`;
    }
  }
  return [code, Order.ATOMIC];
};

forBlock["dicts_set"] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const dict = generator.valueToCode(block, "DICT", Order.MEMBER) || "{}";
  const key = block.getFieldValue("KEY");
  if (!key) {
    return ["None", Order.ATOMIC];
  }
  const value = generator.valueToCode(block, "VALUE", Order.NONE) || "None";
  const code = `${dict}["${key}"] = ${value}\n`;
  return code;
};

forBlock["dicts_create_with"] = function (
  block: DictCreateWithBlock,
  generator: Blockly.CodeGenerator,
) {
  let items = new Array();
  for (let n = 0; n < block.itemCount_; n++) {
    let key = generator.valueToCode(block, "KEY" + n, Order.NONE);
    let value = generator.valueToCode(block, "VALUE" + n, Order.NONE) || "None";
    if (key) {
      items.push(`${key}: ${value}`);
    }
  }
  const code = "{" + items.join(", ") + "}";
  return [code, Order.ATOMIC];
};
