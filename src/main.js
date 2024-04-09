import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faEye, faArrowLeft, faArrowLeftLong, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Recipe from "./data-store/Recipe";
import data from '../data.json';

library.add(faHeart, faEye, faArrowLeft, farHeart, faArrowLeftLong, faTrash);

if (Recipe.getRecipeList().length == 0) {
  data.forEach((recipeData) => {
    const recipe = new Recipe(
      recipeData.userId,
      recipeData.title,
      recipeData.description,
      recipeData.source,
      recipeData.image,
      recipeData.favs,
      recipeData.views,
      recipeData.ingredients
    );

    Recipe.save(recipe);
  });
}


createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");

