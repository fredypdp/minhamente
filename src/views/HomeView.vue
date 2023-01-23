<template>
  <div>
    <AppNavBar/>
    <AppAssuntosBar/>
    <AppApontamentos/>
  </div>
</template>

<script>
// @ is an alias to /src
import AppNavBar from '@/components/shared/AppNavBar.vue'
import AppAssuntosBar from '@/components/AppAssuntosBar.vue'
import AppApontamentos from '@/components/AppApontamentos.vue'

export default {
  name: 'HomeView',
  components: {
    AppNavBar,
    AppAssuntosBar,
    AppApontamentos
  }
}
</script>
