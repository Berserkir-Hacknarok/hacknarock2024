<template>
  <div class="audio-tab w-full">
    <iframe
      :src="audioPath"
      frameborder="0"
      class="w-full h-12"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>

    <span class="w-full inline-flex justify-evenly gap-4 my-4">
      <FwbButton class="w-1/4" :disabled="!audioSources.indexOf(audioPath)" @click="previousSource()">
        {{ $t('previous') }}
      </FwbButton>
      <FwbButton
        class="w-1/4"
        :disabled="audioSources.indexOf(audioPath) === audioSources.length - 1"
        @click="nextSource()"
      >
        {{ $t('next') }}
      </FwbButton>
    </span>

    <fwb-dropdown class="w-full [&>*]:w-full">
      <template #trigger>
        <span class="inline-flex w-full justify-between gap-4">
          <FwbInput v-model="currSource" class="w-full" />

          <FwbButton @click="addSource()">+</FwbButton>
        </span>
      </template>
      <fwb-list-group class="w-full">
        <fwb-list-group-item
          v-for="source in audioSources"
          :key="source"
          class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          @click="selectSource(source)"
        >
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

function previousSource() {
  const index = audioSources.value.indexOf(audioPath.value)

  if (index > 0) {
    audioPath.value = audioSources.value[index - 1]
  }
}

function nextSource() {
  const index = audioSources.value.indexOf(audioPath.value)

  if (index < audioSources.value.length - 1) {
    audioPath.value = audioSources.value[index + 1]
  }
}
</script>
