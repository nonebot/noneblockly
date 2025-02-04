<script setup lang="ts">
import { ref } from "vue";
import {
  exportConfig,
  exportProject,
  importProject,
  exportZip,
} from "@/workspace";

const file = ref<File | null>(null);

const presets = [
  { name: "console", description: "控制台机器人" },
  { name: "onebot", description: "OneBot V11 & V12" },
];

const commandStarts = ["/", "", ".", "*", "!", "#", "$", "%", "&", "?"];

const itemProps = (item: { name: string; description: string }) => {
  return {
    title: item.name,
    subtitle: item.description,
  };
};

const nameRules = [
  (value: string) => {
    if (!value) return "请填写项目名称";
    if (!/^[a-zA-Z0-9_-]+$/.test(value))
      return "项目名称只能包含字母、数字、下划线和短横线";
    return true;
  },
];

const presetRules = [
  (value: string) => {
    if (!value) return "请选择一个预设";
    return true;
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

const commandStartRules = [
  (value: string) => {
    if (!value) return "请选择至少一个命令起始符";
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
            v-model="exportConfig.name"
            :counter="10"
            :rules="nameRules"
            label="项目名称"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="exportConfig.preset"
            :item-props="itemProps"
            :items="presets"
            :rules="presetRules"
            label="预设"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="exportConfig.port"
            :rules="portRules"
            label="端口"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-combobox
            v-model="exportConfig.commandStart"
            :rules="commandStartRules"
            :items="commandStarts"
            label="命令起始符列表"
            chips
            multiple
          ></v-combobox>
        </v-col>
        <v-col cols="12" md="4">
          <v-combobox
            v-model="exportConfig.superusers"
            :items="[]"
            label="超级用户列表"
            chips
            multiple
          ></v-combobox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="exportConfig.platform"
            label="包含 Windows 环境配置脚本"
            value="windows"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="exportConfig.platform"
            label="包含 Linux 环境配置脚本"
            value="linux"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" class="mt-4" color="tertiary" block
                >导入设计文件</v-btn
              >
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="导入设计文件">
                <v-container>
                  <v-file-input
                    v-model="file"
                    label="Upload JSON file"
                    accept=".json"
                    @change="importProject"
                    outlined
                  ></v-file-input>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="关闭" @click="isActive.value = false"></v-btn>
                  </v-card-actions>
                </v-container>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn @click="exportProject" class="mt-4" color="secondary" block>
            导出设计文件
          </v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn @click="exportZip" class="mt-4" color="primary" block>
            导出 NoneBot 项目
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
