import Blockly from "blockly/core";
import { pythonGenerator, Order } from "blockly/python";

Blockly.defineBlocksWithJsonArray([
  {
    type: "nb_message_text",
    message0: "文本消息 %1",
    args0: [
      {
        type: "field_input",
        name: "TEXT",
        text: "消息内容",
      },
    ],
    inputsInline: true,
    output: "Message",
    colour: 100,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "nb_message_image",
    message0: "图片消息 %1 %2",
    args0: [
      {
        type: "field_dropdown",
        name: "TYPE",
        options: [
          ["URL", "url"],
          ["本地路径", "path"],
        ],
      },
      {
        type: "field_input",
        name: "IMAGE",
        text: "图片信息",
      },
    ],
    inputsInline: true,
    output: "Message",
    colour: 100,
    tooltip:
      "支持通过URL发送网络图片和通过文件路径发送本地图片。如果选择文件路径，请填写绝对路径或相对于机器人运行目录的相对路径",
    helpUrl: "",
  },
  {
    type: "nb_message_send",
    message0: "发送消息 %1 回复原消息 %2 @发送者 %3",
    args0: [
      {
        type: "input_value",
        name: "MESSAGE",
        check: "Message",
      },
      {
        type: "field_checkbox",
        name: "REPLY",
        checked: false,
      },
      {
        type: "field_checkbox",
        name: "AT",
        checked: true,
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 100,
    tooltip: "填入文本消息或图片消息构造块，也可以填入对应的变量",
    helpUrl: "",
  },
  {
    type: "nb_message_finish",
    message0: "发送消息并结束事件处理 %1 回复消息 %2 @发送者 %3",
    args0: [
      {
        type: "input_value",
        name: "MESSAGE",
        check: "Message",
      },
      {
        type: "field_checkbox",
        name: "REPLY",
        checked: false,
      },
      {
        type: "field_checkbox",
        name: "AT",
        checked: true,
      },
    ],
    inputsInline: true,
    previousStatement: null,
    colour: 100,
    tooltip: "填入文本消息或图片消息构造块，也可以填入对应的变量",
    helpUrl: "",
  },
  {
    type: "nb_message_merge_container",
    message0: "消息列表 %1 %2",
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
    type: "nb_message_merge_item",
    message0: "消息",
    args0: [],
    colour: 0,
    previousStatement: null,
    nextStatement: null,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "nb_message_merge",
    message0: "合并多条消息 %1 第 1 条消息 %2 第 2 条消息 %3",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_value",
        name: "MESSAGE0",
        check: "Message",
        align: "RIGHT",
      },
      {
        type: "input_value",
        name: "MESSAGE1",
        check: "Message",
        align: "RIGHT",
      },
    ],
    inputsInline: false,
    output: "Message",
    colour: 100,
    tooltip: "填入文本消息或图片消息构造块，也可以填入对应的变量",
    helpUrl: "",
    mutator: "nb_message_merge_mutator",
  },
]);

const nbMessageMergeMutator = {
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
    const items = container.getAttribute("items");
    if (!items) throw new TypeError("element did not have items");
    this.itemCount_ = parseInt(container.getAttribute("items"), 10);
    this.updateShape_();
  },
  /**
   * Returns the state of this block as a JSON serializable object.
   *
   * @returns The state of this block, ie the item count.
   */
  saveExtraState: function () {
    return {
      itemCount: this.itemCount_,
    };
  },
  /**
   * Applies the given state to this block.
   *
   * @param state The state to apply to this block, ie the item count.
   */
  loadExtraState: function (state) {
    this.itemCount_ = state["itemCount"];
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   *
   * @param workspace Mutator's workspace.
   * @returns Root block in mutator.
   */
  decompose: function (workspace) {
    const containerBlock = workspace.newBlock("nb_message_merge_container");
    containerBlock.initSvg();
    let connection = containerBlock.getInput("STACK").connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock("nb_message_merge_item");
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
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.getNextBlock();
    }
    // Disconnect any children that don't belong.
    for (let i = 0; i < this.itemCount_; i++) {
      const connection = this.getInput("MESSAGE" + i).connection
        .targetConnection;
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (let i = 0; i < this.itemCount_; i++) {
      connections[i]?.reconnect(this, "MESSAGE" + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   *
   * @param containerBlock Root block in mutator.
   */
  saveConnections: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock("STACK");
    let i = 0;
    while (itemBlock) {
      if (itemBlock.isInsertionMarker()) {
        itemBlock = itemBlock.getNextBlock();
        continue;
      }
      const input = this.getInput("MESSAGE" + i);
      itemBlock.valueConnection_ = input?.connection.targetConnection;
      itemBlock = itemBlock.getNextBlock();
      i++;
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   */
  updateShape_: function () {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField("空消息列表");
    }
    // Add new inputs.
    for (let i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("MESSAGE" + i)) {
        this.appendValueInput("MESSAGE" + i)
          .setAlign(Blockly.inputs.Align.RIGHT)
          .appendField(`第 ${i + 1} 条消息`);
      }
    }
    // Remove deleted inputs.
    for (let i = this.itemCount_; this.getInput("MESSAGE" + i); i++) {
      this.removeInput("MESSAGE" + i);
    }
  },
};

// Function signature.

if (Blockly.Extensions.isRegistered("nb_message_merge_mutator")) {
  Blockly.Extensions.unregister("nb_message_merge_mutator");
}
Blockly.Extensions.registerMutator(
  "nb_message_merge_mutator",
  nbMessageMergeMutator,
);

// The following is for the Python generator

pythonGenerator.forBlock["nb_message_text"] = function (block, generator) {
  const text_text = block.getFieldValue("TEXT");
  generator.definitions_["from_nonebot_plugin_saa_import_Text"] =
    "from nonebot_plugin_saa import Text";
  const code = `Text("${text_text}")`;
  return [code, Order.ATOMIC];
};

pythonGenerator.forBlock["nb_message_image"] = function (block, generator) {
  const dropdown_type = block.getFieldValue("TYPE");
  const text_image = block.getFieldValue("IMAGE");
  generator.definitions_["from_nonebot_plugin_saa_import_Image"] =
    "from nonebot_plugin_saa import Image";
  let image_code = "";
  if (dropdown_type === "url") {
    image_code = `"${text_image}"`;
  } else if (dropdown_type === "path") {
    generator.definitions_["from_pathlib_import_Path"] =
      "from pathlib import Path";
    image_code = `Path("${text_image.replace(/\\/g, "\\\\")}")`;
  }
  const code = `Image(${image_code})`;
  return [code, Order.ATOMIC];
};

pythonGenerator.forBlock["nb_message_send"] = function (block, generator) {
  const value_message = generator.valueToCode(block, "MESSAGE", Order.ATOMIC);
  const checkbox_reply = block.getFieldValue("REPLY") === "TRUE";
  const checkbox_at = block.getFieldValue("AT") === "TRUE";
  let params = [];
  if (checkbox_reply) {
    params.push("reply=True");
  }
  if (checkbox_at) {
    params.push("at_sender=True");
  }
  const code = `await ${value_message}.send(${params.join(", ")})\n`;
  return code;
};

pythonGenerator.forBlock["nb_message_finish"] = function (block, generator) {
  const value_message = generator.valueToCode(block, "MESSAGE", Order.ATOMIC);
  const checkbox_reply = block.getFieldValue("REPLY") === "TRUE";
  const checkbox_at = block.getFieldValue("AT") === "TRUE";
  let params = [];
  if (checkbox_reply) {
    params.push("reply=True");
  }
  if (checkbox_at) {
    params.push("at_sender=True");
  }
  const code = `await ${value_message}.finish(${params.join(", ")})\n`;
  return code;
};

pythonGenerator.forBlock["nb_message_merge"] = function (block, generator) {
  let code = new Array(block.itemCount_);
  generator.definitions_["from_nonebot_plugin_saa_import_MessageFactory"] =
    "from nonebot_plugin_saa import MessageFactory";
  for (let n = 0; n < block.itemCount_; n++) {
    code[n] = generator.valueToCode(block, "MESSAGE" + n, Order.NONE) || "None";
  }
  code = code.filter(function (element) {
    return element !== "None";
  });
  code = `MessageFactory([${code.join(", ")}])`;
  return [code, Order.ATOMIC];
};
