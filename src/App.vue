<template>
  <div class="d-flex flex-column min-vh-100">
    <the-header />

    <!-- Begin page content -->
    <main role="main" class="container">
      <router-view/>
    </main>

    <the-footer class="mt-auto" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    'the-header': Header,
    'the-footer': Footer
  }
}
</script>
