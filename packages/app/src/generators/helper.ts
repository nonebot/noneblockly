import { PythonGenerator } from "blockly/python";
import * as Blockly from "blockly/core";

export function getGlobalStatement(
  block: Blockly.Block,
  generator: PythonGenerator,
) {
  const globals = [];
  const workspace = block.workspace;
  const usedVariables = Blockly.Variables.allUsedVarModels(workspace) || [];
  for (const variable of usedVariables) {
    const varName = variable.name;
    globals.push(generator.getVariableName(varName));
  }
  // Add developer variables.
  const devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (let i = 0; i < devVarList.length; i++) {
    globals.push(
      generator.nameDB_!.getName(
        devVarList[i],
        Blockly.Names.NameType.DEVELOPER_VARIABLE,
      ),
    );
  }
  const globalString = globals.length
    ? "global " + globals.join(", ") + "\n"
    : "";
  return globalString;
}
