<script setup>
import { FwbCard, FwbTab, FwbTabs } from 'flowbite-vue'

const activeTab = ref('first')
</script>

<template>
  <div class="app-tabs flex flex-col w-full h-full justify-start items-center">
    <FwbCard class="h-full w-full !max-w-full overflow-auto [&>*]:h-full" variant="image">
      <FwbTabs v-model="activeTab" class="p-4 h-[calc(100%_-_4rem)] [&>*]:h-full">
        <FwbTab name="article-tabs" :title="$t('articles')">
          <ArticleTab />
        </FwbTab>
        <FwbTab name="game-tab" :title="$t('game')">
          <GameTab />
        </FwbTab>
        <FwbTab name="shorts-tab" :title="$t('shorts')">
          <ShortsTab />
        </FwbTab>
        <FwbTab name="notes-tab" :title="$t('notes')">
          <NotesTab />
        </FwbTab>
        <FwbTab name="wolfree-tab" :title="$t('wolfree')">
          <WolfreeTab />
        </FwbTab>
        <FwbTab name="settings-tab" :title="$t('settings')">
          <SettingsTab />
        </FwbTab>
      </FwbTabs>
    </FwbCard>
  </div>
</template>
