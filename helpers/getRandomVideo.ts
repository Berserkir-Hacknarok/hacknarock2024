import { VIDEOS } from '~/settings/constants'

export default function getRandomVideo(platform: keyof typeof VIDEOS): string {
  const videos = VIDEOS[platform]
  return videos[Math.floor(Math.random() * videos.length)]
}
