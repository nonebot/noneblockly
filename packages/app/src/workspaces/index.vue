<script setup lang="ts">
import { onMounted } from "vue";
// Components
import * as Blockly from "blockly";
import BlocklyPage from "@/components/BlocklyPage.vue";
import ContentPage from "@/components/ContentPage.vue";
// Stores
import { optionsStore, workspaceStore } from "@/stores/workspaces";
import { loadJSON, generateCode } from "@/stores/workspaces";
// Workspace data
import startBlocks from "@/data/default.json";
// Blockly config
import { blocks } from "@/blocks";
import { toolbox } from "@/toolbox";
import { generators } from "@/generators";
import { pythonGenerator } from "blockly/python";
import * as ZhHans from "blockly/msg/zh-hans";

Blockly.common.defineBlocks(blocks);
generators.forEach((generator) => {
  Object.assign(pythonGenerator.forBlock, generator);
});

Blockly.setLocale(ZhHans);

// Set store data
optionsStore.toolbox = toolbox;
workspaceStore.startBlocks = startBlocks;
const workspace = Blockly.getMainWorkspace();
workspaceStore.workspace = workspace;

onMounted(() => {
  loadJSON();

  var workspace = Blockly.getMainWorkspace();
  workspace.addChangeListener(generateCode);
});
</script>

<template>
  <v-app>
    <BlocklyPage id="blockly-div" :options="optionsStore" ref="workspace" />
    <ContentPage id="content" />
  </v-app>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://fonts.googleapis.com/css?family=Inter");

html {
  overflow-y: auto;
}

body {
  margin: 0;
}

#blockly-div {
  position: absolute;
}

#content {
  position: absolute;
}

@media (min-width: 768px) {
  #blockly-div {
    left: 0;
    width: 60%;
    height: 100%;
  }

  #content {
    right: 0;
    width: 40%;
    height: 100%;
  }
}

@media (max-width: 767px) {
  #blockly-div {
    top: 0;
    width: 100%;
    height: 45%;
  }

  #content {
    bottom: 0;
    width: 100%;
    height: 55%;
  }
}
</style>

<script lang="ts">
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";

hljs.registerLanguage("python", python);
</script>
