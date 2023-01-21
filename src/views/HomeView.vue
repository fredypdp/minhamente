<template>
  <div class="home">
    <AppNavBar/>
  </div>
</template>

<script>
// @ is an alias to /src
import AppNavBar from '@/components/shared/AppNavBar.vue'

export default {
  name: 'HomeView',
  components: {
    AppNavBar
  }
}
</script>
