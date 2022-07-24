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
              <div>Ready in {{ recipe.preparationTime }} minutes</div>
              <div>Number of dishes: {{ recipe.numberOfDishes }}</div>
              <div>Vegetarian
                <span v-if="recipe.vegetarian">&#10004;</span>
                 <span v-else>&#10005;</span>
                 </div>
                 <div>Vegan
                <span v-if="recipe.vegan">&#10004;</span>
                 <span v-else>&#10005;</span>
                 </div>
                 <div>Free gluten
                <span v-if="recipe.gluten">&#10004;</span>
                 <span v-else>&#10005;</span>
                 </div>
                 <div v-if="recipe.owner">
                   <div> Owner: {{ recipe.owner }}</div>
                   <div>Customary to Prepare on {{ recipe.customaryPrepare }}</div>
                 </div>
            </div>
            Ingredients:
            <ol>
              <li
                v-for="(r, index) in ingredients"
                :key="index"
              >
                {{ r }}
              </li>
            </ol>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
                {{ recipe.preparationInstructions }}
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
  name: "RecipePage",
  data() {
    return {
      ingredients: [],
      recipe:null
    };
  },
  async created() {
    this.recipe=this.$route.params.recipe;
    console.log(this.recipe.ingredients)
    if (this.recipe.ingredients.includes(","))
        this.ingredients= this.recipe.ingredients.split(",");
    else  this.ingredients.push(this.recipe.ingredients);
    console.log(this.ingredients);
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
