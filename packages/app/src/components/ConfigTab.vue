<script setup lang="ts">
import { outputsStore, exportZip } from "@/workspace";

const items = [
  { name: "console", description: "控制台机器人" },
  { name: "onebot", description: "OneBot V11 & V12" },
];

const itemProps = (item: { name: string; description: string }) => {
  return {
    title: item.name,
    subtitle: item.description,
  };
};

const nameRules = [
  (value: string) => {
    if (value) return true;
    return "请填写项目名称";
  },
];

const presetRules = [
  (value: string) => {
    if (value) return true;
    return "请选择一个预设";
  },
];

const portRules = [
  (value: string) => {
    if (!value) return "请填写端口";
    if (!/^\d+$/.test(value)) return "端口必须为数字";
    if (parseInt(value) < 1 || parseInt(value) > 65535)
      return "端口范围为 1-65535";
    return true;
  },
];
</script>

<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="outputsStore.export.name"
            :counter="10"
            :rules="nameRules"
            label="项目名称"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="outputsStore.export.preset"
            :item-props="itemProps"
            :items="items"
            :rules="presetRules"
            label="预设"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="outputsStore.export.port"
            :rules="portRules"
            label="端口"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="outputsStore.export.platform"
            label="包含 Windows 环境配置脚本"
            value="windows"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="outputsStore.export.platform"
            label="包含 Linux 环境配置脚本"
            value="linux"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-btn class="mt-4" @click="exportZip" block>
            导出 NoneBot 项目
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
