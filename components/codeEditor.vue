<template>
  <div>
    <iframe
      ref="iframe"
      :src="onlineGDBUrl"
      frameborder="0"
      style="border: 0; width: 100%"
      :height="iframeHeight + 'px'"
      allowfullscreen
    >
    </iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onlineGDBUrl: 'https://www.onlinegdb.com/',
      iframeHeight: 0
    }
  },
  mounted() {
    this.adjustIframeHeight()
    window.addEventListener('resize', this.adjustIframeHeight)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustIframeHeight)
  },
  methods: {
    adjustIframeHeight() {
      const iframe = this.$refs.iframe
      if (iframe) {
        const bodyHeight = iframe.contentWindow.document.body.scrollHeight
        this.iframeHeight = bodyHeight
      }
    }
  }
}
</script>

<style>
/* Add your custom styles here if needed */
</style>
