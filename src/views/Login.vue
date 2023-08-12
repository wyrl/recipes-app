<script>
export default {
  data() {
    return {
      bgColor: 'red'
    }
  },
  computed:{
    bgImage(){
      return `url(${require('../assets/images/bg.png')})`
    }
  }
}
</script>


<template>
  <div id="login-page" style="height: 100vh" class="flex justify-center">
    <div style="width: 600px;margin: 0 auto;height: auto;"
      class="bg-[#ffffffb2] shadow-lg rounded px-8 pt-6 pb-8 mb-4 self-center">
      <h1 class="text-3xl text-center mb-4">Sign In</h1>
      <form>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email"
            placeholder="Email">
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password" type="password" placeholder="******************">
          <!-- <p class="text-red text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
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
</template>

<style>
#login-page {
  background-image: v-bind("bgImage");
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
}
</style>