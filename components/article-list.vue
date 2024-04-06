<script setup lang="ts">
import { FwbAccordion, FwbAccordionContent, FwbAccordionHeader, FwbAccordionPanel } from 'flowbite-vue'

import type { IArticleHeadline } from '~/interfaces'

const $props = defineProps<{
  headlines: IArticleHeadline[]
}>()

const roots = computed(() => {
  return $props.headlines.map((headline) => headline.author).filter((author) => author)
})

const nodes = computed(() => {
  return Object.fromEntries(
    roots.value.map((root) => [root, $props.headlines.filter((headline) => headline.author === root)])
  )
})
</script>

<template>
  <div class="article__list">
    <client-only>
      <fwb-accordion flush class="overflow-y-auto max-h-[calc(50vh_-_3rem)]">
        <fwb-accordion-panel v-for="root in roots" :key="root">
          <fwb-accordion-header>{{ root }}</fwb-accordion-header>
          <fwb-accordion-content>
            <ul>
              <li
                v-for="node in nodes[root]"
                :key="node.title"
                class="p-2 cursor-pointer w-full hover:bg-gray-200 hover:dark:bg-gray-700"
              >
                {{ node.title }}
              </li>
            </ul>
          </fwb-accordion-content>
        </fwb-accordion-panel>
      </fwb-accordion>
    </client-only>
  </div>
</template>
