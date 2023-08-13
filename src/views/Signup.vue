<script>
import Validation from '@/Validation';
import User from '@/datastore/User'

export default {
  computed: {
    bgImage() {
      return `url(${require('../assets/images/bg.png')})`
    }
  },
  data() {
    return {
      isRegistered: false,
      firstname: new Validation("First Name", ["required"]),
      lastname: new Validation("Last Name", ["required"]),
      email: new Validation("Email", ["required", "email"]),
      password: new Validation("Password", ["required"]),
      confirmPassword: new Validation("Confirm Password", ["required", { ruleName: "equal", targetName: "Password" }]),
    }
  },
  methods: {
    submitForm() {
      this.isRegistered = false
      if (this.checkValidation()) {
        const user = new User(this.firstname.field, this.lastname.field, this.email.field, this.password.field);
        User.save(user)
        this.isRegistered = true
        this.resetFields()
      }
    },
    checkValidation() {
      let valid = true

      if(!this.firstname.valid()){
        valid = false
      }

      if(!this.lastname.valid()){
        valid = false
      }

      if(!this.email.valid()){
        valid = false
      }

      if(User.getUserByEmail(this.email.field)){
        this.email.error = true
        this.email.errorMsg = "Your email has already been used."
        valid = false
      }

      if(!this.password.valid()){
        valid = false
      }

      if(!this.confirmPassword.valid(this.password.field)){
        valid = false
      }

      return valid;
    },
    resetFields(){
      [ this.firstname, 
        this.lastname, 
        this.email, 
        this.password, 
        this.confirmPassword ].forEach((validation) => validation.reset())
    }
  }
}
</script>


<template>
  <div id="signup-page" style="height: 100vh" class="flex justify-center">
    <div style="width: 600px;margin: 0 auto;height: auto;"
      class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 self-center">
      <h1 class="text-3xl text-center mb-4">Sign In</h1>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-5 mb-4">
          <div>
            <label class="block text-grey-darker text-sm font-bold mb-2" for="firstname">
              Firstname
            </label>
            <input v-model="firstname.field"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="firstname" type="text"
              placeholder="Firstname">
            <small v-if="firstname.error" class="text-red-500">{{ firstname.errorMsg }}</small>
          </div>
          <div>
            <label class="block text-grey-darker text-sm font-bold mb-2" for="lastname">
              Lastname
            </label>
            <input v-model="lastname.field"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="lastname" type="text"
              placeholder="Lastname">
            <small v-if="lastname.error" class="text-red-500">{{ lastname.errorMsg }}</small>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Email
          </label>
          <input v-model="email.field" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="email" type="email" placeholder="Email">
          <small v-if="email.error" class="text-red-500">{{ email.errorMsg }}</small>
        </div>
        <div class="grid grid-cols-2 gap-5 mb-6">
          <div>
            <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input v-model="password.field"
              class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password" type="password" placeholder="******************">
            <small v-if="password.error" class="text-red-500">{{ password.errorMsg }}</small>
          </div>
          <div>
            <label class="block text-grey-darker text-sm font-bold mb-2" for="confirm-password">
              Confirm Password
            </label>
            <input v-model="confirmPassword.field"
              class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="confirm-password" type="password" placeholder="******************">
            <small v-if="confirmPassword.error" class="text-red-500">{{ confirmPassword.errorMsg }}</small>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-[100px] mr-4">
            Sign Up
          </button>
          <h3 v-if="isRegistered"><span class="text-green-500">Congratulations! You've registered</span>. Now, click <router-link :to="{name: 'signin'}" class="text-blue-500">login</router-link> to check if exists.</h3>
          <!-- <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
            Forgot Password?
          </a> -->
        </div>
      </form>
      <router-link class="mt-6 flex text-blue-500" :to="{ name: 'home' }">
        <font-awesome-icon class="text-2xl mr-3" icon="fa-solid fa-arrow-left-long" /> Go back to home
      </router-link>
    </div>
  </div>
</template>

<style>
#signup-page {
  background-image: v-bind("bgImage");
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
}
</style>