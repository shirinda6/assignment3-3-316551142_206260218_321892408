<template>
  <div class="container" style="max-width: 1980px; width: 100%">
    <h1 class="title">Search Page</h1>
    <div style="width: 30%; float: left; margin-top: 3%;">
    <div class="row row-col-2" style="margin-left: 1%;">
    <div>
    <b-form-input class="col-16"
    id="foodName"
    placeholder="Enter food name"
    v-model="foodName"></b-form-input>
    </div>
    <div class="col">
  <b-button
        type="submit"
        variant="primary"
        class=" w-15" @click="SearchRecipe"
        ><b-icon icon="search" aria-hidden="true"></b-icon></b-button
      >
</div>
</div>
    <div>
    <b-form-spinbutton
      id="sb-step"
      v-model="selected"
      style="width:70% ;margin-top: 2%; padding: 1%;"
      min="5"
      max="15"
      step="5"
    ></b-form-spinbutton>
  </div>
    <div>
  <b-dropdown id="filter" text="Filter" variant="primary" class="m-2" style="width: 70% !important; ">
  <div role="tablist" class="accordion" style="min-height: 0 !important; overflow-y:auto;" >
    <b-card no-body class="mb-1" style=" width: 300px !important;">
      <b-card-header role="tab" class="p-1" header-tag="header">
        <b-button block v-b-toggle.cuisines><b-icon icon="chevron-down" aria-hidden="true"></b-icon>  cuisines</b-button>
      </b-card-header>
      <b-collapse id="cuisines" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-form-checkbox v-for="cuisine in cuisines" 
                v-bind:key="cuisine"
                v-bind:value=cuisine
                @input="insertCuisines(cuisine)">{{cuisine}}</b-form-checkbox>
        </b-card-body>
      </b-collapse>
     </b-card>

    <b-card no-body class="mb-1">
      <b-card-header role="tab" class="p-1">
        <b-button block v-b-toggle.diets><b-icon icon="chevron-down" aria-hidden="true"></b-icon>  diets</b-button>
      </b-card-header>
      <b-collapse id="diets"  visible role="tabpanel">
        <b-card-body>
          <b-form-checkbox v-for="diet in diets" 
                            v-bind:key="diet"
                            v-bind:value=diet
                            @input="insertDiets(diet)">{{diet}}
            </b-form-checkbox>
        </b-card-body>
      </b-collapse> 
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header role="tab" class="p-1">
        <b-button block v-b-toggle.intolerances><b-icon icon="chevron-down" aria-hidden="true"></b-icon>  intolerances</b-button>
      </b-card-header>
      <b-collapse id="intolerances" visible role="tabpanel">
        <b-card-body>
          <b-form-checkbox v-for="intolerance in intolerances" 
                    v-bind:key="intolerance"
                    v-bind:value=intolerance
                    @input="insertIntolerances(intolerance)">{{intolerance}}</b-form-checkbox>
        </b-card-body>
      </b-collapse>
   </b-card>
   </div>
  </b-dropdown>

</div>
</div>

<div style="width: 70%; float: right;">
<div style="margin-left: 65%; margin-bottom: 2%;">
  sort by:
  <input type="radio" v-model="sorted" value="readyInMinutes" @click="sortby('readyInMinutes')">preparation time
  <input type="radio" v-model="sorted" value="popularity" @click="sortby('popularity')">popularity
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
        filtercuisines:[],
        filterdiets:"",
        filterintolerances:"",
        selected: '5',
        recipes: [],
        sorted:"",
        flag:false,
        }
  },
    mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
    if(this.$root.store.username && this.$root.store.lastSearch){
      this.flag=true;
      this.recipes=this.$root.store.lastSearch.resuilts;
      let params=this.$root.store.lastSearch.paramsQuery;
      this.selected=params.numberOfRecipe;
      this.foodName=params.RecipeName;
      this.filtercuisines=params.cuisine.split(",");
      this.filterdiets=params.diet;
      this.filterintolerances=params.intolerance;
      console.log(this.recipes);
    }
  },
  methods:{
    insertCuisines(item){
      if (this.filtercuisines.includes(item)){
        let index=this.filtercuisines.indexOf(item);
        this.filtercuisines.splice(index,1);
      }
      else this.filtercuisines.push(item);
      // if (!this.filtercuisines){
      //   this.filtercuisines=item;
      // }
      // else this.filtercuisines+=","+item;
      console.log(this.filtercuisines);
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
          numberOfRecipe:this.selected,
          RecipeName:this.foodName,
          cuisine:this.filtercuisines.join(","),
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
        this.flag=true;

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
    max-height: 300px;
    overflow-y: auto;
  }
</style>