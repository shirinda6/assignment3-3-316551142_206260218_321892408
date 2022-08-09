<template>
<div>
  <b-card
    no-body
    class="recipe-preview"
    border-variant="dark"
    style="font-family: Comfortaa; padding-bottom: 1px; margin-bottom: 20px;"
  >
    <link
      rel="stylesheet"
      href="http://static.sasongsmat.nu/fonts/vegetarian.css"
    />
    <router-link
      :to="{
        name: 'recipe',
        params: {
          recipeId: recipe.id,
          view: recipe.userView,
          favorite: recipe.userFavorite,
        },
      }"
    >
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </router-link>
    <b-card-text>
      <b-button disabled id="btnLike" >
        <span v-if="recipe.userFavorite" style="color:  #ff3232">&#10084;</span>
        <span v-else style="color:white;">&#10084;</span>
      </b-button>
      <div class="recipe-footer" >
        <div
          :title="recipe.title"
          class="recipe-title"
          style="height:72px ;margin-top: -1.5%;"
          v-bind:style="{ color: activeColor }"
        >
          {{ recipe.title }}
        </div>

      <div style="text-decoration: white;width: 100%;height: 100%;margin-top: 6%;padding: 1%;border-top: 2px solid whitesmoke;    text-shadow: 2px 2px lightgray;;">
          <ul class="recipe-overview" style="  position: absolute;color: #343a40;">
            <li style="margin-left: -20%;">
              <b-icon icon="clock" aria-hidden="true"></b-icon>
              <span id="minutes"> {{ recipe.readyInMinutes }}</span> min
            </li>
            <li >
              <b-icon icon="hand-thumbs-up" aria-hidden="true"></b-icon
              ><span id="like"> {{ recipe.popularity }}</span>
            </li>
          </ul> 
          <ul class="details" style="position: absolute;bottom: 0px;padding: 1%;">
            <li v-if="recipe.vegetarian" >
              <span class="vegetarianicon" style="color: #00a591;">Ⓥ</span>
            </li>
            <li v-if="recipe.vegan" >  
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="34" height="34" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#79c753" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M14.5 11.5C12.75 13.382 11 18 11 18s-2.5-6.5-5-8"/><path d="m18.015 7.73l.297 3.08c.192 1.998-1.306 3.777-3.304 3.97c-1.96.188-3.736-1.245-3.925-3.205a3.566 3.566 0 0 1 3.208-3.892l3.284-.316a.404.404 0 0 1 .44.363Z"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"/></g></svg>
            </li>
            <li v-if="!recipe.glutenFree" >
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.25em" height="1.6em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="#efc050" d="M416.1 128.1c-8.5 10.2-23.7 10.2-33.1 0c-9.3-8.5-9.3-23.7 0-33.07l88-88.001c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941l-88 87.13zm-99.3-89.47c4.5 4.52 8.6 9.31 12.3 14.3L375 7.029c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941L350.7 99.2c5.2 21.5 4.7 44-1.4 65.3c20.3-5.8 41.8-7.4 62.4-2.1L471 103c9.4-9.34 24.6-9.34 33.1 0c10.2 9.4 10.2 24.6 0 33.1l-45.3 47c4.5 3.2 8.8 6.7 12.9 10.6c-45.4 6.2-85.2 29.8-112.6 63.7c-7.1-4.1-13.7-9.1-19.7-15.1l-12.2-12.2l-31.9 31c17.2 2.5 34.2 7.7 49.7 16.3c-15.9 26.5-25 57.5-25 90.6v3.1c-29.1 4.5-60-4.5-82.4-27l-12.2-12.2l-31.9 31.9c27.6 2.7 56.2 15 78 36.9l11.3 10.4c6.3 7.1 6.3 17.3 0 23.5l-11.3 11.3c-37.5 37.5-98.2 37.5-135.7 0l-12.3-12.2l-68.87 68.9c-12.5 12.5-32.76 12.5-45.258 0c-12.496-12.5-12.496-32.7 0-45.2l68.918-68.9L67.88 378c-37.49-37.4-37.49-98.2 0-135.7l11.32-12.2c6.24-5.4 16.37-5.4 22.6 0l11.3 12.2c21 21 33.2 47.4 36.6 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.3 0-135.7l11.3-11.4c6.3-6.2 16.4-6.2 22.6 0l10.5 11.4c21 20.9 34 47.4 37.4 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.28 0-135.77l11.3-11.32c6.3-6.25 16.4-6.25 22.7 0l11.3 11.32zM352 368c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm144 96c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm-16.9-176v80c0 8.8 8.1 16 16 16c9.7 0 16-7.2 16-16v-80c0-8.8-6.3-16-16-16c-7.9 0-16 7.2-16 16z"/></svg>
            </li>
            <li v-if="recipe.glutenFree&&!recipe.vegan&&!recipe.vegetarian" style="height: 38px;">
            </li>   
          </ul>
        </div>
      </div>
    </b-card-text>
  </b-card>
</div>

</template>

<script>
export default {
  created() {
    this.activeColor = "blue";
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
    if (this.recipe.userView) {
      this.activeColor = "grey";
    }
  },
  data() {
    return {
      image_load: true,
      activeColor: "blue",
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Amaranth&family=Comfortaa:wght@300&family=Lemonada:wght@400;500&family=Mali:wght@200&family=Shadows+Into+Light+Two&family=Syncopate&display=swap");

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

.recipe-image {
  width: 100%;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 170px;
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
  /* padding: 5px 10px; */
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
  font-size: 10pt;
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
  /* color: rgb(222, 222, 222); */
}

.details {
  /* list-style: none; */
  display: flex;
  /* float: center; */
  /* margin-left: 35%; */
  font-size: 25pt;
  /* padding-left: 15%; */

  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 5px;
}
ul.details li {
  text-align: center;
  display: table-cell;
  width: 75px;
  flex-grow: 1;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  /* margin-left: 30%; */
  font-size: 18pt;
}

#minutes,
#like {
  color: #343a40;
  font-family: monospace;
  font-size: 14pt;
  font-weight: bold;
}

#btnLike {
  border: 1px solid #a6babd;
  background-color: rgb(25, 43, 43);
  box-shadow: 0 1px 2px 3px #bdd8d9, 0 0 3px 2px #defdfe;
  margin: -13% 0 0 72%;
  border-radius: 100%;
  font-size: 18pt;
}
</style>
