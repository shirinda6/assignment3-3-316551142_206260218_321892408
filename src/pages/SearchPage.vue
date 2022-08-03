<template>
  <div class="container" style="max-width: 1980px; width: 100%">
    <h1 class="title" style="margin-left:45%; margin-top: 3%;">Search</h1>
    <div v-if="flag">
      <div style="width: 30%; float: left; margin-top: 2%;">
        <Search1
          @res="showResult"
          :selected="selected"
          :foodName="foodName"
          :filtercuisines="filtercuisines"
          :filterdiets="filterdiets"
          :filterintolerances="filterintolerances"
        />
      </div>

      <div style="width: 70%; float: right;">
        <div style="margin-left: 65%; margin-bottom: 2%;">
          sort by:
          <input
            type="radio"
            v-model="sorted"
            value="readyInMinutes"
            @click="sortby('readyInMinutes')"
          />preparation time
          <input
            type="radio"
            v-model="sorted"
            value="popularity"
            @click="sortby('popularity')"
          />popularity
        </div>
        <b-container>
          <b-row>
            <b-card-group class="col-md-4" v-for="r in recipes" :key="r.id">
              <RecipePreview class="recipePreview" :recipe="r" />
            </b-card-group>
          </b-row>
        </b-container>
      </div>
    </div>

    <div v-else style="margin-top: 2%;margin-left: 20%;">
      <Search1
        @res="showResult"
        :selected="selected"
        :foodName="foodName"
        :filtercuisines="filtercuisines"
        :filterdiets="filterdiets"
        :filterintolerances="filterintolerances"
      />
    </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";
import Search1 from "../components/Search.vue";

export default {
  name: "Search",
  components: {
    RecipePreview,
    Search1,
  },
  data() {
    return {
      recipes: [],
      sorted: "",
      flag: false,
      selected: 5,
      foodName: "",
      filtercuisines: [],
      filterdiets: [],
      filterintolerances: [],
    };
  },
  mounted() {
    console.log("mounted");
    if (this.$root.store.username && this.$root.store.lastSearch) {
      this.flag = true;
      this.recipes = this.$root.store.lastSearch.resuilts;
      let params = this.$root.store.lastSearch.paramsQuery;
      this.selected = params.numberOfRecipe;
      this.foodName = params.RecipeName;
      this.filtercuisines = params.cuisine.split(",");
      this.filterdiets = params.diet.split(",");
      this.filterintolerances = params.intolerance.split(",");
      console.log("recipe", this.recipes);
    }
  },
  methods: {
    showResult(data) {
      this.recipes = data;
      this.flag = true;
    },
    sortby(field) {
      if (field == "popularity")
        this.recipes.sort((a, b) => (a.popularity < b.popularity ? -1 : 1));
      else
        this.recipes = this.recipes.sort((a, b) =>
          a.readyInMinutes < b.readyInMinutes ? -1 : 1
        );
    },
  },
};
</script>
<style>
.m-2 .dropdown-menu {
  max-height: 300px;
  overflow-y: auto;
}
</style>
