<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div>
    <b-form-input 
    id="foodName"
    placeholder="Enter food name"
    v-model="foodName"></b-form-input>
    </div>
<div>
  <input type="radio" v-model="selected" value="5" checked>5
  <input type="radio" v-model="selected" value="10">10
  <input type="radio" v-model="selected" value="15">15
    <!-- <b-radio
      v-model="selected"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-radio> -->
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
    <div>
  <b-dropdown text="cuisines" variant="primary" class="m-2">
    <b-dropdown-item disabled value="0">Select an Item</b-dropdown-item>
    <b-dropdown-item v-for="cuisine in cuisines" 
                    v-bind:key="cuisine"
                    v-bind:value=cuisine
                    @click="insertCuisines(cuisine)">{{cuisine}}</b-dropdown-item>
  </b-dropdown><span>Selected: {{ filtercuisines }}</span>

  <b-dropdown text="diets" variant="success" class="m-2">
    <b-dropdown-item v-for="diet in diets" 
                    v-bind:key="diet"
                    v-bind:value=diet
                    @click="insertDiets(diet)">{{diet}}</b-dropdown-item>
  </b-dropdown><span>Selected: {{ filterdiets }}</span>

  <b-dropdown text="intolerances" variant="outline-danger" class="m-2">
    <b-dropdown-item v-for="intolerance in intolerances" 
                    v-bind:key="intolerance"
                    v-bind:value=intolerance
                    @click="insertIntolerances(intolerance)">{{intolerance}}</b-dropdown-item>
  </b-dropdown><span>Selected: {{ filterintolerances }}</span>
</div>
<div>
  <b-button
        type="submit"
        variant="primary"
        class="ml-5 w-75" @click="SearchRecipe"
        >Search</b-button
      >
</div>
<div>
  sort by:
  <input type="radio" v-model="sorted" value="readyInMinutes" @click="sortby(readyInMinutes)">preparation time
  <input type="radio" v-model="sorted" value="popularity" @click="sortby(popularity)">popularity
</div>
<b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <!-- <b-row> -->
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    <!-- </b-row> -->
  </b-container>
    </div>
</template>

<script>
import cuisines from "../assets/cuisines";
  import diets from "../assets/diets";
  import intolerances from "../assets/intolerances";
  import RecipePreview from "../components/RecipePreview.vue";

  export default{
    name: "Search",
    components: {
    RecipePreview
  },
    data(){
      return{
        foodName:"",
        cuisines: [],
        diets: [],
        intolerances: [],
        allowFiltering : true,
        filtercuisines:"",
        filterdiets:"",
        filterintolerances:"",
        selected: '5',
        recipes: [],
        sorted:""
        }
  },
    mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
    if(this.$root.store.username && this.$root.store.lastSearch){
      this.recipes=this.$root.store.lastSearch.resuilts;
      let params=this.$root.store.lastSearch.paramsQuery;
      this.selected=params.numberOfRecipe;
      this.foodName=params.RecipeName;
      this.filtercuisines=params.cuisine;
      this.filterdiets=params.diet;
      this.filterintolerances=params.intolerance;
      console.log(this.recipes);
    }
  },
  methods:{
    insertCuisines(item){
      if (!this.filtercuisines){
        this.filtercuisines=item;
      }
      else this.filtercuisines+=","+item;
    },
    insertDiets(item){
      if (!this.filterdiets){
        this.filterdiets=item;
      }
      else this.filterdiets+=","+item;
    },
    insertIntolerances(item){
      if (!this.filterintolerances){
        this.filterintolerances=item;
      }
      else this.filterintolerances+=","+item;
    },
    async SearchRecipe(){
      try {
        let params={
          numberOfRecipe:1, //this.selected,
          RecipeName:this.foodName,
          cuisine:this.filtercuisines,
          diet:this.filterdiets,
          intolerance:this.filterintolerances
        }
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
           this.$root.store.serverDomain+"/recipes/search",{params},{withCredentials: true}
        );

        console.log(response);
        const recipes = response.data.search;
        this.recipes = [];
        this.recipes.push(...recipes);
        

        if(this.$root.store.username){
          const views= response.data.view;
          const favorites= response.data.favorite;
          this.recipes.forEach((recipe)=>{
            recipe.userView=views[recipe.id];
            recipe.userFavorite=favorites[recipe.id];
          });
          let last={
            paramsQuery:params,
            resuilts:this.recipes
          }
          this.$root.store.Search(last);
        }
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
    sortby(field){
      if(field=="popularity")
        this.recipes.sort((a, b) => (a.popularity < b.popularity ? -1 : 1));
      else  
        this.recipes=this.recipes.sort((a, b) => (a.readyInMinutes < b.readyInMinutes ? -1 : 1));
    }
  }
  }
  
</script>
<style>
  .m-2 .dropdown-menu {
    max-height: 200px;
    overflow-y: auto;
  }
</style>