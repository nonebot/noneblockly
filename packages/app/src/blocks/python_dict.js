import * as Blockly from "blockly/core";
import { Order, pythonGenerator } from "blockly/python";

Blockly.defineBlocksWithJsonArray([
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
    colour: 0,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "dicts_create_with_item",
    message0: "键值对",
    args0: [],
    colour: 0,
    previousStatement: null,
    nextStatement: null,
    tooltip: "",
    helpUrl: "",
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
    colour: 0,
    output: "dict",
    tooltip: "",
    helpUrl: "",
    mutator: "dict_create_with_mutator",
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
        type: "input_value",
        name: "ITEM",
      },
    ],
    colour: 0,
    output: null,
    inputsInline: true,
    tooltip: "",
    helpUrl: "",
  },
]);

const dictCreateWithMutator = {
  itemCount_: 2,
  /**
   * Create XML to represent list inputs.
   * Backwards compatible serialization implementation.
   */
  mutationToDom: function () {
    const container = document.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * Backwards compatible serialization implementation.
   *
   * @param container XML storage element.
   */
  domToMutation: function (container) {
    for (let x = 0; x < this.itemCount_; x++) {
      this.removeInput("KEY" + x);
      this.removeInput("VALUE" + x);
    }
    this.itemCount_ = parseInt(container.getAttribute("items"), 10);
    for (let x = 0; x < this.itemCount_; x++) {
      this.appendValueInput("KEY" + x)
        .appendField("KEY-" + x)
        .setAlign(Blockly.inputs.Align.RIGHT);
      this.appendValueInput("VALUE" + x)
        .appendField("VALUE-" + x)
        .setAlign(Blockly.inputs.Align.RIGHT);
    }
  },
  /**
   * Populate the mutator's dialog with this block's components.
   *
   * @param workspace Mutator's workspace.
   * @returns Root block in mutator.
   */
  decompose: function (workspace) {
    const containerBlock = workspace.newBlock("dicts_create_with_container");
    containerBlock.initSvg();
    let connection = containerBlock.getInput("STACK").connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock("dicts_create_with_item");
      itemBlock.initSvg();
      if (!itemBlock.previousConnection) {
        throw new Error("itemBlock has no previousConnection");
      }
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   *
   * @param containerBlock Root block in mutator.
   */
  compose: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock("STACK");
    // Count number of inputs.
    const connections = [];
    while (itemBlock) {
      if (itemBlock.isInsertionMarker()) {
        itemBlock = itemBlock.getNextBlock();
        continue;
      }
      connections.push(itemBlock.valueConnection_?.key);
      connections.push(itemBlock.valueConnection_?.value);
      itemBlock = itemBlock.getNextBlock();
    }
    // Disconnect any children that don't belong.
    for (let i = 0; i < this.itemCount_; i++) {
      const connection_key = this.getInput("KEY" + i).connection
        .targetConnection;
      if (connection_key && connections.indexOf(connection_key) === -1) {
        connection_key.disconnect();
      }
      const connection_value = this.getInput("KEY" + i).connection
        .targetConnection;
      if (connection_value && connections.indexOf(connection_value) === -1) {
        connection_value.disconnect();
      }
    }
    this.itemCount_ = connections.length / 2;
    this.updateShape_();
    // Reconnect any child blocks.
    for (let i = 0; i < this.itemCount_; i++) {
      connections[i]?.reconnect(this, "MESSAGE" + i);
    }
  },
  saveConnections: function (containerBlock) {
    // Store a pointer to any connected child blocks.
    let itemBlock = containerBlock.getInputTargetBlock("STACK");
    let x = 0;
    while (itemBlock) {
      let key_input = this.getInput("KEY" + x);
      let value_input = this.getInput("VALUE" + x);
      itemBlock.valueConnection_ = {
        key: key_input?.connection.targetConnection,
        value: value_input?.connection.targetConnection,
      };
      x++;
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   */
  updateShape_: function () {
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

// Function signature.

if (Blockly.Extensions.isRegistered("dict_create_with_mutator")) {
  Blockly.Extensions.unregister("dict_create_with_mutator");
}
Blockly.Extensions.registerMutator(
  "dict_create_with_mutator",
  dictCreateWithMutator,
);

// The following is for the Python generator

pythonGenerator.forBlock["dicts_get"] = function (block, generator) {
  let dict = generator.valueToCode(block, "DICT", Order.MEMBER) || "{}";
  let value = generator.valueToCode(block, "ITEM", Order.NONE) || "None";
  let code = dict + "[" + value + "]";
  return [code, Order.ATOMIC];
};

pythonGenerator.forBlock["dicts_create_with"] = function (block, generator) {
  let code = new Array(block.itemCount_);
  for (let n = 0; n < block.itemCount_; n++) {
    let key = generator.valueToCode(block, "KEY" + n, Order.NONE) || "None";
    let value = generator.valueToCode(block, "VALUE" + n, Order.NONE) || "None";
    code[n] = key + ": " + value;
  }
  code = "{" + code.join(", ") + "}";
  return [code, Order.ATOMIC];
};
