<script setup lang="ts">
import { FwbButton, FwbSelect } from 'flowbite-vue'

import type { OptionsType } from 'flowbite-vue/components/FwbSelect/types.js'

const message = ref()
const noteId = ref('-1')

const $i18n = useI18n()

const { data: notes } = useLazyAsyncData('notes', async () =>
  (await $fetch('/api/notes')).results
    .map((r) => ({ ...r, name: `(${r.value}) ${r.name.slice(0, 20)}` }))
    .sort((a, b) => a.value - b.value)
)

const notesOptions = computed(
  () =>
    [
      { value: -1, name: $i18n.t('new') },
      ...(notes.value?.map((note) => ({ value: String(note.value), name: note.name })) || [])
    ] as unknown as OptionsType[]
)

async function submit() {
  await $fetch('/api/notes', {
    method: 'POST',
    body: { note: message.value, id: Number(noteId.value || -1) }
  })

  await refreshNuxtData('notes')
}

function reset() {
  message.value = ''
}

watch(noteId, (id) => {
  const note = notes.value?.find((n) => Number(n.value) === Number(id))

  if (note) {
    message.value = note.note
  } else {
    message.value = ''
  }
})
</script>

<template>
  <div class="notes-tab flex flex-col w-full h-full gap-4">
    {{ notes }}

    <FwbSelect v-model="noteId" :options="notesOptions" />

    <textarea
      id="notes-element"
      v-model="message"
      :placeholder="$t('write-note')"
      class="w-full h-full border p-2.5 text-sm bg-gray-50 rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    ></textarea>

    <div class="inline-flex justify-evenly">
      <FwbButton class="flowbite" @click="submit()">Submit</FwbButton>
      <FwbButton class="flowbite" @click="reset()">Reset</FwbButton>
    </div>
  </div>
</template>
