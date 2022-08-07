<template>
  <b-container style="max-width: 1980px; width: 85%;margin-top: 3%;margin-bottom: 3%;">
  <b-row>
    <b-card-group
              class="col-md-3 mt-4"
              v-for="r in recipes"
              :key="r.id"
            >
               <MyRecipePreview class="recipePreview" :recipe="r" />
            </b-card-group>
    </b-row>
  </b-container>
</template>

<script>
import MyRecipePreview from "../components/MyRecipePreview.vue";
export default {
  name: "MyFamily",
  components: {
    MyRecipePreview
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
          this.$root.store.serverDomain+"/users/myFamily",{withCredentials: true}
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        const recipes = response.data;
        this.recipes = [];
        // this.recipes.push(...recipes);
        console.log(recipes);
        recipes.forEach(element => {
            console.log(element[0]);
            this.recipes.push(element[0])
        });
        console.log(this.recipes);
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
