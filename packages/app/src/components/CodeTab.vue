<script setup lang="ts">
import { outputsStore } from "@/workspace";
</script>

<template>
  <v-card-text class="content-code">
    <highlightjs
      class="overflow-auto"
      :code="outputsStore.code"
      language="python"
      word-wrap
    />
  </v-card-text>
</template>

<style scoped>
.content-code {
  padding-left: 1em;
  font-family: ui-monospace !important;
}
</style>

<script lang="ts">
import hljsVuePlugin from "@highlightjs/vue-plugin";

export default {
  components: {
    highlightjs: hljsVuePlugin.component,
  },
};
</script>
