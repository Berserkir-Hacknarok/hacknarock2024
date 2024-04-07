<script setup lang="ts">
import { FwbButton, FwbSelect } from 'flowbite-vue'

const message = ref()
const noteId = ref()
const { data: notes } = useLazyAsyncData('notes', async () =>
  (await $fetch('/api/notes')).results.map((r) => ({ ...r, name: `(${r.value}) ${r.name.slice(0, 20)}` }))
)

async function submit() {
  const { results } = await $fetch('/api/notes', {
    method: 'POST',
    body: { note: message.value }
  })
  console.info(message.value)
  console.info(results)
}

function reset() {
  message.value = ''
}
</script>
<template>
  <div class="notes-tab flex flex-col w-full h-full gap-4">
    {{ notes }}

    <FwbSelect v-model="noteId" :options="notes" />
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
