<script setup lang="ts">
const message = ref()

function submit() {
  console.log(message.value)
}

function reset(){
  message.value='';
}
</script>
<template>
  <div class="notes flex flex-col">
    <span>Notepad</span>
    <p style="white-space: pre-line">{{ message }}</p>
    <textarea v-model="message" placeholder="add multiple lines" class="bg-transparent"></textarea>
    <div class="inline-flex justify-between">
      <button @click="submit()">Submit</button>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>
