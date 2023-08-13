<script>
export default {
  methods: {

  },
  props: ['data'],
  mounted() {

  },
  computed: {
    image() {
      if(!this.data.image) return undefined;

      if(this.data.image.includes('data:image')){
        return this.data.image;
      }
      
      return require(`../assets/images/${this.data.image}`)
    }
  }
}
</script>


<template>
  <div class="recipe-item bg-white rounded shadow border flex flex-col items-center">
    <router-link class="w-full" :to="{ name: 'recipe-info', params: { id: data.id } }">
      <div class="image-box w-full h-full">
        <h5 class="text-3xl font-bold mb-4 mt-0">{{ data.title }}</h5>
        <img :src="image" style="height: 200px" />
        <div class="overlay"
          style="display:none; position: absolute;top: 0;left: 0;height: 100%;width: 100%;background-color: #1655b73b;">
        </div>
      </div>
    </router-link>
    <div class="self-baseline p-3" v-if="data.source">source: <a class="text-blue-600" :href="data.source">{{ data.source }}</a></div>
    <div class="flex items-center w-full p-3">
      <div class="favorite-count">
        <font-awesome-icon icon="heart" class="text-red-500" /> <span class="ml-2">{{ data.favs.length }}</span>
      </div>
      <div class="view-count ml-4">
        <font-awesome-icon icon="eye" /> <span class="ml-2">{{ data.views.length }}</span>
      </div>
    </div>
  </div>
</template>

<style>

/* .recipe-item {
  height: 200px;
} */

.recipe-item:hover .overlay {
  display: block !important;
  cursor: pointer;
}

.recipe-item .image-box {
  position: relative;
}

.recipe-item h5 {
  position: absolute;
  background-color: rgba(180, 180, 180, 0.74);
  width: 100%;
  padding: 10px;
}

.recipe-item img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>