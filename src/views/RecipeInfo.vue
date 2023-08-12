<script>
import recipeData from "../../data.json"
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header, Footer
  },
  data() {
    return {
      recipeInfo: {},
      favorite: false
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.recipeInfo = recipeData.find(recipe => recipe.id == id);
  },
  computed: {
    image() {
      if (this.recipeInfo.image) {
        return require(`../assets/images/${this.recipeInfo.image}`)
      }
      return ""
    },
    favIcon() {
      return (this.favorite ? 'fa-solid' : 'fa-regular') + ' fa-heart';
    }
  }
}
</script>

<template>
  <Header :back-action="true" />
  <div class="container mx-auto p-10">
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-3xl font-bold text-center mt-10 mb-4">{{ recipeInfo.title }} </h2>
      <div class="mb-4">
        <button @click="favorite = !favorite" class="text-2xl ml-5">
          <font-awesome-icon class="text-red-500" :icon="favIcon" /> 0
        </button>
        <span class="ml-5 text-2xl"><font-awesome-icon icon="fa-solid fa-eye" /> 0</span>
      </div>
    </div>
    <div>
      <img class="mx-auto" :src="image" style="height: 600px" />
    </div>
    <div>
      <h3 class="text-2xl font-bold my-3">Ingredients:</h3>
      <ul class="ingredients">
        <li v-for="(ingredient, i) in recipeInfo.ingredients" :key="i">
          <input :id="'ing-' + i" type="checkbox" class="mr-2" />
          <label :for="'ing-' + i">{{ ingredient }}</label>
        </li>
      </ul>
    </div>
  </div>
  <Footer />
</template>

<style>
.ingredients {
  padding-left: 2rem;
}

.ingredients input[type=checkbox]:checked~label {
  text-decoration: line-through;
}
</style>