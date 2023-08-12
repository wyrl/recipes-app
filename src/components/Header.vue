<script>
export default {
  name: 'Header',
  props: {
    msg: String,
    backAction: Boolean
  }
}
</script>


<template>
  <header class="bg-blue-500 p-4 text-white text-center">
    <div class="flex">
      <button class="ml-5" v-if="backAction" @click="$router.back()"><font-awesome-icon class="text-2xl" icon="arrow-left" /></button>
      <h1 class="text-4xl font-bold mx-auto">
        <router-link :to="{ name: 'home' }">Recipes</router-link><br>
      </h1>
      <router-link :to="{name: 'signin'}" class="p-2 mr-2">Sign In</router-link>
      <router-link :to="{name: 'signup'}" class="mr-10 border p-2">Sign Up</router-link>
    </div>
  </header>
</template>



