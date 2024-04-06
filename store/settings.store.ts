import { defineStore } from 'pinia'

export const AVAILABLE_GAMES = [
  'BlumgiMagicBall',
  'HeadSoccer2022',
  'combat',
  'igra-fizika-boxa-2',
  'igra-stik-duel-boj-s-tenyu',
  'madburger',
  'school_surfers_v1',
  'sticky-road',
  'subway-surfers',
  'subway',
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
      shorts: SOCIAL_MEDIA[0]
    }
  }
})
