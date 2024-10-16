// outputs.ts
import { reactive, ref } from "vue";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { themeLight, themeDark } from "@/theme";

import JSZip from "jszip";
import { saveAs } from "file-saver";

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
  export: {
    name: "app" as string,
    preset: { name: "console", description: "控制台机器人" },
    port: 8080 as number,
    platform: ["windows", "linux"] as string[],
  },
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
  outputsStore.activeTab = "tab-0";
}

export function generateCode() {
  let workspace = Blockly.getMainWorkspace();
  outputsStore.code = pythonGenerator.workspaceToCode(workspace);
}

export function exportPress() {
  outputsStore.activeTab = "tab-3";
}

function generatePyproject(code: string, preset: string) {
  const dependencies = new Set<string>([
    "nonebot2[fastapi,httpx,websockets]>=2.3.3",
    "nb-cli>=1.4.2",
  ]);
  const importLines = code.split("\n\n")[0].split("\n");
  importLines.forEach((line) => {
    if (line.startsWith("from nonebot_plugin_alconna")) {
      dependencies.add("nonebot-plugin-alconna>=0.52.3");
    } else if (line.startsWith("from nonebot_plugin_apscheduler")) {
      dependencies.add("nonebot-plugin-apscheduler>=0.5.0");
    } else if (line.startsWith("import nonebot_plugin_localstore")) {
      dependencies.add("nonebot-plugin-localstore>=0.7.1");
    }
  });
  let adapters = "";
  if (preset === "console") {
    adapters = '{ name = "Console", module_name = "nonebot.adapters.console" }';
    dependencies.add("nonebot-adapter-console>=0.6.0");
  } else if (preset === "onebot") {
    adapters =
      '{ name = "OneBot V11", module_name = "nonebot.adapters.onebot.v11" }';
    adapters +=
      ', { name = "OneBot V12", module_name = "nonebot.adapters.onebot.v12" }';
    dependencies.add("nonebot-adapter-onebot>=2.4.5");
  }
  return `\
    [project]
    name = "noneblockly-app"
    version = "0.1.0"
    description = "NoneBot project generated by NoneBlockly"
    authors = [{name = "name", email = "name@example.com"}]
    dependencies = [
        ${Array.from(dependencies)
          .map((dep) => `"${dep}"`)
          .join(", \n")}
    ]
    requires-python = ">=3.9"
    license = {text = "MIT"}

    [tool.nonebot]
    adapters = [
        { name = "Console", module_name = "nonebot.adapters.console" }
    ]
    plugin_dirs = ["plugins"]`;
}

function generateEnv(port: number) {
  return `\
    DRIVER=~fastapi+~httpx+~websockets
    PORT=${port}`;
}

const windowsScripts = {
  install: `\
    # Step 1: Check if 'uv' is installed
    $uvVersion = try {
        uv --version
    } catch {
        $null
    }

    if ($uvVersion) {
        Write-Host "UV is installed. Version: "
        Write-Host $uvVersion
    } else {
        # Step 2: If 'uv' is not installed, ask user for confirmation to install
        Write-Host "UV is not installed on this system."
        $confirmation = Read-Host "Do you want to install UV? (Press Enter to confirm or type 'n' to cancel)"
        
        if ($confirmation -eq '') {
            Write-Host "Installing UV..."
            Invoke-RestMethod https://astral.sh/uv/install.ps1 | Invoke-Expression
            Write-Host "UV has been installed successfully."
        } else {
            Write-Host "Installation canceled."
            exit
        }
    }

    # Step 3: Create a Python virtual environment
    Write-Host "Creating a Python virtual environment with Python 3.12..."
    uv venv --python 3.12

    Write-Host "Python virtual environment created successfully."

    # Step 4: Install dependencies
    uv pip install -r pyproject.toml`,
  run: `\
    $uvVersion = try {
        uv --version
    } catch {
        $null
    }

    if ($null -eq $uvVersion) {
        Write-Host "Please run 'install.ps1' first."
        exit
    }

    uv run nb run`,
};

const linuxScripts = {
  install: `\
    #!/bin/bash

    # Step 1: Check if 'uv' is installed
    if command -v uv &> /dev/null
    then
        echo "UV is installed. Version info:"
        uv --version
    else
        # Step 2: If 'uv' is not installed, ask user for confirmation to install
        echo "UV is not installed on this system."
        read -p "Do you want to install UV? (Press Enter to confirm or type 'n' to cancel): " confirmation
        
        if [ "$confirmation" == "" ]; then
            echo "Installing UV..."
            curl -LsSf https://astral.sh/uv/install.sh | sh
            echo "UV has been installed successfully."
        else
            echo "Installation canceled."
            exit 1
        fi
    fi

    # Step 3: Create a Python virtual environment
    echo "Creating a Python virtual environment with Python 3.12..."
    uv venv --python 3.12

    echo "Python virtual environment created successfully."`,
  run: `\
    if ! command -v uv &> /dev/null
    then
        echo "Please run 'install.sh' first"
        exit
    fi

    uv run nb run`,
};

export function exportZip() {
  let zip = new JSZip();
  let workspace = Blockly.getMainWorkspace();
  let code = pythonGenerator.workspaceToCode(workspace);
  zip.file("plugins/plugin_exported.py", code);
  zip.file(
    "pyproject.toml",
    generatePyproject(code, outputsStore.export.preset.name),
  );
  zip.file(".env.prod", generateEnv(outputsStore.export.port));
  outputsStore.export.platform.forEach((platform) => {
    if (platform === "windows") {
      zip.file("install.ps1", windowsScripts.install);
      zip.file("run.ps1", windowsScripts.run);
    } else if (platform === "linux") {
      zip.file("install.sh", linuxScripts.install);
      zip.file("run.sh", linuxScripts.run);
    }
  });
  outputsStore.snackbarColor = "green";
  outputsStore.snackbarMsg = "😎 已导出 Python 项目";
  outputsStore.snackbar = true;
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, `${outputsStore.export.name}.zip`);
  });
}
