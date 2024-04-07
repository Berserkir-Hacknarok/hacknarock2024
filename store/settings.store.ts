import { defineStore } from 'pinia'

export const AVAILABLE_GAMES = [
  'subway',
  'BlumgiMagicBall',
  'HeadSoccer2022',
  'combat',
  'igra-fizika-boxa-2',
  'igra-stik-duel-boj-s-tenyu',
  'madburger',
  'school_surfers_v1',
  'sticky-road',
  'subway-surfers',
  'teacher',
  'tennin-physics'
]

export const SOCIAL_MEDIA = ['tiktok', 'facebook', 'instagram', 'youtube']

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
