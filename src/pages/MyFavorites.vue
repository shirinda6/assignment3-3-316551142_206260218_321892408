<template>
  <b-container style="max-width: 1980px; width: 85%;margin-top: 3%;margin-bottom: 3%;">
        <h1 class="title" style="margin-left:30%; margin-top: 2%;font-size: 36pt;font-family: Comfortaa;">My Favorite Recipes</h1>

    <b-row>    
      <!-- <b-col  class="col-md-4 mt-4" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col> -->
       <b-card-group
              class="col-md-3 mt-4 "
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
        recipes.forEach(element => {
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
@import url('https://fonts.googleapis.com/css2?family=Amaranth&family=Comfortaa:wght@300&family=Lemonada:wght@400;500&family=Mali:wght@200&family=Shadows+Into+Light+Two&family=Syncopate&display=swap');

.container {
  min-height: 400px;
}
</style>
