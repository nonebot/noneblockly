import * as Blockly from "blockly/core";
import { BlockDefinition } from "blockly/core/blocks";

import { pythonDict } from "./python_dict";
import { nonebotMatcher } from "./nonebot_matcher";
// import "./nonebot_handle.js";
// import "./nonebot_message.js";

// Array of all block definitions
let blockDefinitions: BlockDefinition[] = [];
blockDefinitions = blockDefinitions.concat(pythonDict).concat(nonebotMatcher);

export const blocks =
  Blockly.common.createBlockDefinitionsFromJsonArray(blockDefinitions);
