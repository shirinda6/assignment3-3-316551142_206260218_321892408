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
            <li v-if="recipe.vegetarian">| <span class="vegetarianicon">Ⓥ</span>
            </li>
            <li v-if="recipe.vegan" >|  &#x1f331;
            </li>
            <li v-if="!recipe.gluten">|  &#127806;
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
