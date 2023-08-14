<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import Recipe from '@/datastore/Recipe'


export default {
  name: "Home",
  components: { Header, RecipeCard, Footer },
  data(){
    return {
      recipes: []
    }
  },
  methods: {
    recipeClick(){

    }
  },
  mounted(){
    this.recipes = Recipe.getRecipeList().slice(0, 4);
  }
}
</script>

<template>
  <Header />
  <h2 class="text-lg text-center bg-yellow-300 p-4"><span class="font-bold">Note:</span> This is just a demo. Regarding data privacy, no personal data is being collected or stored in the database. Instead, mock data is being used and stored locally in the local storage. For more information about local storage in JavaScript, you can refer to <a class="underline" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">Web Storage API</a>.</h2>
  <div class="container mx-auto">
    <div id="recommended" class="p-10 text-center">
      <h4 class="text-3xl font-bold mb-10">Recommended</h4>
      <div id="recommended-items" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        <RecipeCard v-for="recipe in recipes" :key="recipe.id" :data="recipe" />
      </div>
      <a href="#" class="bg-blue-500 rounded shadow py-2 px-4 text-white mt-10 inline-block">More</a>
    </div>
  </div>
  <Footer />
</template>

<style>
#recommended {
  min-height: calc(100vh - 280px);
}
</style>
