import * as Blockly from "blockly/core";
import type { BlockDefinition } from "blockly/core/blocks";
import type { BlockSvg } from "blockly/core/block_svg";
import { createPlusField } from "./components/field_plus";
import { createMinusField } from "./components/field_minus";

export const definitions: BlockDefinition[] = [
  {
    type: "nonebot_on_alconna",
    tooltip: "",
    helpUrl: "",
    message0: "跨平台命令解析与处理 %1 命令字符串 %2 仅与我相关 %3 %4 无其他命令参数 %5 %6",
    args0: [
      {
        type: "input_dummy",
        name: "NAME",
      },
      {
        type: "field_input",
        name: "COMMAND",
        text: "hello",
      },
      {
        type: "field_checkbox",
        name: "TOME",
        checked: "FALSE",
      },
      {
        type: "input_dummy",
        name: "PARAMS",
      },
      {
        type: "input_dummy",
        name: "EMPTY",
        align: "RIGHT",
      },
      {
        type: "input_statement",
        name: "HANDLE",
      },
    ],
    colour: 90,
    mutator: "alconna_mutator",
  },
  {
    type: "alconna_const",
    tooltip: "",
    helpUrl: "",
    message0: "固定字符串 %1 %2",
    args0: [
      {
        type: "field_input",
        name: "TEXT",
        text: "help",
      },
      {
        type: "input_dummy",
        name: "PARAMS",
      },
    ],
    output: "arg",
    colour: 120,
  },
  {
    type: "alconna_arg",
    tooltip: "",
    helpUrl: "",
    message0: "参数名 %1 数据类型 %2 %3",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "arg1",
      },
      {
        type: "field_dropdown",
        name: "TYPE",
        options: [
          ["字符串", "str"],
          ["整数", "int"],
          ["浮点数", "float"],
          ["布尔值", "bool"],
        ],
      },
      {
        type: "input_dummy",
        name: "PARAMS",
      },
    ],
    output: "arg",
    colour: 120,
  },
];

/**
 * Type of a 'nonebot_on_alconna' block.
 *
 * @internal
 */
export type AlconnaBlock = BlockSvg & AlconnaMixin;
interface AlconnaMixin extends AlconnaMixinType {
  itemCount_: number;
  topInput_: Blockly.Input | undefined;
}
type AlconnaMixinType = typeof ALCONNA;

const ALCONNA = {
  /**
   * Number of item inputs the block has.
   * @type {number}
   */
  itemCount_: 0,

  /**
   * Creates XML to represent number of text inputs.
   * @returns {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function (this: AlconnaBlock): Element {
    const container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("items", String(this.itemCount_));
    return container;
  },
  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (this: AlconnaBlock, xmlElement: Element) {
    const items = xmlElement.getAttribute("items");
    if (!items) throw new TypeError("element did not have items");
    this.itemCount_ = parseInt(items, 10);
    this.updateShape_();
  },

  /**
   * Returns the state of this block as a JSON serializable object.
   * @returns {{itemCount: number}} The state of this block, ie the item count.
   */
  saveExtraState: function (this: AlconnaBlock): { itemCount: number } {
    return {
      itemCount: this.itemCount_,
    };
  },

  /**
   * Applies the given state to this block.
   * @param {*} state The state to apply to this block, ie the item count.
   */
  loadExtraState: function (this: AlconnaBlock, state: any) {
    const count = state["itemCount"];
    while (this.itemCount_ < count) {
      this.addPart_();
    }
    this.updateShape_();
  },

  /**
   * Adds inputs to the block until it reaches the target number of inputs.
   * @this {Blockly.Block}
   * @private
   */
  updateShape_: function (this: AlconnaBlock) {
    this.updateMinus_();
  },

  /**
   * Callback for the plus image. Adds an input to the end of the block and
   * updates the state of the minus.
   */
  plus: function (this: AlconnaBlock) {
    this.addPart_();
    this.updateMinus_();
  },

  /**
   * Callback for the minus image. Removes an input from the end of the block
   * and updates the state of the minus.
   */
  minus: function (this: AlconnaBlock) {
    if (this.itemCount_ == 0) {
      return;
    }
    this.removePart_();
    this.updateMinus_();
  },

  // To properly keep track of indices we have to increment before/after adding
  // the inputs, and decrement the opposite.
  // Because we want our first input to be ARG0 (not ARG1) we increment after.

  /**
   * Adds an input to the end of the block. If the block currently has no
   * inputs it updates the top 'EMPTY' input to receive a block.
   * @this {Blockly.Block}
   * @private
   */
  addPart_: function (this: AlconnaBlock) {
    const connection = (this.getInput("HANDLE") as Blockly.Input).connection?.targetConnection;
    this.removeInput("HANDLE");
    if (this.itemCount_ == 0) {
      this.removeInput("EMPTY");
      this.topInput_ = this.appendValueInput("ARG" + String(this.itemCount_))
        .setAlign(Blockly.inputs.Align.RIGHT)
        .setCheck("arg")
        .appendField(createPlusField(), "PLUS")
        .appendField(`参数 ${this.itemCount_}`);
    } else {
      this.appendValueInput("ARG" + this.itemCount_)
        .setAlign(Blockly.inputs.Align.RIGHT)
        .setCheck("arg")
        .appendField(`参数 ${this.itemCount_}`);
    }
    this.itemCount_++;
    this.appendStatementInput("HANDLE");
    connection?.reconnect(this, "HANDLE");
  },

  /**
   * Removes an input from the end of the block. If we are removing the last
   * input this updates the block to have an 'EMPTY' top input.
   * @this {Blockly.Block}
   * @private
   */
  removePart_: function (this: AlconnaBlock) {
    this.itemCount_--;
    this.removeInput("ARG" + String(this.itemCount_));
    if (this.itemCount_ == 0) {
      (this.topInput_ as Blockly.Input) = this.appendDummyInput("EMPTY")
        .appendField(createPlusField(), "PLUS")
        .setAlign(Blockly.inputs.Align.RIGHT)
        .appendField("无其他命令参数");
      const connection = (this.getInput("HANDLE") as Blockly.Input).connection?.targetConnection;
      this.removeInput("HANDLE");
      this.appendStatementInput("HANDLE");
      connection?.reconnect(this, "HANDLE");
    }
  },

  /**
   * Makes it so the minus is visible iff there is an input available to remove.
   * @private
   */
  updateMinus_: function (this: AlconnaBlock) {
    const minusField = this.getField("MINUS");
    if (!minusField && this.itemCount_ > 0) {
      this.topInput_?.insertFieldAt(1, createMinusField(), "MINUS");
    } else if (minusField && this.itemCount_ < 1) {
      this.topInput_?.removeField("MINUS");
    }
  },
};

/**
 * Updates the shape of the block to have 0 inputs if no mutation is provided.
 * @this {Blockly.Block}
 */
const ALCONNA_EXTENSION = function (this: AlconnaBlock) {
  this.itemCount_ = 0;
  this.updateShape_();
  this.getInput("EMPTY")?.insertFieldAt(0, createPlusField(), "PLUS");
};

if (Blockly.Extensions.isRegistered("alconna_mutator")) {
  Blockly.Extensions.unregister("alconna_mutator");
}
Blockly.Extensions.registerMutator("alconna_mutator", ALCONNA, ALCONNA_EXTENSION);
