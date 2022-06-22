<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div>
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
    </div>
    </div>
</template>

<script>
import cuisines from "../assets/cuisines";
  import diets from "../assets/diets";
  import intolerances from "../assets/intolerances";

  export default{
    name: "Search",
    data(){
      return{
        cuisines: [],
        diets: [],
        intolerances: [],
        allowFiltering : true,
        filtercuisines:"",
        filterdiets:"",
        filterintolerances:""
        }
  },
    mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
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
    }
  }
  }
  
</script>
<style>
</style>