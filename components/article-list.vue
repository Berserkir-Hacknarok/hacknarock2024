<script setup lang="ts">
import { ref } from 'vue'
import Vue3Treeview from 'vue3-treeview'

const nodes = ref({
  id1: {
    text: 'text1',
    children: ['id11', 'id12']
  },
  id11: {
    text: 'text11'
  },
  id12: {
    text: 'text12'
  },
  id2: {
    text: 'text2'
  }
})

const config = ref({
  collapsed: false,
  roots: ['id1', 'id2']
})
</script>

<template>
  <div class="article__list">
    <vue3-treeview :nodes="nodes" :config="config" />
  </div>
</template>
