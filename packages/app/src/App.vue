<script setup lang="ts">
import { onMounted } from "vue";
// Components
import ContentCard from "@/components/ContentCard.vue";
import BlocklyTab from "@/components/BlocklyTab.vue";
import TutorialTab from "@/components/TutorialTab.vue";
import CodeTab from "@/components/CodeTab.vue";
import ConfigTab from "@/components/ConfigTab.vue";
import ButtonPanel from "@/components/ButtonPanel.vue";
// Workspace
import { loadJson, generateCode } from "@/workspace";
import { optionsStore, workspaceStore } from "@/workspace";
// Workspace data
import { demoProject } from "@/default";
// Blockly config
import * as Blockly from "blockly";
import { blocks } from "@/blocks";
import { toolbox } from "@/toolbox";
import { generators } from "@/generators";
import { pythonGenerator } from "blockly/python";
import * as ZhHans from "blockly/msg/zh-hans";

Blockly.common.defineBlocks(blocks);
generators.forEach((generator) => {
  Object.assign(pythonGenerator.forBlock, generator);
});

pythonGenerator.addReservedWords(
  "json,Annotated,Matcher,Message,EventMessage,CommandArg,on_command,on_message,on_alconna,to_me",
);

// @ts-ignore
Blockly.setLocale(ZhHans);
Blockly.ContextMenuItems.registerCommentOptions();

// Set store data
optionsStore.toolbox = toolbox;
workspaceStore.demoProject = demoProject;
const workspace = Blockly.getMainWorkspace();
workspaceStore.workspace = workspace;

onMounted(() => {
  loadJson();
  const workspace = Blockly.getMainWorkspace();
  workspace.addChangeListener(generateCode);
});
</script>

<template>
  <v-app>
    <v-card class="rounded-0">
      <div class="pa-0 ma-0">
        <ContentCard>
          <template v-slot:tab-0>
            <BlocklyTab
              id="blockly-div"
              :options="optionsStore"
              ref="workspace"
            />
          </template>
          <template v-slot:tab-1>
            <TutorialTab />
          </template>
          <template v-slot:tab-2>
            <CodeTab />
          </template>
          <template v-slot:tab-3>
            <ConfigTab />
          </template>
        </ContentCard>
        <ButtonPanel />
      </div>
    </v-card>
  </v-app>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://fonts.googleapis.com/css?family=Inter");
</style>

<script lang="ts">
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";

hljs.registerLanguage("python", python);
</script>
