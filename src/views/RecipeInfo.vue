<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Recipe from '@/datastore/Recipe';
import User from '@/datastore/User';

export default {
  components: {
    Header, Footer
  },
  data() {
    return {
      recipeInfo: new Recipe(),
      favorite: false
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.recipeInfo = Recipe.getRecipeById(id);
    const user = User.getUserLogged();

    let recipe = Object.assign(new Recipe(), { ...this.recipeInfo });
    this.recipeInfo = recipe;

    if (user) {

      if (!recipe.isUserViewExists(user.id)) {
        this.recipeInfo.views.push(user.id);
        Recipe.update(this.recipeInfo);
      }

      this.favorite = recipe.isUserFavExists(user.id);
    }
  },
  computed: {
    image() {
      if (!this.recipeInfo.image) return undefined;

      if (this.recipeInfo.image.includes("data:image")) {
        return this.recipeInfo.image;
      }

      return require(`../assets/images/${this.recipeInfo.image}`);
    },
    favIcon() {
      return (this.favorite ? 'fa-solid' : 'fa-regular') + ' fa-heart';
    }
  },
  methods: {
    onClickFavIcon() {
      const user = User.getUserLogged();

      if (user) {
        if (this.favorite) {
          this.recipeInfo.removeUserFav(user.id);
        } else {
          this.recipeInfo.addUserFav(user.id);
        }

        Recipe.update(this.recipeInfo);

        this.favorite = !this.favorite
      }
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
        <button @click="onClickFavIcon" class="text-2xl ml-5">
          <font-awesome-icon class="text-red-500" :icon="favIcon" /> {{ this.recipeInfo.favCount() }}
        </button>
        <span class="ml-5 text-2xl"><font-awesome-icon icon="fa-solid fa-eye" /> {{ this.recipeInfo.viewCount() }}</span>
      </div>
    </div>
    <div class="flex">
      <img class="w-[600px] h-auto" :src="image" />
      <div class="ml-4">
        <div v-if="recipeInfo.ingredients && recipeInfo.ingredients.length != 0" class="mb-4">
          <h3 class="text-2xl font-bold my-3">Ingredients:</h3>
          <ul class="ingredients">
            <li v-for="(ingredient, i) in recipeInfo.ingredients" :key="i">
              <input :id="'ing-' + i" type="checkbox" class="mr-2" />
              <label :for="'ing-' + i">{{ ingredient }}</label>
            </li>
          </ul>
        </div>
        <p>{{ recipeInfo.description }}</p>
      </div>
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