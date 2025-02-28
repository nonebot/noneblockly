<script setup lang="ts">
import { useTheme } from "vuetify";
import {
  outputsStore,
  loadJson,
  saveJson,
  exportPress,
  setWorkspaceTheme,
} from "@/workspace";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark
    ? "LightTheme"
    : "DarkTheme";
  // hljs theme
  let htmlElement = document.querySelector("html");
  if (htmlElement) {
    htmlElement.setAttribute(
      "hljs-theme-dark",
      theme.global.current.value.dark ? "true" : "false",
    );
  }
  setWorkspaceTheme(theme.global.name.value);
}
</script>

<template>
  <v-card-actions>
    <v-toolbar
      id="content-card-toolbar"
      density="default"
      color="primary-container"
    >
      <v-snackbar
        location-strategy="static"
        v-model="outputsStore.snackbar"
        :timeout="outputsStore.snackbarTimeout"
        :color="outputsStore.snackbarColor"
        elevation="24"
      >
        <template v-slot:actions>
          <v-icon :icon="mdiContentSave"></v-icon>
        </template>
        {{ outputsStore.snackbarMsg }}
      </v-snackbar>

      <v-btn color="tertiary" @click="saveJson">
        <v-icon :icon="mdiContentSave"></v-icon>
        暂存
        <v-tooltip activator="parent" location="bottom">
          暂存项目到浏览器
        </v-tooltip>
      </v-btn>

      <v-btn color="tertiary" @click="loadJson">
        <v-icon :icon="mdiFileRestore"></v-icon>
        恢复
        <v-tooltip activator="parent" location="bottom">
          恢复上次暂存的项目
        </v-tooltip>
      </v-btn>

      <v-btn color="tertiary" @click="exportPress">
        <v-icon :icon="mdiLanguagePython"></v-icon>
        导入导出
        <v-tooltip activator="parent" location="bottom">
          导入导出项目设计文件，或生成 NoneBot 工程
        </v-tooltip>
      </v-btn>

      <v-spacer />

      <v-btn color="tertiary" class="text-none" stacked>
        <v-icon :icon="mdiThemeLightDark" @click="toggleTheme()"></v-icon>
      </v-btn>
    </v-toolbar>
  </v-card-actions>
</template>

<style scoped>
#content-card-toolbar {
  bottom: 0;
  height: 8vh;
  width: 100%;
}
</style>

<script lang="ts">
import {
  mdiContentSave,
  mdiFileRestore,
  mdiThemeLightDark,
  mdiLanguagePython,
} from "@mdi/js";
</script>
