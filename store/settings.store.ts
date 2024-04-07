import { defineStore } from 'pinia'

import { AVAILABLE_GAMES, SOCIAL_MEDIA } from '~/settings/constants'

export default defineStore({
  id: 'settings-store',
  persist: true,
  state: () => {
    return {
      game: AVAILABLE_GAMES[0],
      shorts: SOCIAL_MEDIA[0],
      focusMode: true
    }
  }
})
