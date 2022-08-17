<template>
  <div class="container" style="max-width: 1980px; width: 100%;margin-bottom: 3%;">
    <h1 class="title" style="margin-left:40%; margin-top: 3%;font-size: 36pt;font-family: Comfortaa;">Search</h1>
    <div>
      <div style=" margin-top: 2%; margin-left: 27%;">
        <Search1
          @res="showResult"
          @inputName="setName"
          :selected="selected"
          :foodName="foodName"
          :filtercuisines="filtercuisines"
          :filterdiets="filterdiets"
          :filterintolerances="filterintolerances"
        />
      </div>

      <div v-if="flag" style=" margin-top: 6%;">
        <div class="sort" style="margin-left: 70%; margin-bottom: 2%;">
           <b-form-select class="subjectBy" v-model="sorted" v-on:change="sortby" :options="options">
           <template #first>
            <b-form-select-option :value="null" disabled>--   Select for sorting   --</b-form-select-option>
            </template>
           </b-form-select>
           <span class="order" v-if="asc" @click="sortOrder" >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-sort-up"
              viewBox="0 0 16 16"
            >
            
              <path
                d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
              /></svg>
              </span
          ><span class="order" v-else @click="sortOrder">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-sort-down"
              viewBox="0 0 16 16"
            >
            
              <path
                d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
              />
            </svg>
          </span>
          
        </div>
        <b-container>
          <b-row>
            <b-card-group
              class="col-xl mt-4"
              v-for="r in recipes"
              :key="r.id"
            >
              <RecipePreview class="recipePreview" :recipe="r" />
            </b-card-group>
          </b-row>
        </b-container>
      </div>
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
      borderStyle:"#25383C",
      flag: false,
      asc:true,
      sorted:null,
      options:[
        { value: 'popularity', text: 'popularity' },
        { value: 'preparation time', text: 'preparation time' }
      ],
      selected: 5,
      foodName: "",
      filtercuisines: [],
      filterdiets: [],
      filterintolerances: [],
    };
  },
  mounted() {
    if (this.$root.store.username && this.$root.store.lastSearch) {
      this.flag = true;
      this.recipes = this.$root.store.lastSearch.resuilts;
      let params = this.$root.store.lastSearch.paramsQuery;
      this.selected = params.numberOfRecipe;
      this.foodName = params.RecipeName;
      this.filtercuisines = params.cuisine.split(",");
      this.filterdiets = params.diet.split(",");
      this.filterintolerances = params.intolerance.split(",");
    }
  },
  methods: {
    setName(name){
      this.foodName=name;
    },
    showResult(data) {
      this.recipes = data.resuilts;
      // this.foodName=data.paramsQuery.RecipeName;
      if (this.recipes.length==0){
        alert("Sorry, we couldn't find any reasult.\n Try another search "+String.fromCodePoint(0x1F9D0));
      }
      else this.flag = true;
    },
    sortby() {
      if (this.sorted == "popularity"){
        if(this.asc==true)
          this.recipes.sort((a, b) => (a.popularity <= b.popularity ? -1 : 1));
        else this.recipes.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));
      }
      else {
          if(this.asc==true)
            this.recipes = this.recipes.sort((a, b) =>
            a.readyInMinutes <= b.readyInMinutes ? -1 : 1
          );
          else this.recipes = this.recipes.sort((a, b) =>
            a.readyInMinutes > b.readyInMinutes ? -1 : 1
          );
      }
    },
    sortOrder(){
      this.asc=!this.asc;
      if(this.sorted!=null)this.sortby();
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Amaranth&family=Comfortaa:wght@300&family=Lemonada:wght@400;500&family=Mali:wght@200&family=Shadows+Into+Light+Two&family=Syncopate&display=swap');

.order{
  cursor: pointer;
  /* margin-left: 2%; */
  border:2px solid ;
  border-color: #25383C;
  border-radius: 10%;
  padding-bottom: 8px;
  padding-right: 4px;
  padding-left: 4px;
  padding-top: 8px;
  /* margin-top: 1%;
  margin-bottom: 1%; */
  position: relative;
  background-color:rgba(149, 179, 169, 0.75) ;
  /* background-color:rgb(76, 158, 252); */
}

.subjectBy{
  width: 85.5%;
  border-color:#25383C;
  border-width: 2px;
  background-color:rgba(149, 179, 169, 0.75);
}
.subjectBy:hover,.order:hover {
  color:white; background-color:rgba(177, 188, 184, 0.75);
}

.subjectBy:focus{
  outline-style: none !important;
  box-shadow: none;
  outline: none;
  border-color:#25383C;
}
.sort{
  background-color: rgba(164, 158, 148, 0.868);
  box-shadow: 4px 3px 8px 5px rgba(164, 158, 148, 0.868), 1px 2px 10px 10px rgba(243, 243, 243, 0.85);
  margin-right: 8.5%;
  /* color:rgba(216, 151, 0, 0.968) */
}
</style>
