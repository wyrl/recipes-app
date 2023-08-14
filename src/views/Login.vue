<script>
import User from '@/datastore/User';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMsg: ''
    }
  },
  computed:{
    bgImage(){
      return `url(${require('../assets/images/bg2.png')})`
    }
  },
  methods:{
    submitForm(){
      this.errorMsg = ''
      if(!User.login(this.email, this.password)){
        this.errorMsg = 'Incorrect Email or Password';
        return;
      }

      this.$router.push({ name: 'home' })
    }
  }
}
</script>


<template>
  <div id="login-page" style="height: 100vh" class="flex justify-center md:bg-cover md:bg-no-repeat bg-[length:100%_auto] bg-repeat">
    <div style="width: 600px;height: auto;"
      class="bg-[#ffffffe3] shadow-lg rounded px-8 pt-6 pb-8 mb-4 mx-4 self-center">
      <div class="m-10">
        <h1 class="text-3xl text-center mb-4">Sign In</h1>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
              Email
            </label>
            <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email"
              placeholder="Email">
          </div>
          <div>
            <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input v-model="password" class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password" type="password" placeholder="******************">
            <!-- <p class="text-red text-xs italic">Please choose a password.</p> -->
          </div>
          <div v-if="errorMsg" class="text-red-500 my-4">{{ errorMsg }}</div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="submit">
              Sign In
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <router-link class="mt-6 flex text-blue-500" :to="{name: 'home'}"><font-awesome-icon class="text-2xl mr-3" icon="fa-solid fa-arrow-left-long" /> Go back to home</router-link>
      </div>
    </div>
  </div>
</template>

<style>
#login-page {
  background-image: v-bind("bgImage");
}
</style>