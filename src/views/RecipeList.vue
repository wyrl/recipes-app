<template>
    <div id="bg" class="md:bg-[length:100%_auto] bg-cover" style="min-height: 100vh">
        <div class="flex flex-col p-4 relative">
            <div class="md:absolute md:left-4 md:top-10">
                <router-link class="mt-6 flex text-blue-500" :to="{name: 'home'}"><font-awesome-icon class="text-2xl mr-3" icon="fa-solid fa-arrow-left-long" /> Go back to home</router-link>
            </div>
            <h1 class="self-center bg-[#3b82f6bd] shadow text-white p-4 rounded mt-10 text-4xl font-bold">Your posted recipes</h1>
            
        </div>
        <div class="p-4">
            <router-link :to="{name: 'recipe-new'}" class="bg-blue-500 py-2 px-4 rounded shadow text-white mb-6 inline-block">New</router-link>

            <div v-if="myRecipes.length !=0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                <RecipeCard v-for="recipe in myRecipes" :key="recipe.id" :data="recipe" />
            </div>
            <div class="text-center" v-else>
                <h1 class="text-2xl text-center bg-white rounded shadow py-4 px-[40px] inline-block">
                    You have no posted here. Click a <router-link :to="{ name: 'recipe-new' }" class="text-blue-500" >new recipe</router-link>.
                </h1>
            </div>
        </div>
    </div>
</template>

<script>
import RecipeCard from '@/components/RecipeCard.vue';
import Recipe from '@/datastore/Recipe';
import User from '@/datastore/User';

export default{
    computed: {
        bgImage() {
            return `url(${require('../assets/images/bg.png')})`;
        },
        myRecipes(){
            const user = User.getUserLogged();
            const recipes = Recipe.getRecipesByUserId(user.id);
            return recipes;
        }
    },
    components: { RecipeCard }
}
</script>

<style scoped>
#bg {
    background-image: v-bind("bgImage");
    background-position: center;
    background-repeat: no-repeat;
}
</style>