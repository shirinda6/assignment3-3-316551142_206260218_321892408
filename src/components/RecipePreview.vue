<template>

    <b-card no-body class="recipe-preview">
      <router-link
          :to="{ name: 'recipe', params: { recipeId: recipe.id,view:recipe.userView, favorite:recipe.userFavorite } }"      >
         <img v-if="image_load" :src="recipe.image" class="recipe-image" />
      </router-link>
        <b-card-text>
          <b-button disabled id="btnLike" > <span v-if="recipe.userFavorite" style="color:  #ff3232">&#10084;</span>
              <span v-else style="color:white;">&#10084;</span>
              </b-button>
          <div class="recipe-footer">
            <div :title="recipe.title" class="recipe-title" v-bind:style="{color: activeColor}">
              {{ recipe.title }}
            </div>
            <ul class="recipe-overview" style="position: absolute; bottom: 0;" >
              <li><b-icon icon="clock" aria-hidden="true"></b-icon> <span id="minutes">{{ recipe.readyInMinutes }}</span> min</li>
              <li><b-icon icon="hand-thumbs-up" aria-hidden="true"></b-icon><span id="like"> {{ recipe.popularity }}</span> </li>
              <!-- <li><b-button disabled style="background-color:white; border-color:white;"> <span v-if="recipe.userView" style="color: red">&#128065;</span>
              <span v-else style="color: #808080;">&#128065;</span>
              </b-button></li> -->
            </ul>
          </div>
        </b-card-text>
    </b-card>
</template>

<script>
export default {
  created(){
    this.activeColor="blue";
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
    if (this.recipe.userView) {
        this.activeColor="grey";
      }
  },
  data() {
    return {
      image_load: true,
      activeColor:"blue"
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }

  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 110%;
  height: 100%;
  position: relative;
  /* margin: 5px 5px; */
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 150px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 100%;
  /* height: auto; */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  
}

.recipe-image{
  width:100%
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 150px;
  overflow: hidden;
}


.recipe-preview .recipe-footer .recipe-title {
  padding: 3px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  /* white-space: nowrap; */
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;


}


.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
  font-size: 12pt;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

#minutes,#like{
  color: #000000;
  font-family: monospace;
  font-size: 14pt;
  font-weight: bold;

}

#btnLike{
  border: 2px solid #a6babd;
  background-color:rgb(25, 43, 43);
  box-shadow: 0 1px 3px 3px #bdd8d9, 0 0 3px 2px #defdfe;
  margin: -15% 0 0 70%;
  border-radius: 50%;
  font-size: larger;
  
}
</style>
