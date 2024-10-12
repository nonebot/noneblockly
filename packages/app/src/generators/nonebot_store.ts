import { PythonGenerator, Order } from "blockly/python";
import * as Blockly from "blockly/core";

export const forBlock = Object.create(null);

forBlock["store_save_json"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const dict = generator.valueToCode(block, "DICT", Order.ATOMIC);
  const file = block.getFieldValue("FILE");
  generator["definitions_"]["import json"] = "import json";
  generator["definitions_"]["import nonebot_plugin_localstore as store"] =
    "import nonebot_plugin_localstore as store";
  const code = `store.get_plugin_data_file("${file}").write_text(json.dumps(${dict}))\n`;
  return code;
};

forBlock["store_load_json"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const file = block.getFieldValue("FILE");
  generator["definitions_"]["import json"] = "import json";
  generator["definitions_"]["import nonebot_plugin_localstore as store"] =
    "import nonebot_plugin_localstore as store";
  const code = `json.loads(store.get_plugin_data_file("${file}").read_text() if store.get_plugin_data_file("${file}").exists() else "{}")`;
  return [code, Order.ATOMIC];
};

forBlock["store_save_text"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const text = generator.valueToCode(block, "TEXT", Order.ATOMIC);
  const file = block.getFieldValue("FILE");
  generator["definitions_"]["import nonebot_plugin_localstore as store"] =
    "import nonebot_plugin_localstore as store";
  const code = `store.get_plugin_data_file("${file}").write_text(${text})\n`;
  return code;
};

forBlock["store_load_text"] = function (
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const file = block.getFieldValue("FILE");
  generator["definitions_"]["import json"] = "import json";
  generator["definitions_"]["import nonebot_plugin_localstore as store"] =
    "import nonebot_plugin_localstore as store";
  const code = `store.get_plugin_data_file("${file}").read_text() if store.get_plugin_data_file("${file}").exists() else ""`;
  return [code, Order.ATOMIC];
};
