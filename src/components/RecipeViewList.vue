<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipeViewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
           this.$root.store.serverDomain+"/users/userOn",{withCredentials: true}
        );

        console.log(response);
        const recipes = response.data.result;
        this.recipes = [];
        this.recipes.push(...recipes);
        if(this.$root.store.username){
          const favorites= response.data.favorite;
          this.recipes.forEach((recipe)=>{
            recipe.userView=true;
            recipe.userFavorite=favorites[recipe.id];
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>