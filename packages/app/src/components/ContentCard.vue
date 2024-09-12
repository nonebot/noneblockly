<template>
  <v-card
    id="content-card-component"
    class="mx-0 mt-0 mb-0 pb-0"
    elevation="0"
    rounded="0"
  >
    <v-toolbar density="compact" color="secondary-container">
      <v-tabs v-model="OutputsStore.activeTab" bg-color="secondary-container">
        <v-tab value="tab-1">教程</v-tab>
        <v-tab value="tab-2">代码</v-tab>
      </v-tabs>
    </v-toolbar>

    <v-window v-model="OutputsStore.activeTab" class="content-card">
      <v-window-item value="tab-1">
        <v-card flat>
          <v-card-text>
            <slot name="tab-1" />
          </v-card-text>
        </v-card>
      </v-window-item>

      <v-window-item value="tab-2">
        <v-card flat>
          <v-card-text>
            <slot name="tab-2" />
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style lang="scss" scoped>
#content-card-component {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.content-card {
  padding-bottom: 1.4rem;
  width: 100%;
  overflow: hidden;
}
</style>

<script setup lang="ts">
import { OutputsStore } from "@/workspace";
</script>
