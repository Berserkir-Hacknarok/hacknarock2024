<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [StarterKit]
})
</script>

<template>
  <editor-content class="codeEditor w-full h-full p-4" :editor="editor" />
</template>
