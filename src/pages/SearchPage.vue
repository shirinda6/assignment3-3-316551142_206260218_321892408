<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <ejs-multiselect id='cuisinesselect' popupHeight="250px" :allowFiltering='allowFiltering' :filtering='filtering' :dataSource='cuisines' :fields='fields' placeholder="Select cuisines"></ejs-multiselect>  
    <ejs-multiselect id='dietsselect' popupHeight="250px" :allowFiltering='allowFiltering' :filtering='filtering' :dataSource='diets' :fields='fields' placeholder="Select diets"></ejs-multiselect>  
    <ejs-multiselect id='intolerancesselect' popupHeight="250px" :allowFiltering='allowFiltering' :filtering='filtering' :dataSource='intolerances' :fields='fields' placeholder="Select intolerances"></ejs-multiselect>  
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
        // searchData : [
        //     { Index: "s1", Country: "California" }, { Index: "s2", Country: "Florida" },
        //     { Index: "s3", Country: "Alaska" }, { Index: "s4", Country: "Georgia" }
        // ],
        cuisines: [{ value: null, text: "", disabled: true }],
        diets: [{ value: null, text: "", disabled: true }],
        intolerances: [{ value: null, text: "", disabled: true }],
        allowFiltering : true
        }
  },
  
    mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
  }
  // methods: {
  //       filtering: function(args) {
  //          var searchData = [
  //               { Index: "s1", Country: "California" }, { Index: "s2", Country: "Florida" },
  //               { Index: "s3", Country: "Alaska" }, { Index: "s4", Country: "Georgia" }
  //           ];
  //          var query = new Query();
  //           //frame the query based on search string with filter type.
  //          query = (args.text != "") ? query.where("Country", "startswith", args.text, true) : query;
  //           //pass the filter data source, filter query to updateData method.
  //           args.updateData(searchData, query);
  //       }
  //   }
  }
  
</script>
<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
</style>