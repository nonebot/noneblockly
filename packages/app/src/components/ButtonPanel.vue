<script setup lang="ts">
import { useTheme } from "vuetify";
import {
  copyCode,
  loadJSON,
  saveJSON,
  outputsStore,
  setWorkspaceTheme,
} from "@/stores/workspaces";

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
      <v-spacer />
      <v-spacer />

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

      <v-btn color="tertiary" @click="saveJSON">
        <v-icon :icon="mdiContentSave"></v-icon>
        暂存
        <!-- SAVE -->
        <v-tooltip activator="parent" location="bottom"> 暂存工作区 </v-tooltip>
      </v-btn>

      <v-btn color="tertiary" @click="loadJSON">
        <v-icon :icon="mdiFileRestore"></v-icon>
        恢复
        <!-- RESTORE -->
        <v-tooltip activator="parent" location="bottom">
          恢复保存的工作区
        </v-tooltip>
      </v-btn>

      <v-btn color="tertiary" @click="">
        <v-icon :icon="mdiFileDownload"></v-icon>
        下载
        <!-- RESTORE -->
        <v-tooltip activator="parent" location="bottom">
          下载工作区源代码
        </v-tooltip>
      </v-btn>

      <v-btn color="tertiary" @click="">
        <v-icon :icon="mdiFileUpload"></v-icon>
        导入
        <!-- RESTORE -->
        <v-tooltip activator="parent" location="bottom">
          导入工作区源代码
        </v-tooltip>
      </v-btn>

      <v-btn color="tertiary" @click="copyCode">
        <v-icon :icon="mdiLanguagePython"></v-icon>
        复制代码
        <!-- RESTORE -->
        <v-tooltip activator="parent" location="bottom">
          复制导出的 Python 代码
        </v-tooltip>
      </v-btn>

      <v-spacer />

      <v-btn color="primary" class="text-none" stacked>
        <v-icon :icon="mdiThemeLightDark" @click="toggleTheme()"></v-icon>
      </v-btn>
    </v-toolbar>
  </v-card-actions>
</template>

<style scoped>
#content-card-toolbar {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
}
</style>

<script lang="ts">
import {
  mdiContentSave,
  mdiFileRestore,
  mdiFileDownload,
  mdiFileUpload,
  mdiThemeLightDark,
  mdiLanguagePython,
} from "@mdi/js";
</script>
