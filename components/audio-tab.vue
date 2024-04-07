<template>
  <div class="audio-tab w-full">
    <audio controls>
      <source :src="audioPath" type="audio" />
      Your browser does not support the audio element.
    </audio>
    <FwbButton> Previous </FwbButton>
    <FwbButton> Next </FwbButton>

    <fwb-dropdown class="w-full">
      <template #trigger>
        <span class="inline-flex w-full justify-between gap-4">
          <FwbInput v-model="currSource" />

          <FwbButton @click="addSource()">+</FwbButton>
        </span>
      </template>
      <fwb-list-group>
        <fwb-list-group-item v-for="source in audioSources" :key="source" @click="selectSource(source)">
          {{ source }} <FwbButton @click="deleteSource(source)">-</FwbButton>
        </fwb-list-group-item>
      </fwb-list-group>
    </fwb-dropdown>
  </div>
</template>

<script setup lang="ts">
import { FwbDropdown, FwbListGroup, FwbListGroupItem, FwbButton, FwbInput } from 'flowbite-vue'

const audioPath = ref('')
const currSource = ref('')
const audioSources = ref<string[]>([])

function addSource() {
  audioSources.value.push(currSource.value)
  console.info(audioSources.value)
  console.info(currSource.value)
  currSource.value = ''
}

function selectSource(source: string) {
  audioPath.value = source
}

function deleteSource(source: string) {
  audioSources.value = audioSources.value.filter((src) => src !== source)
}
</script>
