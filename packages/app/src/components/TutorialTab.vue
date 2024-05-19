<script setup lang="ts">
import { initWorkspaceState } from "@/stores/workspaces";
</script>

<template>
  <v-card-text class="text-h6 pb-0">使用方法</v-card-text>
  <v-card-text>
    <p class="text-body-1">
      点击左侧的工具箱标签，在对应工具箱中拖出块，在工作区中进行拼接。
    </p>
  </v-card-text>
  <v-card-text>
    <v-btn color="tertiary" @click="initWorkspaceState">
      点击此按钮加载示例
    </v-btn>
  </v-card-text>
  <v-card-text>
    <p class="text-body-1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </v-card-text>
</template>
