import { Order } from "blockly/python";
import * as Blockly from "blockly/core";

import { DictCreateWithBlock } from "@/blocks/python_dict";

export const forBlock = Object.create(null);

forBlock["dicts_get"] = function (block: Blockly.Block, generator: Blockly.CodeGenerator) {
  const dict = generator.valueToCode(block, "DICT", Order.MEMBER) || "{}";
  const key = block.getFieldValue("KEY");
  if (!key) {
    return ["None", Order.ATOMIC];
  }
  const code = `${dict}.get("${key}")`;
  return [code, Order.ATOMIC];
};

forBlock["dicts_set"] = function (block: Blockly.Block, generator: Blockly.CodeGenerator) {
  const dict = generator.valueToCode(block, "DICT", Order.MEMBER) || "{}";
  const key = block.getFieldValue("KEY");
  if (!key) {
    return ["None", Order.ATOMIC];
  }
  const value = generator.valueToCode(block, "VALUE", Order.NONE) || "None";
  const code = `${dict}["${key}"] = ${value}\n`;
  return code;
};

forBlock["dicts_create_with"] = function (block: DictCreateWithBlock, generator: Blockly.CodeGenerator) {
  let items = new Array(block.itemCount_);
  for (let n = 0; n < block.itemCount_; n++) {
    let key = generator.valueToCode(block, "KEY" + n, Order.NONE) || "None";
    let value = generator.valueToCode(block, "VALUE" + n, Order.NONE) || "None";
    items[n] = key + ": " + value;
  }
  const code = "{" + items.join(", ") + "}";
  return [code, Order.ATOMIC];
};
