<template>
  <div class="container" style="max-width: 1980px; width: 100%">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <b-button style="background-color:white; border-color:white;" id="fav" :disabled="!this.$root.store.username"  v-bind:style="{color: activeColor}"  v-on:click="MarkFavorite"> 
              &#10084;
          </b-button>
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Number of dishes: {{ recipe.servings }}</div>
              <div>{{ recipe.aggregateLikes }} &#128077; </div>
              <div>Vegetarian
                <span v-if="recipe.vegetarian">&#10004;</span>
                 <span v-else>&#10005;</span>
                 </div>
                 <div>Vegan
                <span v-if="recipe.vegan">&#10004;</span>
                 <span v-else>&#10005;</span>
                 </div>
                 <div>Free gluten
                <span v-if="recipe.glutenFree">&#10004;</span>
                 <span v-else>&#10005;</span>
                 </div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  name: "recipe",
  data() {
    return {
      recipe: null,
      favorite: false,
      activeColor:"grey"
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;
      this.favorite=this.$route.params.favorite;
      if(this.favorite)
        this.activeColor="red";
      try {
        let params={
          recipe_id:this.$route.params.recipeId
        }
        this.axios.defaults.withCredentials = true;
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.serverDomain + "/recipes/showRecipe", {params},{withCredentials: true}
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      console.log("response",response);
      let {
        id,
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,servings
      } = response.data;
      console.log("analyzedInstructions",analyzedInstructions);
      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        id,
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,servings
      };

      this.recipe = _recipe;
      
    } catch (error) {
      console.log(error);
    }
  },
   methods:{
  async MarkFavorite(){
    if (!this.favorite){
    try {
          this.axios.defaults.withCredentials = true;  
          const response1 = await this.axios.post(
          this.$root.store.serverDomain+"/users/favorites",

          {reciepeId: this.recipe.id,},{withCredentials: true}
        );
        this.activeColor="red";
        // console.log(response);
      } catch (err) {
        console.log(err.response1);
        this.form.submitError = err.response1.data.message;
      }
  }
  else{
    try {
          this.axios.defaults.withCredentials = true;  
          const response = await this.axios.post(
          this.$root.store.serverDomain+"/users/removeFavorite",

          {reciepeId: this.recipe.id,},{withCredentials: true}
        );
        this.activeColor="grey";
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
  }
  }
   }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
