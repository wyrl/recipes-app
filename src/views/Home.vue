<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import recipeData from "../../data.json"


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
      console.log("Test...");
    }
  },
  mounted(){
    this.recipes = recipeData;
  }
}
</script>

<template>
  <Header />
  <h2 class="text-lg text-center mt-6"><span class="font-bold">Note:</span> This is just a demo. Regarding data privacy, no personal data is being collected or stored database.</h2>
  <div class="container mx-auto">
    <div id="recommended" class="flex flex-col p-10">
      <h4 class="text-3xl font-bold mb-10">Recommended</h4>
      <div id="recommended-items" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        <RecipeCard v-for="recipe in recipes" :key="recipe.id" :data="recipe" />
      </div>
    </div>
  </div>
  <Footer />
</template>

