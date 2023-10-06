<template>
  <router-view/>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()

updatePageTitle()

watch(route, (to, from) => {
  updatePageTitle()
}, {deep: true})

function updatePageTitle() {
  const pageTitle = route.meta.title
  
  if (typeof pageTitle === 'string') {
    document.title = pageTitle || 'MinhaMente'
  } else {
    document.title = 'MinhaMente'
  }
}
</script>