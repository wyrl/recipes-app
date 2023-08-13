<script>
import User from '@/datastore/User';
import DropdownButton from './DropdownButton.vue';

export default {
  name: 'Header',
  components: { DropdownButton },
  props: {
    msg: String,
    backAction: Boolean
  },
  data() {
    return {
      loggedIn: false
    }
  },
  computed: {
    userLoggedIn() {
      return User.getUserLogged()
    }
  },
  mounted() {
    this.loggedIn = this.userLoggedIn
  },
  methods: {
    logout() {
      User.removeUserLogged()
      this.loggedIn = false
    }
  }
}
</script>


<template>
  <header class="bg-blue-500 p-4 text-white text-center">
    <div class="flex">
      <button class="ml-5" v-if="backAction" @click="$router.back()"><font-awesome-icon class="text-2xl"
          icon="arrow-left" /></button>
      <h1 class="text-4xl font-bold mx-auto">
        <router-link :to="{ name: 'home' }">Recipes</router-link><br>
      </h1>
      <div v-if="!loggedIn" class="flex">
        <router-link :to="{ name: 'signin' }" class="p-2 mr-2">Sign In</router-link>
        <router-link :to="{ name: 'signup' }" class="mr-10 border p-2">Sign Up</router-link>
      </div>
      <div v-else class="flex items-center">
        <DropdownButton :text="`${userLoggedIn.firstname} ${userLoggedIn.lastname}`">
          <router-link :to="{ name: 'recipe-new' }" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Post a new recipe</router-link>
          <router-link :to="{ name: 'recipe-list' }" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem">See posted recipes</router-link>
          <a @click="logout" href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
            id="menu-item-0">Logout</a>

        </DropdownButton>
      </div>
    </div>
  </header>
</template>



