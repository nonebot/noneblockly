<script setup lang="ts">
import ContentCard from "@/components/ContentCard.vue";
import TutorialTab from "@/components/TutorialTab.vue";
import CodeTab from "@/components/CodeTab.vue";
import ButtonPanel from "@/components/ButtonPanel.vue";
</script>

<template>
  <v-card flat class="mx-auto rounded-0">
    <v-container class="pa-0 ma-0">
      <ContentCard id="cotent-card">
        <template v-slot:tab-1>
          <TutorialTab />
        </template>
        <template v-slot:tab-2>
          <CodeTab />
        </template>
        <template v-slot:bottom> </template>
      </ContentCard>
    </v-container>
    <ButtonPanel />
  </v-card>
</template>
