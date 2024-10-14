<script setup lang="ts">
import { initWorkspaceState } from "@/workspace";
</script>

<template>
  <v-card-text class="text-h5 pb-0">使用方法</v-card-text>
  <v-card-text>
    <p class="text-body-1">
      点击编程标签页左侧的工具箱标签，在对应工具箱中拖出块，在工作区中进行拼接完成图形化编程。
    </p>
  </v-card-text>
  <v-card-text>
    <v-btn color="tertiary" @click="initWorkspaceState">
      点此按钮加载示例
    </v-btn>
    （会覆盖当前工作区）
  </v-card-text>
  <v-card-text class="text-h6 pb-0">暂存与回复</v-card-text>
  <v-card-text>
    <p class="text-body-1">
      点击下方工具栏的“暂存”按钮可将当前设计暂存到浏览器中，点击“恢复”按钮可恢复上次暂存的设计。
    </p>
    <p class="text-body-1">
      已存在暂存的设计时，刷新页面或重新打开页面时会自动恢复上次暂存的设计。
    </p>
  </v-card-text>
  <v-card-text class="text-h6 pb-0">配置与导入导出</v-card-text>
  <v-card-text>
    <p class="text-body-1">
      点击下方工具栏的“导入导出”按钮或点击“配置”标签，可进行参数配置、设计文件的导入导出、以及
      NoneBot 工程的导出操作。
    </p>
    <p class="text-body-1">
      导出设计文件将生成一个 JSON 文件并下载到本地；导入设计文件需要选择已导出的
      JSON 文件上传。
    </p>
    <p class="text-body-1">
      导出 NoneBot
      工程将生成一个压缩文件并下载到本地，使用时需要先进行解压，在项目根目录运行对应平台的脚本
      （ Windows 平台为<code>./install.ps1</code> 和 <code>./run.ps1</code>；
      Linux 平台为 <code>bash ./install.sh</code> 和
      <code>bash ./run.sh</code>
      ）进行环境配置与运行。
    </p>
  </v-card-text>

  <v-card-text>
    <p class="text-body-1">详细使用文档正在编写中。</p>
  </v-card-text>
</template>
