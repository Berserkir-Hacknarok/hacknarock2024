<script setup lang="ts">
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'

import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

const $i18n = useI18n()
const $router = useRouter()
const $route = useRoute()

const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  ($i18n.locales.value as LocaleObject[]).filter((locale) => locale.code !== $i18n.locale.value)
)

/**
 * Locale redirect with query
 *
 * @param {string} code - Locale code
 */
function redirectWithQuery(code: string) {
  $router.push({
    path: switchLocalePath(code),
    query: $route.query
  })
}
</script>

<template>
  <fwb-dropdown text="Change language">
    <fwb-list-group>
      <fwb-list-group-item
        v-for="lang in availableLocales"
        :key="lang.code"
        class="cursor-pointer"
        @click="redirectWithQuery(lang.code)"
      >
        {{ lang.name }}
      </fwb-list-group-item>
    </fwb-list-group>
  </fwb-dropdown>
</template>
