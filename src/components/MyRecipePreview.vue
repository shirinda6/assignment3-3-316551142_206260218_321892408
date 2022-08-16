<template>
  <b-card
    no-body
    class="recipe-preview"
    border-variant="dark"
    style="font-family: Comfortaa;"
  >
    <router-link :to="{ name: 'RecipePage', params: { recipe: recipe } }">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </router-link>
    <b-card-text>
      <div class="recipe-footer" >
        <div :title="recipe.recipeName" class="recipe-title" style="height:60px ;margin-top: 1.5%; color:grey;">
          {{ recipe.recipeName }}
        </div>
        <div style="text-decoration: white;width: 100%;height: 100%;margin-top: 6%;padding: 1%;border-top: 2px solid whitesmoke;    text-shadow: 2px 2px lightgray;;">  
            <b-button-group  size="sm" style="width:100%;" >
              <b-button variant="light" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" style="margin-bottom:2%" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="black"><path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/><path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/><path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/></g></svg>
                <span id="minutes"> {{ recipe.preparationTime }}</span> min
              </b-button>
            </b-button-group>
            <b-button-group  size="sm" style="width:100%;" >
                <b-button  variant="light" disabled>  
                  <svg v-if="recipe.vegan" v-b-tooltip.v-success v-b-tooltip.hover v-b-tooltip.bottom title="vegan" id="vegan" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="34" height="34" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#79c753" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M14.5 11.5C12.75 13.382 11 18 11 18s-2.5-6.5-5-8"/><path d="m18.015 7.73l.297 3.08c.192 1.998-1.306 3.777-3.304 3.97c-1.96.188-3.736-1.245-3.925-3.205a3.566 3.566 0 0 1 3.208-3.892l3.284-.316a.404.404 0 0 1 .44.363Z"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"/></g></svg>
                  <svg v-if="!recipe.vegan && !recipe.vegetarian && !recipe.gluten " xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="27" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="#f8f9fa" stroke="#f8f9fa" stroke-width="4" d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"/></svg>
                </b-button>
                <b-button variant="light"  disabled>
                  <svg v-if="recipe.vegetarian" v-b-tooltip.v-info  v-b-tooltip.hover v-b-tooltip.bottom title="vegetarian" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="27" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="#00a591" d="m.59 15.956l171.09 473.93a29.099 29.099 0 0 0 27.37 19.218h123.777c6.73 0 12.737-4.222 15.016-10.555l173.57-482.481c2.43-6.754-3.026-13.73-10.166-12.998L363.502 17.186a24.03 24.03 0 0 0-20.251 16.021L256.817 282.08L169.795 32.097a24.03 24.03 0 0 0-20.43-16.023L10.679 2.94C3.56 2.267-1.838 9.231.59 15.956z"/></svg>
                  <svg v-if="!recipe.vegan && !recipe.vegetarian && !recipe.gluten " xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="27" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="#f8f9fa" stroke="#f8f9fa" stroke-width="4" d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"/></svg>
                </b-button>
                <b-button variant="light" disabled>
                  <svg v-if="recipe.gluten" v-b-tooltip.v-warning v-b-tooltip.hover v-b-tooltip.bottom  title="gluten-free" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="34" height="34" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="#efc050" d="M416.1 128.1c-8.5 10.2-23.7 10.2-33.1 0c-9.3-8.5-9.3-23.7 0-33.07l88-88.001c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941l-88 87.13zm-99.3-89.47c4.5 4.52 8.6 9.31 12.3 14.3L375 7.029c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941L350.7 99.2c5.2 21.5 4.7 44-1.4 65.3c20.3-5.8 41.8-7.4 62.4-2.1L471 103c9.4-9.34 24.6-9.34 33.1 0c10.2 9.4 10.2 24.6 0 33.1l-45.3 47c4.5 3.2 8.8 6.7 12.9 10.6c-45.4 6.2-85.2 29.8-112.6 63.7c-7.1-4.1-13.7-9.1-19.7-15.1l-12.2-12.2l-31.9 31c17.2 2.5 34.2 7.7 49.7 16.3c-15.9 26.5-25 57.5-25 90.6v3.1c-29.1 4.5-60-4.5-82.4-27l-12.2-12.2l-31.9 31.9c27.6 2.7 56.2 15 78 36.9l11.3 10.4c6.3 7.1 6.3 17.3 0 23.5l-11.3 11.3c-37.5 37.5-98.2 37.5-135.7 0l-12.3-12.2l-68.87 68.9c-12.5 12.5-32.76 12.5-45.258 0c-12.496-12.5-12.496-32.7 0-45.2l68.918-68.9L67.88 378c-37.49-37.4-37.49-98.2 0-135.7l11.32-12.2c6.24-5.4 16.37-5.4 22.6 0l11.3 12.2c21 21 33.2 47.4 36.6 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.3 0-135.7l11.3-11.4c6.3-6.2 16.4-6.2 22.6 0l10.5 11.4c21 20.9 34 47.4 37.4 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.28 0-135.77l11.3-11.32c6.3-6.25 16.4-6.25 22.7 0l11.3 11.32zM352 368c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm144 96c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm-16.9-176v80c0 8.8 8.1 16 16 16c9.7 0 16-7.2 16-16v-80c0-8.8-6.3-16-16-16c-7.9 0-16 7.2-16 16z"/></svg>   
                  <svg v-if="!recipe.vegan && !recipe.vegetarian && !recipe.gluten " xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="27" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="#f8f9fa" stroke="#f8f9fa" stroke-width="4" d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"/></svg>
              </b-button>             
         
            </b-button-group>
        </div>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: true,
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
  font-size: 15pt;
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

#minutes{
  color: #343a40;
  font-family: monospace;
  font-size: 14pt;
  font-weight: bold;
}
img{
  max-height: 217px;
  height: 110%;
}
</style>
