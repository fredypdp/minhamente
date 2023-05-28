<template>
  <router-view/>
</template>

<script>
export default {
  created() {
    this.updatePageTitle()
  },
  watch: {
    '$route'(to, from) {
      this.updatePageTitle()
    }
  },
  methods: {
    updatePageTitle() {
      const pageTitle = this.$route.meta.title
      document.title = pageTitle || 'MinhaMente'
    }
  }
}
</script>