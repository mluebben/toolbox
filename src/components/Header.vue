<template>
    <header>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <router-link :to="{name: 'home'}" custom v-slot="{navigate, href}">
          <a class="navbar-brand" :href="href" @click="navigate">Toolbox</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <navigation-link routeName="hashes">Hashes</navigation-link>
            <navigation-link routeName="base64">Base64</navigation-link>
            <navigation-link routeName="about">About</navigation-link>
          </ul>
          <!--
          <form class="form-inline mt-2 mt-md-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          -->
        </div>
      </nav>
    </header>
</template>

<script>
import NavigationLink from '@/components/NavigationLink.vue'

export default {
  components: {
    'navigation-link': NavigationLink
  }
}
</script>