import * as Blockly from "blockly/core";
import type { BlockDefinition } from "blockly/core/blocks";
import type { BlockSvg } from "blockly/core/block_svg";

import { createPlusField } from "./fields/field_plus";
import { createMinusField } from "./fields/field_minus";

export const pythonDict: BlockDefinition[] = [
  {
    type: "dicts_create_with",
    message0: "创建字典 %1 空字典 %2",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_dummy",
        name: "EMPTY",
        align: "RIGHT",
      },
    ],
    output: "dict",
    tooltip: "",
    helpUrl: "",
    mutator: "dict_create_with_mutator",
    colour: 0,
    // style: "dict_blocks",
  },
  {
    type: "dicts_get",
    message0: "从字典 %1 中取键 %2 的值",
    args0: [
      {
        type: "input_value",
        name: "DICT",
        check: "dict",
      },
      {
        type: "field_input",
        name: "KEY",
        text: "key",
      },
    ],
    output: null,
    inputsInline: true,
    tooltip: "",
    helpUrl: "",
    colour: 0,
    // style: "dict_blocks",
  },
  {
    type: "dicts_get_multi",
    message0: "从字典 %1 连续取值 %2 %3",
    args0: [
      {
        type: "input_value",
        name: "DICT",
        check: "dict",
      },
      {
        type: "input_dummy",
        name: "TOOLS",
      },
      {
        type: "input_dummy",
        name: "KEYS",
      },
    ],
    output: null,
    inputsInline: true,
    tooltip: "",
    helpUrl: "",
    mutator: "dict_get_multi_mutator",
    colour: 0,
    // style: "dict_blocks",
  },
  {
    type: "dicts_set",
    message0: "设置字典 %1 键 %2 的值为 %3",
    args0: [
      {
        type: "input_value",
        name: "DICT",
        check: "dict",
      },
      {
        type: "field_input",
        name: "KEY",
        text: "key",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    inputsInline: true,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
    colour: 0,
    // style: "dict_blocks",
  },
];

/**
 * Type of a 'dicts_create_with' block.
 *
 * @internal
 */
export type DictCreateWithBlock = BlockSvg & DictCreateWithMixin;
interface DictCreateWithMixin extends DictCreateWithMixinType {
  itemCount_: number;
  topInput_: Blockly.Input | undefined;
}
type DictCreateWithMixinType = typeof DICTS_CREATE_WITH;

const DICTS_CREATE_WITH = {
  /**
   * Number of item inputs the block has.
   * @type {number}
   */
  itemCount_: 0,

  /**
   * Create XML to represent list inputs.
   * Backwards compatible serialization implementation.
   */
  mutationToDom: function (this: DictCreateWithBlock): Element {
    const container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("items", String(this.itemCount_));
    return container;
  },

  /**
   * Parse XML to restore the list inputs.
   * Backwards compatible serialization implementation.
   *
   * @param container XML storage element.
   */
  domToMutation: function (this: DictCreateWithBlock, xmlElement: Element) {
    const items = xmlElement.getAttribute("items");
    if (!items) throw new TypeError("element did not have items");
    this.itemCount_ = parseInt(items, 10);
    this.updateShape_();
  },

  /**
   * Returns the state of this block as a JSON serializable object.
   *
   * @returns The state of this block, ie the item count.
   */
  saveExtraState: function (this: DictCreateWithBlock): { itemCount: number } {
    return {
      itemCount: this.itemCount_,
    };
  },

  /**
   * Applies the given state to this block.
   *
   * @param state The state to apply to this block, ie the item count.
   */
  loadExtraState: function (this: DictCreateWithBlock, state: any) {
    const count = state["itemCount"];
    while (this.itemCount_ < count) {
      this.addPart_();
    }
    this.updateShape_();
  },

  /**
   * Modify this block to have the correct number of inputs.
   */
  updateShape_: function (this: DictCreateWithBlock) {
    this.updateMinus_();
  },

  /**
   * Callback for the plus image. Adds an input to the end of the block and
   * updates the state of the minus.
   */
  plus: function (this: DictCreateWithBlock) {
    this.addPart_();
    this.updateMinus_();
  },

  /**
   * Callback for the minus image. Removes an input from the end of the block
   * and updates the state of the minus.
   */
  minus: function (this: DictCreateWithBlock) {
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
  addPart_: function (this: DictCreateWithBlock) {
    if (this.itemCount_ == 0) {
      this.removeInput("EMPTY");
      this.topInput_ = this.appendValueInput("KEY" + String(this.itemCount_))
        .setAlign(Blockly.inputs.Align.RIGHT)
        .appendField(createPlusField(), "PLUS")
        .appendField(`键 ${this.itemCount_}`);
      this.appendValueInput("VALUE" + String(this.itemCount_))
        .setAlign(Blockly.inputs.Align.RIGHT)
        .appendField(`值 ${this.itemCount_}`);
    } else {
      this.appendValueInput("KEY" + String(this.itemCount_))
        .setAlign(Blockly.inputs.Align.RIGHT)
        .appendField(`键 ${this.itemCount_}`);
      this.appendValueInput("VALUE" + String(this.itemCount_))
        .setAlign(Blockly.inputs.Align.RIGHT)
        .appendField(`值 ${this.itemCount_}`);
    }
    this.itemCount_++;
  },

  /**
   * Removes an input from the end of the block. If we are removing the last
   * input this updates the block to have an 'EMPTY' top input.
   * @this {Blockly.Block}
   * @private
   */
  removePart_: function (this: DictCreateWithBlock) {
    this.itemCount_--;
    this.removeInput("KEY" + String(this.itemCount_));
    this.removeInput("VALUE" + String(this.itemCount_));
    if (this.itemCount_ == 0) {
      (this.topInput_ as Blockly.Input) = this.appendDummyInput("EMPTY")
        .appendField(createPlusField(), "PLUS")
        .setAlign(Blockly.inputs.Align.RIGHT)
        .appendField("空字典");
    }
  },

  /**
   * Makes it so the minus is visible iff there is an input available to remove.
   * @private
   */
  updateMinus_: function (this: DictCreateWithBlock) {
    const minusField = this.getField("MINUS");
    if (!minusField && this.itemCount_ > 0) {
      this.topInput_?.insertFieldAt(1, createMinusField(), "MINUS");
    } else if (minusField && this.itemCount_ < 1) {
      this.topInput_?.removeField("MINUS");
    }
  },
};

const DICTS_CREATE_WITH_EXTENSION = function (this: DictCreateWithBlock) {
  this.itemCount_ = 0;
  this.updateShape_();
  this.getInput("EMPTY")?.insertFieldAt(0, createPlusField(), "PLUS");
};

/**
 * Type of a 'dicts_get_multi' block.
 *
 * @internal
 */
export type DictGetMultiBlock = BlockSvg & DictGetMultiMixin;
interface DictGetMultiMixin extends DictGetMultiMixinType {
  itemCount_: number;
}
type DictGetMultiMixinType = typeof DICTS_GET_MULTI;

const DICTS_GET_MULTI = {
  /**
   * Number of item inputs the block has.
   * @type {number}
   */
  itemCount_: 1,

  /**
   * Create XML to represent list inputs.
   * Backwards compatible serialization implementation.
   */
  mutationToDom: function (this: DictGetMultiBlock): Element {
    const container = Blockly.utils.xml.createElement("mutation");
    container.setAttribute("items", String(this.itemCount_));
    return container;
  },

  /**
   * Parse XML to restore the list inputs.
   * Backwards compatible serialization implementation.
   *
   * @param container XML storage element.
   */
  domToMutation: function (this: DictGetMultiBlock, xmlElement: Element) {
    const items = xmlElement.getAttribute("items");
    if (!items) throw new TypeError("element did not have items");
    this.itemCount_ = parseInt(items, 10);
    this.updateShape_();
  },

  /**
   * Returns the state of this block as a JSON serializable object.
   *
   * @returns The state of this block, ie the item count.
   */
  saveExtraState: function (this: DictGetMultiBlock): { itemCount: number } {
    return {
      itemCount: this.itemCount_,
    };
  },

  /**
   * Applies the given state to this block.
   *
   * @param state The state to apply to this block, ie the item count.
   */
  loadExtraState: function (this: DictGetMultiBlock, state: any) {
    const count = state["itemCount"];
    while (this.itemCount_ < count) {
      this.addPart_();
    }
    this.updateShape_();
  },

  /**
   * Modify this block to have the correct number of inputs.
   */
  updateShape_: function (this: DictGetMultiBlock) {
    this.updateMinus_();
  },

  /**
   * Callback for the plus image. Adds an input to the end of the block and
   * updates the state of the minus.
   */
  plus: function (this: DictGetMultiBlock) {
    this.addPart_();
    this.updateMinus_();
  },

  /**
   * Callback for the minus image. Removes an input from the end of the block
   * and updates the state of the minus.
   */
  minus: function (this: DictGetMultiBlock) {
    if (this.itemCount_ == 1) {
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
  addPart_: function (this: DictGetMultiBlock) {
    this.getInput("KEYS")?.appendField(
      new Blockly.FieldTextInput("key" + String(this.itemCount_)),
      "KEY" + String(this.itemCount_),
    );
    this.itemCount_++;
  },

  /**
   * Removes an input from the end of the block. If we are removing the last
   * input this updates the block to have an 'EMPTY' top input.
   * @this {Blockly.Block}
   * @private
   */
  removePart_: function (this: DictGetMultiBlock) {
    this.itemCount_--;
    this.getInput("KEYS")?.removeField("KEY" + String(this.itemCount_));
  },

  /**
   * Makes it so the minus is visible iff there is an input available to remove.
   * @private
   */
  updateMinus_: function (this: DictGetMultiBlock) {
    const minusField = this.getField("MINUS");
    if (!minusField && this.itemCount_ > 1) {
      this.getInput("TOOLS")?.insertFieldAt(1, createMinusField(), "MINUS");
    } else if (minusField && this.itemCount_ < 2) {
      this.getInput("TOOLS")?.removeField("MINUS");
    }
  },
};

const DICTS_GET_MULTI_EXTENSION = function (this: DictGetMultiBlock) {
  this.itemCount_ = 1;
  this.updateShape_();
  this.getInput("KEYS")?.appendField(
    new Blockly.FieldTextInput("key0"),
    "KEY0",
  );
  this.getInput("TOOLS")?.insertFieldAt(0, createPlusField(), "PLUS");
};

if (Blockly.Extensions.isRegistered("dict_create_with_mutator")) {
  Blockly.Extensions.unregister("dict_create_with_mutator");
}
Blockly.Extensions.registerMutator(
  "dict_create_with_mutator",
  DICTS_CREATE_WITH,
  DICTS_CREATE_WITH_EXTENSION,
);

if (Blockly.Extensions.isRegistered("dict_get_multi_mutator")) {
  Blockly.Extensions.unregister("dict_get_multi_mutator");
}
Blockly.Extensions.registerMutator(
  "dict_get_multi_mutator",
  DICTS_GET_MULTI,
  DICTS_GET_MULTI_EXTENSION,
);
