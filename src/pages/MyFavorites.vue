<template>
  <b-container style="max-width: 1980px; width: 85%;margin-top: 3%;margin-bottom: 3%;">
    <b-row>    
      <!-- <b-col  class="col-md-4 mt-4" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col> -->
       <b-card-group
              class="col-md-4 mt-4 "
              v-for="r in recipes"
              :key="r.id"
            >
            <RecipePreview class="recipePreview" :recipe="r" />
        </b-card-group>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "MyFavorites",
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
          this.$root.store.serverDomain+"/users/favorites",{withCredentials: true}
        );

        console.log(response);
        const recipes = response.data;
        this.recipes = [];
        // this.recipes.push(...recipes);
        console.log(recipes);
        recipes.forEach(element => {
            console.log(element);
            this.recipes.push(element)
        });
        console.log(this.recipes);
        if(this.$root.store.username){
          this.recipes.forEach((recipe)=>{
            recipe.userView=true;
            recipe.userFavorite=true;
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
