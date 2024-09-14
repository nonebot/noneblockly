<template>
  <v-card
    id="content-card-component"
    class="mx-0 mt-0 mb-0 pb-0"
    elevation="0"
    rounded="0"
  >
    <v-toolbar density="compact" color="secondary-container">
      <v-tabs v-model="OutputsStore.activeTab" bg-color="secondary-container">
        <v-tab value="tab-0"> 编程 </v-tab>
        <v-tab value="tab-1"> 教程 </v-tab>
        <v-tab value="tab-2"> 代码 </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-window v-model="OutputsStore.activeTab" class="content-card">
      <v-window-item value="tab-0">
        <v-card>
          <div class="content-tab">
            <slot name="tab-0" />
          </div>
        </v-card>
      </v-window-item>

      <v-window-item value="tab-1">
        <v-card>
          <div class="content-tab">
            <slot name="tab-1" />
          </div>
        </v-card>
      </v-window-item>

      <v-window-item value="tab-2">
        <v-card>
          <div class="content-tab">
            <slot name="tab-2" />
          </div>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style lang="scss" scoped>
.content-tab {
  height: 84vh;
  width: 100%;
  padding: 1rem;
  overflow: auto;
}
</style>

<script setup lang="ts">
import { OutputsStore } from "@/workspace";
</script>
