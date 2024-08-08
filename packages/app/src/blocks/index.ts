import * as Blockly from "blockly/core";

// import "./python_dict.js";
import { nonebotOnCommand } from "./nonebot_matcher";
// import "./nonebot_handle.js";
// import "./nonebot_message.js";

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  nonebotOnCommand,
]);
