// outputs.ts
import { reactive, ref } from "vue";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { themeLight, themeDark } from "@/theme";

const version = "v1";

export const workspaceStore = reactive({
  workspace: ref(),
  startBlocks: ref(),
});

export const optionsStore = reactive({
  toolbox: ref(),
  theme: ref(),
  collapse: false,
  comments: false,
  disable: false,
  maxBlocks: Infinity,
  trashcan: true,
  horizontalLayout: false,
  toolboxPosition: "start",
  css: true,
  media: "https://blockly-demo.appspot.com/static/media/",
  rtl: false,
  scrollbars: true,
  sounds: false,
  oneBasedIndex: true,
  grid: {
    spacing: 20,
    length: 1,
    colour: "#888",
    snap: true,
  },
  zoom: {
    controls: true,
    wheel: false,
    startScale: 1,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
  renderer: "geras",
});

export const outputsStore = reactive({
  code: "" as string,
  activeTab: ref("tab-0"),
  snackbar: false,
  snackbarMsg: "" as string,
  snackbarTimeout: 2500 as number,
  snackbarColor: "green" as string,
});

export function setWorkspaceTheme(theme: string) {
  let workspace = Blockly.getMainWorkspace();
  if (theme === "LightTheme") {
    optionsStore.theme = ref(themeLight);
    // @ts-ignore
    workspace.setTheme(themeLight);
  } else if (theme === "DarkTheme") {
    optionsStore.theme = ref(themeDark);
    // @ts-ignore
    workspace.setTheme(themeDark);
  }
}

export function saveJson() {
  const workspace = Blockly.getMainWorkspace();
  const data = Blockly.serialization.workspaces.save(workspace);
  const json = JSON.stringify({ version: version, data: data });
  localStorage.setItem("NoneBlockly", json);
  outputsStore.snackbarColor = "green";
  outputsStore.snackbarMsg = "🤗 工作区已暂存";
  outputsStore.snackbar = true;
}

export function loadJson() {
  const workspace = Blockly.getMainWorkspace();
  const savedData = localStorage.getItem("NoneBlockly");
  if (savedData) {
    const json = JSON.parse(savedData);
    if (json.version === version) {
      Blockly.serialization.workspaces.load(json.data, workspace);
      outputsStore.snackbarColor = "green";
      outputsStore.snackbarMsg = "🥰 已恢复暂存工作区";
      outputsStore.snackbar = true;
    } else {
      initWorkspaceState();
    }
  } else {
    outputsStore.snackbarColor = "warning";
    outputsStore.snackbarMsg = "未找到暂存工作区，将导入默认工作区";
    outputsStore.snackbar = true;
    initWorkspaceState();
  }
}

export function initWorkspaceState() {
  let startBlocks = workspaceStore.startBlocks;
  let workspace = Blockly.getMainWorkspace();
  Blockly.serialization.workspaces.load(startBlocks, workspace);
}

export function generateCode() {
  let workspace = Blockly.getMainWorkspace();
  outputsStore.code = pythonGenerator.workspaceToCode(workspace);
}

export function copyCode() {
  let workspace = Blockly.getMainWorkspace();
  let code = pythonGenerator.workspaceToCode(workspace);
  navigator.clipboard
    .writeText(code)
    .then(() => {
      outputsStore.snackbarColor = "green";
      outputsStore.snackbarMsg = "😎 已复制 Python 代码";
    })
    .catch((err) => {
      outputsStore.snackbarColor = "warning";
      outputsStore.snackbarMsg = "🥺 复制代码出错" + err;
    });
  outputsStore.snackbar = true;
}
