<template>
  <router-view/>
</template>

<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";

  const route = useRoute()
  
  updatePageTitle()

  watch(route, (to, from) => {
    updatePageTitle()
  }, {deep: true})

  function updatePageTitle() {
    const pageTitle = route.meta.title
    document.title = pageTitle || 'MinhaMente'
  }
</script>