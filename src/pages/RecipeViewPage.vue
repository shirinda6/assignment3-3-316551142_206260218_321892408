<template>
  <div class="container" style="max-width: 1980px; width: 100%">
  <link rel="stylesheet" href="http://static.sasongsmat.nu/fonts/vegetarian.css" />
    <div v-if="recipe">
      <div class="recipe-header mt-3 " >
        <h1 style="padding-top: 3%;font-size: 36pt;">{{ recipe.title }}</h1>
        
        <img :src="recipe.image" class="center" />
        <div class="mb-3" id="fav"
                :disabled="!this.$root.store.username"
                v-bind:style="{ color: activeColor }"
                v-on:click="MarkFavorite">
               <span id="textFavorite"> &#10084;</span>
            </div>
        <div style="margin-top: 45%">
          <ul class="details" v-bind:style="countList"
>
            <li>
                <b-icon icon="clock" aria-hidden="true"></b-icon>
                {{ recipe.readyInMinutes }} <span style="font-size: 15pt;">min</span>
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
               {{ recipe.servings }}
              </div>
            </li>
            <li v-if="recipe.vegetarian">| <span class="vegetarianicon">Ⓥ</span>
            </li>
            <li v-if="recipe.vegan" >|  &#x1f331;
            </li>
            <li v-if="!recipe.glutenFree">|  &#127806;
            </li>
          </ul>
        </div>
      </div>
      <div class="recipe-body">
        
        
        <!-- <div class="wrapper"> -->
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


          <div >
            <div class="title">Instructions</div>
           
            <ol style="counter-reset: section; margin-top: 2%; list-style:none;  ">
              <li class="ins" v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        <!-- </div> -->
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
      console.log(this.countr);
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
        this.countr-=5;
      }
      if(this.recipe.vegetarian ){
        this.countr-=5;
      }
      if(!this.recipe.glutenFree ){
        this.countr-=5;
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
          // console.log(response);
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
}

li{
  padding: 1%;
  font-size: 14pt;
}

#fav{
  font-size: 56pt;
  /* background-color:rgba(255, 255, 255, 0.263); */
 -webkit-text-stroke: 2px white;
  margin-right: 67%;
    margin-top: -50%;
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
   left: -3.5%;
   padding-top: 0.2%;
}
.ins{
  position: relative;
  margin-left: 3%;
} 
.title{font-size: 20pt; background-color: lightgray; text-align: center;}
</style>
