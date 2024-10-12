<script setup lang="ts">
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blockly Vue Component.
 * @author dcoodien@gmail.com (Dylan Coodien)
 */

import { onMounted, ref, shallowRef } from "vue";
import * as Blockly from "blockly/core";

const props = defineProps(["options"]);
const blocklyToolbox = ref();
const blocklyDiv = ref();
const workspace = shallowRef();

defineExpose({ workspace });

onMounted(() => {
  const options = props.options || {};
  if (!options.toolbox) {
    options.toolbox = blocklyToolbox.value;
  }
  workspace.value = Blockly.inject(blocklyDiv.value, options);
});
</script>

<template>
  <div>
    <div class="blockly-div" ref="blocklyDiv"></div>
    <xml ref="blocklyToolbox">
      <slot></slot>
    </xml>
  </div>
</template>

<style scoped>
.blockly-div {
  height: 80vh;
  width: 100%;
  text-align: left;
}
</style>
