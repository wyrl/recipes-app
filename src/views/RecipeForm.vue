<template>
    <div id="bg" style="min-height: 100vh" class="flex justify-center">
        <div style="width: 600px;margin: 0 auto;height: auto;"
            class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 self-center">
            <h1 class="text-3xl text-center mb-4">New Recipe</h1>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2">
                        Title
                    </label>
                    <input v-model="title.field"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text"
                        placeholder="Title">
                    <small v-if="title.error" class="text-red-500">{{ title.errorMsg }}</small>
                </div>
                <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2">
                        Description
                    </label>
                    <textarea v-model="description.field"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        placeholder="Description"></textarea>
                    <small v-if="description.error" class="text-red-500">{{ description.errorMsg }}</small>
                </div>
                <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2">
                        Source
                    </label>
                    <input v-model="source.field"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text"
                        placeholder="Source">
                    <small v-if="source.error" class="text-red-500">{{ source.errorMsg }}</small>
                </div>
                <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2">
                        Upload an image
                    </label>
                    <input class="mb-4" type="file" name="image-file" accept="image/*" @change="handleImageUpload">
                    <img :src="base64Image" />
                </div>
                <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2">
                        Ingredients
                    </label>
                    <ul class="pl-2 mb-4">
                        <li v-for="(ingredient, i) of ingredients" :key="i">- {{ ingredient }}</li>
                    </ul>
                    <input v-model="inputIngredient" @keydown.enter="onEnterIngredient"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text"
                        placeholder="Enter an ingredient">
                    <small class="text-sm">Enter an ingredient and press the 'Enter' key.</small>
                </div>
                <div class="flex items-center">
                    <button :disabled="isPosted" class="mr-4 bg-blue-500 disabled:bg-blue-300 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                        type="submit">
                        Submit
                    </button>
                    <p v-if="isPosted">You have successfully posted a new recipe.<br>Please check <router-link
                            :to="{ name: 'recipe-list' }" class="text-blue-500">here</router-link> to review.</p>
                </div>
                <a class="mt-6 flex text-blue-500" href="javascript:void(0);" @click="goBack"><font-awesome-icon
                        class="text-2xl mr-3" icon="fa-solid fa-arrow-left-long" /> Go back </a>
            </form>
        </div>
    </div>
</template>

<script>
import User from '@/datastore/User';
import Recipe from '@/datastore/Recipe';
import Validation from '@/Validation';


export default {
    methods: {
        submitForm() {

        }
    },
    data() {
        return {
            isPosted: false,
            title: new Validation('Title', ['required']),
            description: new Validation('Description', ['required']),
            source: new Validation('Source', ['required']),
            base64Image: '',
            inputIngredient: '',
            ingredients: []
        }
    },
    computed: {
        bgImage() {
            return `url(${require('../assets/images/bg.png')})`
        }
    },
    methods: {
        handleImageUpload(event) {
            const selectedImage = event.target.files[0]

            if (!selectedImage) {
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(selectedImage)
            reader.onload = (event) => {
                this.base64Image = event.target.result;
            }
        },
        onEnterIngredient(event) {
            event.preventDefault();
            this.ingredients.push(this.inputIngredient);
            this.inputIngredient = '';

        },
        submitForm() {
            if (this.checkValidation()) {
                const user = User.getUserLogged();
                const recipe = new Recipe(
                    user.id,
                    this.title.field,
                    this.description.field,
                    this.source.field,
                    this.base64Image,
                    [],
                    [],
                    this.ingredients);

                Recipe.save(recipe)
                this.isPosted = true
                this.reset()
            }



        },
        checkValidation() {
            let valid = true

            if (!this.title.valid()) {
                valid = false
            }

            if (!this.description.valid()) {
                valid = false
            }

            if (!this.source.valid()) {
                valid = false
            }

            return valid;
        },
        reset() {
            this.title.field = ''
            this.description.field = ''
            this.source.field = ''
            this.base64Image = ''
            this.ingredients = []
        },
        goBack() {
            window.history.back();
        }
    }
}
</script>

<style scoped>
#bg {
    background-image: v-bind("bgImage");
    background-size: 100% auto;
    background-position: center;
    background-repeat: no-repeat;
}
</style>