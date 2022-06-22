<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    
  </div>
</template>



<script>
import cuisines from "../assets/cuisines";
  import diets from "../assets/diets";
  import intolerances from "../assets/intolerances";

  export default{
    name: Search,
    data():{
      return{

      }
    },
    mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
  }
  }
</script>