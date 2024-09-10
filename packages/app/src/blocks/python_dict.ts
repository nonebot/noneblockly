import * as Blockly from "blockly/core";
import type { Block } from "blockly/core/block";
import type { BlockDefinition } from "blockly/core/blocks";
import type { Connection } from "blockly/core/connection";
import type { BlockSvg } from "blockly/core/block_svg";
import type { Workspace } from "blockly/core/workspace";

export const pythonDict: BlockDefinition[] = [
  {
    type: "dicts_create_with_container",
    message0: "字典 %1 %2",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "STACK",
      },
    ],
    tooltip: "",
    helpUrl: "",
    colour: 0,
    // style: "dict_blocks",
  },
  {
    type: "dicts_create_with_item",
    message0: "键值对",
    previousStatement: null,
    nextStatement: null,
    tooltip: "",
    helpUrl: "",
    enableContextMenu: false,
    colour: 0,
    // style: "dict_blocks",
  },
  {
    type: "dicts_create_with",
    message0: "创建字典 %1 KEY-0 %2 VALUE-0 %3 KEY-1 %4 VALUE-1 %5",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "KEY0",
        align: "RIGHT",
      },
      {
        type: "input_value",
        name: "VALUE0",
        align: "RIGHT",
      },
      {
        type: "input_value",
        name: "KEY1",
        align: "RIGHT",
      },
      {
        type: "input_value",
        name: "VALUE1",
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
    message0: "从字典 %1 中取 KEY %2 的值",
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
    type: "dicts_set",
    message0: "设置字典 %1 中 KEY %2 的值为 %3",
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
}
type DictCreateWithMixinType = typeof DICTS_CREATE_WITH;

const DICTS_CREATE_WITH = {
  /**
   * Number of item inputs the block has.
   * @type {number}
   */
  itemCount_: 2,

  /**
   * Block for creating a dict with any number of key-value of any type.
   */
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
    this.itemCount_ = state["itemCount"];
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   *
   * @param workspace Mutator's workspace.
   * @returns Root block in mutator.
   */
  decompose: function (this: DictCreateWithBlock, workspace: Workspace): any {
    const containerBlock = workspace.newBlock("dicts_create_with_container");
    (containerBlock as BlockSvg).initSvg();
    let connection = containerBlock.getInput("STACK")!.connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock("dicts_create_with_item");
      (itemBlock as BlockSvg).initSvg();
      if (!itemBlock.previousConnection) {
        throw new Error("itemBlock has no previousConnection");
      }
      connection!.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   *
   * @param containerBlock Root block in mutator.
   */
  compose: function (this: DictCreateWithBlock, containerBlock: Block) {
    let itemBlock: ItemBlock | null = containerBlock.getInputTargetBlock("STACK") as ItemBlock;
    // Count number of inputs.
    const connections: Connection[] = [];
    while (itemBlock) {
      if (itemBlock.isInsertionMarker()) {
        itemBlock = itemBlock.getNextBlock() as ItemBlock | null;
        continue;
      }
      connections.push(itemBlock.valueConnection_?.key as Connection);
      connections.push(itemBlock.valueConnection_?.value as Connection);
      itemBlock = itemBlock.getNextBlock() as ItemBlock | null;
    }
    // Disconnect any children that don't belong.
    for (let i = 0; i < this.itemCount_; i++) {
      const connection_key = this.getInput("KEY" + i)!.connection!.targetConnection;
      if (connection_key && connections.indexOf(connection_key) === -1) {
        connection_key.disconnect();
      }
      const connection_value = this.getInput("VALUE" + i)!.connection!.targetConnection;
      if (connection_value && connections.indexOf(connection_value) === -1) {
        connection_value.disconnect();
      }
    }
    this.itemCount_ = connections.length / 2;
    this.updateShape_();
    // Reconnect any child blocks.
    for (let i = 0; i < this.itemCount_; i++) {
      connections[i]?.reconnect(this, "KEY" + i);
      connections[i]?.reconnect(this, "VALUE" + i);
    }
  },
  saveConnections: function (this: DictCreateWithBlock, containerBlock: Block) {
    // Store a pointer to any connected child blocks.
    let itemBlock: ItemBlock | null = containerBlock.getInputTargetBlock("STACK") as ItemBlock;
    let i = 0;
    while (itemBlock) {
      if (itemBlock.isInsertionMarker()) {
        itemBlock = itemBlock.getNextBlock() as ItemBlock | null;
        continue;
      }
      const key_input = this.getInput("KEY" + i);
      const value_input = this.getInput("VALUE" + i);
      itemBlock.valueConnection_ = {
        key: key_input?.connection!.targetConnection as Connection,
        value: value_input?.connection!.targetConnection as Connection,
      };
      itemBlock = itemBlock.getNextBlock() as ItemBlock | null;
      i++;
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   */
  updateShape_: function (this: DictCreateWithBlock) {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField("空字典");
    }
    // Add new inputs.
    for (let i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("KEY" + i)) {
        this.appendValueInput("KEY" + i)
          .setAlign(Blockly.inputs.Align.RIGHT)
          .appendField("KEY-" + i);
      }
      if (!this.getInput("VALUE" + i)) {
        this.appendValueInput("VALUE" + i)
          .setAlign(Blockly.inputs.Align.RIGHT)
          .appendField("VALUE-" + i);
      }
    }
    // Remove deleted inputs.
    for (let i = this.itemCount_; this.getInput("KEY" + i); i++) {
      this.removeInput("KEY" + i);
    }
    for (let i = this.itemCount_; this.getInput("VALUE" + i); i++) {
      this.removeInput("VALUE" + i);
    }
  },
};

/** Type for a 'dicts_create_with_container' block. */
type ContainerBlock = Block & ContainerMutator;
interface ContainerMutator extends ContainerMutatorType {}
type ContainerMutatorType = typeof DICTS_CREATE_WITH_CONTAINER;

const DICTS_CREATE_WITH_CONTAINER = {
  /**
   * Mutator block for dict container.
   */
  init: function (this: ContainerBlock) {
    this.setStyle("dict_blocks");
    this.appendStatementInput("STACK");
    this.contextMenu = false;
  },
};

/** Type for a 'dicts_create_with_item' block. */
type ItemBlock = Block & ItemMutator;
interface ItemConnection {
  key: Connection;
  value: Connection;
}
interface ItemMutator extends ItemMutatorType {
  valueConnection_?: ItemConnection;
}
type ItemMutatorType = typeof DICTS_CREATE_WITH_ITEM;

const DICTS_CREATE_WITH_ITEM = {
  /**
   * Mutator block for adding items.
   */
  init: function (this: ItemBlock) {},
};

/**
 * Performs final setup of a dicts_create_with block.
 */
const DICTS_CREATE_WITH_EXTENSION = function (this: DictCreateWithBlock) {
  // Initialize the mutator values.
  this.itemCount_ = 2;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.icons.MutatorIcon(["dicts_create_with_item"], this));
};

if (Blockly.Extensions.isRegistered("dict_create_with_mutator")) {
  Blockly.Extensions.unregister("dict_create_with_mutator");
}
Blockly.Extensions.registerMutator("dict_create_with_mutator", DICTS_CREATE_WITH, DICTS_CREATE_WITH_EXTENSION);
