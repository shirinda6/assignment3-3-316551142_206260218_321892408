<template>
  <div class="container" style="max-width: 1980px; width: 100%">
  <link rel="stylesheet" href="http://static.sasongsmat.nu/fonts/vegetarian.css" />
    <div v-if="recipe">
      <div id="title" class="recipe-header mt-3">
        <h1 style="padding-top: 3%;font-size: 36pt;">{{ recipe.recipeName }}</h1>
        <img :src="recipe.image" class="center" />

         <div>
          <ul class="details" v-bind:style="countList"
>
            <li>
                <b-icon icon="clock" aria-hidden="true"></b-icon>
                {{ recipe.preparationTime }} <span style="font-size: 15pt;">min</span>
            </li>
            <li>
              <div> | 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                  />
                  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
               {{ recipe.numberOfDishes }}
              </div>
            </li>
            <li v-if="recipe.customaryPrepare">
               |  {{recipe.customaryPrepare}}
            </li>
             <li v-if="recipe.owner">
               |  {{recipe.owner}}'s recipe
            </li>


<!-- 
            <li v-if="recipe.vegetarian">| <span class="vegetarianicon">Ⓥ</span>
            </li>
            <li v-if="recipe.vegan" >|  &#x1f331;
            </li>
            <li v-if="!recipe.gluten">|  &#127806;
            </li> -->

            <li v-if="recipe.vegetarian" >
              <span id="veg" class="vegetarianicon" style="color: #00a591;">Ⓥ</span>
              <b-tooltip target="veg" variant="info" placement="bottom" >vegetarian</b-tooltip>
            </li>
            <li v-if="recipe.vegan" >  
              <svg id="vegan" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="34" height="34" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#79c753" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M14.5 11.5C12.75 13.382 11 18 11 18s-2.5-6.5-5-8"/><path d="m18.015 7.73l.297 3.08c.192 1.998-1.306 3.777-3.304 3.97c-1.96.188-3.736-1.245-3.925-3.205a3.566 3.566 0 0 1 3.208-3.892l3.284-.316a.404.404 0 0 1 .44.363Z"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"/></g></svg>
              <b-tooltip target="vegan" variant="info" placement="bottom" >vegan</b-tooltip>
           </li>
            <li v-if="!recipe.gluten" >
              <svg id="gluten" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.25em" height="1.6em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="#efc050" d="M416.1 128.1c-8.5 10.2-23.7 10.2-33.1 0c-9.3-8.5-9.3-23.7 0-33.07l88-88.001c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941l-88 87.13zm-99.3-89.47c4.5 4.52 8.6 9.31 12.3 14.3L375 7.029c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941L350.7 99.2c5.2 21.5 4.7 44-1.4 65.3c20.3-5.8 41.8-7.4 62.4-2.1L471 103c9.4-9.34 24.6-9.34 33.1 0c10.2 9.4 10.2 24.6 0 33.1l-45.3 47c4.5 3.2 8.8 6.7 12.9 10.6c-45.4 6.2-85.2 29.8-112.6 63.7c-7.1-4.1-13.7-9.1-19.7-15.1l-12.2-12.2l-31.9 31c17.2 2.5 34.2 7.7 49.7 16.3c-15.9 26.5-25 57.5-25 90.6v3.1c-29.1 4.5-60-4.5-82.4-27l-12.2-12.2l-31.9 31.9c27.6 2.7 56.2 15 78 36.9l11.3 10.4c6.3 7.1 6.3 17.3 0 23.5l-11.3 11.3c-37.5 37.5-98.2 37.5-135.7 0l-12.3-12.2l-68.87 68.9c-12.5 12.5-32.76 12.5-45.258 0c-12.496-12.5-12.496-32.7 0-45.2l68.918-68.9L67.88 378c-37.49-37.4-37.49-98.2 0-135.7l11.32-12.2c6.24-5.4 16.37-5.4 22.6 0l11.3 12.2c21 21 33.2 47.4 36.6 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.3 0-135.7l11.3-11.4c6.3-6.2 16.4-6.2 22.6 0l10.5 11.4c21 20.9 34 47.4 37.4 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.28 0-135.77l11.3-11.32c6.3-6.25 16.4-6.25 22.7 0l11.3 11.32zM352 368c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm144 96c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm-16.9-176v80c0 8.8 8.1 16 16 16c9.7 0 16-7.2 16-16v-80c0-8.8-6.3-16-16-16c-7.9 0-16 7.2-16 16z"/></svg>
              <b-tooltip target="gluten" variant="info" placement="bottom" >gluten</b-tooltip>
           </li>
          </ul>
        </div>
      </div>

    <div class="recipe-body">
      <div class="title">Ingredients</div>
      <div class="wrapper">
           
            <div class="wrapped" style="margin-left: 3%;">
            <ul>
              <li
                v-for="(r, index) in ingredients.slice(0, size)"
                :key="index + '_' + r.id"
              >
                {{ r }}
              </li>
            </ul>
            </div>
            <div class="wrapped" v-if="ingredients.length>=4">
               <ul>
              <li
                v-for="(r, index) in ingredients.slice(size)"
                :key="index"
              >
                {{ r }}
              </li>
            </ul>
            </div>
          </div>

          <div >
            <div class="title">Instructions</div>
           
            <ol style="counter-reset: section; margin-top: 2%; list-style:none;  ">
              <li class="ins" v-for="(r, index) in instructions" :key="index">
                {{ r }}
              </li>
            </ol>
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
      instructions:[],
      countr: 33,
      recipe:null,
      size:0
    };
  },
  computed:{
    countList(){
      console.log(this.countr);
      return{
        'margin-left':this.countr+'%'
      }
    }
  },
  async created() {
    this.recipe=this.$route.params.recipe;
    let temp=[]
    console.log(this.recipe.ingredients)
    if (this.recipe.ingredients.includes(","))
        temp= this.recipe.ingredients.split(",");
    else  temp.push(this.recipe.ingredients);

  console.log("temp",temp)
    for (let ingredient of temp){
      let arr=ingredient.split(":");
      this.ingredients.push(`${arr[1]} ${arr[0]}`);
    }

    if (this.recipe.preparationInstructions.includes(","))
        this.instructions= this.recipe.preparationInstructions.split(",");
    else  this.instructions.push(this.recipe.preparationInstructions);
    
    let len=this.ingredients.length;
    if (len>=4){
      this.size=len/2;
      if (len%2!=0){
        this.size++;
      }
      console.log("size",len);
}
else this.size=len;
    if(this.recipe.vegan ){
        this.countr-=5;
      }
      if(this.recipe.vegetarian ){
        this.countr-=5;
      }
      if(!this.recipe.gluten ){
        this.countr-=5;
      }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Amaranth&family=Comfortaa:wght@300&family=Lemonada:wght@400;500&family=Mali:wght@200&family=Shadows+Into+Light+Two&family=Syncopate&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200&family=Open+Sans:wght@300&display=swap');

.wrapper {
  display: flex;
  font-size: 14pt;
}
.wrapped {
  width: 50%;
  margin-top: 3%;
  margin-bottom: 3%;
} 

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  margin-top: 3%;
}


.recipe-header {
  font-family: Comfortaa;
  text-align: center;
  background-color: rgba(248, 186, 41, 0.868);
 
}

.details{
  list-style: none;
  display: flex;
  /* float: center; */
  /* margin-left: 35%; */
  font-size: 25pt;
  /* background-color: rgba(252, 252, 252, 0.795);  */
  /* text-align: center; */
}

li{
  padding: 1%;
  font-size: 14pt;
}

.ins:before {
  content: counter(section);
  counter-increment: section;
  display: inline-block;
  width: 40px;
  height: 40px;
  /* margin: 0 10px 0 0; */
  border: 2px solid #ccc;
  border-radius: 100%;
  text-align: center;
   position: absolute;
   left: -3.5%;
   padding-top: 0.2%;
}
.ins{
  position: relative;
  margin-left: 3%;
} 
.title{font-size: 20pt; background-color: lightgray; text-align: center;}
</style>
