<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'

const message = ref()

function submit() {
  console.info(message.value)
}

function reset() {
  message.value = ''
}
</script>
<template>
  <div class="notes-tab flex flex-col w-full h-full gap-4">
    <textarea
      v-model="message"
      :placeholder="$t('write-note')"
      class="w-full h-full border p-2.5 text-sm bg-gray-50 rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    ></textarea>

    <div class="inline-flex justify-evenly">
      <FwbButton @click="submit()">Submit</FwbButton>
      <FwbButton @click="reset">Reset</FwbButton>
    </div>
  </div>
</template>
