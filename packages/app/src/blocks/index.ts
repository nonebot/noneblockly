import * as Blockly from "blockly/core";
import { BlockDefinition } from "blockly/core/blocks";

import { pythonDict } from "./python_dict";
import { definitions as nonebotBasic } from "./nonebot_basic";
import { definitions as nonebotAlconna } from "./nonebot_alconna";
import { definitions as nonebotStore } from "./nonebot_store";
import { definitions as nonebotRequest } from "./nonebot_request";

// Array of all block definitions
let blockDefinitions: BlockDefinition[] = [];
blockDefinitions = blockDefinitions
  .concat(pythonDict)
  .concat(nonebotBasic)
  .concat(nonebotAlconna)
  .concat(nonebotStore)
  .concat(nonebotRequest);

export const blocks =
  Blockly.common.createBlockDefinitionsFromJsonArray(blockDefinitions);
