import { KEY_RECIPE_DATA, KEY_RECIPE_LAST_ID } from "./data-config.js";

export default class Recipe {
  id = undefined;
  constructor(userId, title, description, source, image, favs = [], views = [], ingredients = []) {
    this.userId = userId
    this.title = title;
    this.description = description;
    this.source = source;
    this.image = image;
    this.favs = favs;
    this.views = views;
    this.ingredients = ingredients;
  }

  isUserViewExists(userId) {
    return this.views.indexOf(userId) != -1;
  }

  isUserFavExists(userId) {
    return this.favs.indexOf(userId) != -1;
  }

  removeUserFav(userId) {
    this.favs = this.favs
      .filter((uId) => uId != userId)
  }

  addUserFav(userId) {
    this.favs.push(userId);
  }

  favCount() {
    return this.favs.length;
  }

  viewCount() {
    return this.views.length;
  }

  static save(recipe) {
    const recipeList = Recipe.getRecipeList();
    recipe.id = Recipe.generateNewId()
    recipeList.push(recipe);

    localStorage.setItem(KEY_RECIPE_DATA, JSON.stringify(recipeList));
  }

  static update(recipe) {
    const recipeList = Recipe.getRecipeList().map((r) => r.id == recipe.id ? recipe : r);
    localStorage.setItem(KEY_RECIPE_DATA, JSON.stringify(recipeList));
  }

  static getRecipesByUserId(userId) {
    const recipeList = Recipe.getRecipeList();
    return recipeList.filter((recipe) => recipe.userId == userId);
  }

  static getRecipeById(id) {
    const recipeList = Recipe.getRecipeList();
    return recipeList.filter((recipe) => recipe.id == id)[0];
  }

  static getRecipeList() {
    let data = localStorage.getItem(KEY_RECIPE_DATA);

    if (!data) {
      data = JSON.stringify([]);
      localStorage.setItem(KEY_RECIPE_DATA, data);
    }

    return JSON.parse(data);
  }

  static generateNewId() {
    const newId = Recipe.getLastId() + 1;
    localStorage.setItem(KEY_RECIPE_LAST_ID, newId);
    return newId;
  }

  static getLastId() {
    const lastId = localStorage.getItem(KEY_RECIPE_LAST_ID);

    if (!lastId) {
      return 0;
    }

    return Number(lastId);
  }
}
