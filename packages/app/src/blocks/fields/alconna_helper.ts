import * as Blockly from "blockly/core";

export function getAlconnaArg(block: Blockly.Block): string[] {
  let args: string[] = [];
  // get top block
  let parent = block.getParent();
  if (parent == null) {
    return [];
  }
  while (parent.type != "nonebot_on_alconna") {
    parent = parent.getParent();
    if (parent == null) {
      return [];
    }
  }
  // get all arg blocks of alconna top block
  for (let n = 0; n < (parent as any).itemCount_; n++) {
    const arg_block = parent
      .getInput("ARG" + String(n))
      ?.connection?.targetConnection?.getSourceBlock();
    const arg_type = arg_block?.type;
    if (arg_type === "alconna_arg") {
      const arg_name = arg_block?.getFieldValue("NAME");
      if (arg_name) {
        args.push(arg_name);
      }
    }
  }
  return args;
}
