<template>
  <div class="container" style="max-width: 1980px; width: 100%">
  <link rel="stylesheet" href="http://static.sasongsmat.nu/fonts/vegetarian.css" />
    <div v-if="recipe">
      <div class="recipe-header  " >
        <h1 style="padding-top: 1%;font-size: 20pt;padding-bottom:1%;">{{ recipe.title }}</h1>
        <div style="display: flex;margin-top:2%;padding-bottom:2%">   
          <div style="margin-top: -2%;text-align:center;padding-top:1.5%;padding-bottom:1.5%;background-color:#95b3a9bf; width: 80%;float: right;margin-left:10%;margin-right:-85%">
          <img :src="recipe.image" class="center"/>
            <b-button-group  size="lg" style="width:95%;" >
              <b-button  variant="light"  disabled>
                 <b-icon icon="clock" aria-hidden="true"></b-icon>
                {{ recipe.readyInMinutes }} <span style="font-size: 15pt;">min</span>
              </b-button>
              <b-button  variant="light"  disabled>
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
               {{ recipe.servings }}
              </b-button>
              <b-button  variant="light"   disabled>  
                <svg style="margin-bottom:8%"  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="black" fill-opacity=".15" d="M273 495.9v428l.3-428zm538.2-88.3H496.8l9.6-198.4c.6-11.9-4.7-23.1-14.6-30.5c-6.1-4.5-13.6-6.8-21.1-6.7c-19.6.1-36.9 13.4-42.2 32.3c-37.1 134.4-64.9 235.2-83.5 302.5V852h399.4a56.85 56.85 0 0 0 33.6-51.8c0-9.7-2.3-18.9-6.9-27.3l-13.9-25.4l21.9-19a56.76 56.76 0 0 0 19.6-43c0-9.7-2.3-18.9-6.9-27.3l-13.9-25.4l21.9-19a56.76 56.76 0 0 0 19.6-43c0-9.7-2.3-18.9-6.9-27.3l-14-25.5l21.9-19a56.76 56.76 0 0 0 19.6-43c0-19.1-11-37.5-28.8-48.4z"/><path fill="black" d="M112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32zm773.9 5.7c16.8-22.2 26.1-49.4 26.1-77.7c0-44.9-25.1-87.5-65.5-111a67.67 67.67 0 0 0-34.3-9.3H572.3l6-122.9c1.5-29.7-9-57.9-29.5-79.4a106.4 106.4 0 0 0-77.9-33.4c-52 0-98 35-111.8 85.1l-85.8 310.8l-.3 428h472.1c9.3 0 18.2-1.8 26.5-5.4c47.6-20.3 78.3-66.8 78.3-118.4c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37zM820.4 499l-21.9 19l14 25.5a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.1 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.1 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H345V506.8c18.6-67.2 46.4-168 83.5-302.5a44.28 44.28 0 0 1 42.2-32.3c7.5-.1 15 2.2 21.1 6.7c9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.1 32.2-19.6 43z"/></svg>
                <span id="like"> {{ recipe.aggregateLikes }}</span>
              </b-button>
              <b-button v-if="recipe.vegetarian" variant="light" v-b-tooltip.v-info  v-b-tooltip.hover v-b-tooltip.bottom title="vegetarian" disabled>
                 <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="27" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="#00a591" d="m.59 15.956l171.09 473.93a29.099 29.099 0 0 0 27.37 19.218h123.777c6.73 0 12.737-4.222 15.016-10.555l173.57-482.481c2.43-6.754-3.026-13.73-10.166-12.998L363.502 17.186a24.03 24.03 0 0 0-20.251 16.021L256.817 282.08L169.795 32.097a24.03 24.03 0 0 0-20.43-16.023L10.679 2.94C3.56 2.267-1.838 9.231.59 15.956z"/></svg>
              </b-button>
              <b-button v-if="recipe.vegan" variant="light" v-b-tooltip.v-success v-b-tooltip.hover v-b-tooltip.bottom title="vegan" disabled>  
                <svg id="vegan" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="34" height="34" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#79c753" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M14.5 11.5C12.75 13.382 11 18 11 18s-2.5-6.5-5-8"/><path d="m18.015 7.73l.297 3.08c.192 1.998-1.306 3.777-3.304 3.97c-1.96.188-3.736-1.245-3.925-3.205a3.566 3.566 0 0 1 3.208-3.892l3.284-.316a.404.404 0 0 1 .44.363Z"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"/></g></svg>
              </b-button>
              <b-button v-if="recipe.glutenFree" variant="light" v-b-tooltip.v-warning v-b-tooltip.hover v-b-tooltip.bottom  title="gluten-free" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="34" height="34" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="#efc050" d="M416.1 128.1c-8.5 10.2-23.7 10.2-33.1 0c-9.3-8.5-9.3-23.7 0-33.07l88-88.001c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941l-88 87.13zm-99.3-89.47c4.5 4.52 8.6 9.31 12.3 14.3L375 7.029c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941L350.7 99.2c5.2 21.5 4.7 44-1.4 65.3c20.3-5.8 41.8-7.4 62.4-2.1L471 103c9.4-9.34 24.6-9.34 33.1 0c10.2 9.4 10.2 24.6 0 33.1l-45.3 47c4.5 3.2 8.8 6.7 12.9 10.6c-45.4 6.2-85.2 29.8-112.6 63.7c-7.1-4.1-13.7-9.1-19.7-15.1l-12.2-12.2l-31.9 31c17.2 2.5 34.2 7.7 49.7 16.3c-15.9 26.5-25 57.5-25 90.6v3.1c-29.1 4.5-60-4.5-82.4-27l-12.2-12.2l-31.9 31.9c27.6 2.7 56.2 15 78 36.9l11.3 10.4c6.3 7.1 6.3 17.3 0 23.5l-11.3 11.3c-37.5 37.5-98.2 37.5-135.7 0l-12.3-12.2l-68.87 68.9c-12.5 12.5-32.76 12.5-45.258 0c-12.496-12.5-12.496-32.7 0-45.2l68.918-68.9L67.88 378c-37.49-37.4-37.49-98.2 0-135.7l11.32-12.2c6.24-5.4 16.37-5.4 22.6 0l11.3 12.2c21 21 33.2 47.4 36.6 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.3 0-135.7l11.3-11.4c6.3-6.2 16.4-6.2 22.6 0l10.5 11.4c21 20.9 34 47.4 37.4 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.28 0-135.77l11.3-11.32c6.3-6.25 16.4-6.25 22.7 0l11.3 11.32zM352 368c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm144 96c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm-16.9-176v80c0 8.8 8.1 16 16 16c9.7 0 16-7.2 16-16v-80c0-8.8-6.3-16-16-16c-7.9 0-16 7.2-16 16z"/></svg>   
              </b-button>
           </b-button-group>
        </div>
         <div class="mb-3" id="fav" 
                :disabled="!this.$root.store.username"
                v-bind:style="{ color: activeColor }"
                style="width: 20%; float: left;margin-left:2.5%;"
                v-on:click="MarkFavorite">
               <span id="textFavorite"> &#10084;</span>
            </div>
        </div>
        
       
   
      </div>
      <div class="recipe-body" >  
          <div class="title">Ingredients</div>
          <div class="wrapper">         
            <div class="wrapped" style="margin-left: 3%;">
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients.slice(0, size)"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
            </div>
            <div class="wrapped">
               <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients.slice(size)"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
            </div>
          </div>

          <div class="instruction" >
            <div v-if="recipe._instructions.length>0" class="title">Instructions</div>        
            <ol style="counter-reset: section;  list-style:none; padding: 1%;background-color: rgba(252, 252, 252, 0.795); margin-left: 5%;margin-right: 5%;  ">
              <li class="ins" v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
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
  name: "recipe",
  data() {
    return {
      recipe: null,
      favorite: false,
      activeColor: "transparent",
      countr: 40,
      size:0
    };
  },
  computed:{
    countList(){
      return{
        'margin-left':this.countr+'%'
      }
    }
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;
      this.favorite = this.$route.params.favorite;
      if (this.favorite) this.activeColor = "red";
      try {
        let params = {
          recipe_id: this.$route.params.recipeId,
        };
        this.axios.defaults.withCredentials = true;
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.serverDomain + "/recipes/showRecipe",
          { params },
          { withCredentials: true }
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      console.log("response", response);
      let {
        id,
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings,
      } = response.data;
      console.log("analyzedInstructions", analyzedInstructions);
      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        id,
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings,
      };

      this.recipe = _recipe;
      let len=this.recipe.extendedIngredients.length;
      this.size=len/2;
      if (len%2!=0){
        this.size++;
      }
      if(this.recipe.vegan ){
        this.countr-=4;
      }
      if(this.recipe.vegetarian ){
        this.countr-=4;
      }
      if(!this.recipe.glutenFree ){
        this.countr-=4;
      }

      if (this.$root.store.username && this.$root.store.lastSearch) {
        console.log("before", this.$root.store.lastSearch);
        let recipes = this.$root.store.lastSearch.resuilts;
        recipes.forEach((element) => {
          if (element.id == this.recipe.id) {
            console.log("yes", element);
            element.userView = true;
          }
        });
        console.log("after", this.$root.store.lastSearch);
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async MarkFavorite() {
      if (!this.favorite) {
        try {
          this.axios.defaults.withCredentials = true;
          const response1 = await this.axios.post(
            this.$root.store.serverDomain + "/users/favorites",

            { reciepeId: this.recipe.id },
            { withCredentials: true }
          );
          this.activeColor = "red";
          this.favorite=true;
          if (this.$root.store.username && this.$root.store.lastSearch) {
            let recipes = this.$root.store.lastSearch.resuilts;
            recipes.forEach((element) => {
              if (element.id == this.recipe.id) {
                element.userFavorite = true;
              }
            });
          }
        } catch (err) {
          console.log(err.response1);
          this.form.submitError = err.response1.data.message;
        }
      } else {
        try {
          this.axios.defaults.withCredentials = true;
          console.log("remove delete");
          const response = await this.axios.post(
            this.$root.store.serverDomain + "/users/removeFavorite",
          
            { reciepeId: this.recipe.id },
            { withCredentials: true }
          );
          this.activeColor = "transparent";
          this.favorite=false;
          console.log("remove delete transparent");
          if (this.$root.store.username && this.$root.store.lastSearch) {
            let recipes = this.$root.store.lastSearch.resuilts;
            recipes.forEach((element) => {
              if (element.id == this.recipe.id) {
                element.userFavorite = false;
              }
            });
          }
          // console.log(response);
        } catch (err) {
          console.log(err.response);
          this.form.submitError = err.response.data.message;
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Amaranth&family=Comfortaa:wght@300&family=Lemonada:wght@400;500&family=Mali:wght@200&family=Shadows+Into+Light+Two&family=Syncopate&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200&family=Open+Sans:wght@300&display=swap');

.container{
  padding-bottom: 2%;
}
.wrapper {
  display: flex;
  font-size: 14pt;
  background-color: rgba(252, 252, 252, 0.795);
    margin-left: 5%;
  margin-right: 5%;
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
  width: 95%;
  height: 460px;
  /* margin-top: 1.5%; */
}
.recipe-header {
  font-family: Comfortaa;
  text-align: center;
  /* background-color: rgb(248, 186, 41); */
  /* margin-left: 8%;
  margin-right: 8%; */
  /* background-color: rgba(149, 179, 169, 0.75); */
  /* margin-top: 2% ; */


 
}

.details{
  list-style: none;
  display: flex;
  /* float: center; */
  /* margin-left: 35%; */
  font-size: 25pt;
}

li{
  padding: 1%;
  font-size: 12pt;
}

#fav{
  font-size: 40pt;
  /* background-color:rgba(255, 255, 255, 0.263); */
 -webkit-text-stroke: 2px white;
  /* margin-right: 67%; */
    /* margin-top: -40%; */
    cursor: pointer;

}
#textFavorite{
      text-shadow: 0 0 3px #ffffff, 0 0 7px #0000FF;

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
   left: -4%;
   padding-top: 0.5%;
   margin-top: -0.8%;

}
.ins{
  position: relative;
  margin-left: 3%;
} 
.title{font-size: 20pt; background-color: #95b3a9bf;color:white; text-align: center;}
</style>
