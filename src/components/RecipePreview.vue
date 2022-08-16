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
      <img v-if="recipe.image" :src="recipe.image" class="recipe-image" />
      <img v-else 
                  src="https://www.linkpicture.com/q/sal.png"
                  alt=""
                 width="100%"
                 height="33%"
                  
       />
      <!-- <img v-else :src="" class="recipe-image" /> -->
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
          <!-- <ul class="recipe-overview" style="  position: absolute;color: #343a40;">
            <li style="margin-left: -20%;">
              <b-icon icon="clock" aria-hidden="true"></b-icon>
              <span id="minutes"> {{ recipe.readyInMinutes }}</span> min
            </li>
            <li >
              <b-icon icon="hand-thumbs-up" aria-hidden="true"></b-icon
              ><span id="like"> {{ recipe.popularity }}</span>
            </li>
          </ul>  -->

          <b-button-group  size="sm" style="width:100%;" >
              <b-button variant="light" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" style="margin-bottom:5%" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="black"><path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/><path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/><path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/></g></svg>
                <span id="minutes"> {{ recipe.readyInMinutes }}</span> min
              </b-button>
              <b-button  variant="light"   disabled>  
                <svg style="margin-bottom:8%"  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="black" fill-opacity=".15" d="M273 495.9v428l.3-428zm538.2-88.3H496.8l9.6-198.4c.6-11.9-4.7-23.1-14.6-30.5c-6.1-4.5-13.6-6.8-21.1-6.7c-19.6.1-36.9 13.4-42.2 32.3c-37.1 134.4-64.9 235.2-83.5 302.5V852h399.4a56.85 56.85 0 0 0 33.6-51.8c0-9.7-2.3-18.9-6.9-27.3l-13.9-25.4l21.9-19a56.76 56.76 0 0 0 19.6-43c0-9.7-2.3-18.9-6.9-27.3l-13.9-25.4l21.9-19a56.76 56.76 0 0 0 19.6-43c0-9.7-2.3-18.9-6.9-27.3l-14-25.5l21.9-19a56.76 56.76 0 0 0 19.6-43c0-19.1-11-37.5-28.8-48.4z"/><path fill="black" d="M112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32zm773.9 5.7c16.8-22.2 26.1-49.4 26.1-77.7c0-44.9-25.1-87.5-65.5-111a67.67 67.67 0 0 0-34.3-9.3H572.3l6-122.9c1.5-29.7-9-57.9-29.5-79.4a106.4 106.4 0 0 0-77.9-33.4c-52 0-98 35-111.8 85.1l-85.8 310.8l-.3 428h472.1c9.3 0 18.2-1.8 26.5-5.4c47.6-20.3 78.3-66.8 78.3-118.4c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37zM820.4 499l-21.9 19l14 25.5a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.1 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.1 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H345V506.8c18.6-67.2 46.4-168 83.5-302.5a44.28 44.28 0 0 1 42.2-32.3c7.5-.1 15 2.2 21.1 6.7c9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.1 32.2-19.6 43z"/></svg>
                <span id="like"> {{ recipe.popularity }}</span>
              </b-button>
          </b-button-group>
          <b-button-group  size="sm" style="width:100%;" >
              <b-button variant="light"  disabled>
                 <svg v-if="recipe.vegetarian" v-b-tooltip.v-info  v-b-tooltip.hover v-b-tooltip.bottom title="vegetarian" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="27" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="#00a591" d="m.59 15.956l171.09 473.93a29.099 29.099 0 0 0 27.37 19.218h123.777c6.73 0 12.737-4.222 15.016-10.555l173.57-482.481c2.43-6.754-3.026-13.73-10.166-12.998L363.502 17.186a24.03 24.03 0 0 0-20.251 16.021L256.817 282.08L169.795 32.097a24.03 24.03 0 0 0-20.43-16.023L10.679 2.94C3.56 2.267-1.838 9.231.59 15.956z"/></svg>
                 <svg v-if="!recipe.vegan && !recipe.vegetarian && !recipe.glutenFree " xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="27" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="#f8f9fa" stroke="#f8f9fa" stroke-width="4" d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"/></svg>
             </b-button>
              <b-button  variant="light" disabled>  
                <svg v-if="recipe.vegan" v-b-tooltip.v-success v-b-tooltip.hover v-b-tooltip.bottom title="vegan" id="vegan" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="34" height="34" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#79c753" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M14.5 11.5C12.75 13.382 11 18 11 18s-2.5-6.5-5-8"/><path d="m18.015 7.73l.297 3.08c.192 1.998-1.306 3.777-3.304 3.97c-1.96.188-3.736-1.245-3.925-3.205a3.566 3.566 0 0 1 3.208-3.892l3.284-.316a.404.404 0 0 1 .44.363Z"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"/></g></svg>
                <svg v-if="!recipe.vegan && !recipe.vegetarian && !recipe.glutenFree " xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="27" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="#f8f9fa" stroke="#f8f9fa" stroke-width="4" d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"/></svg>
              </b-button>
              <b-button variant="light" disabled>
                <svg v-if="recipe.glutenFree" v-b-tooltip.v-warning v-b-tooltip.hover v-b-tooltip.bottom  title="gluten-free" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="34" height="34" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="#efc050" d="M416.1 128.1c-8.5 10.2-23.7 10.2-33.1 0c-9.3-8.5-9.3-23.7 0-33.07l88-88.001c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941l-88 87.13zm-99.3-89.47c4.5 4.52 8.6 9.31 12.3 14.3L375 7.029c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941L350.7 99.2c5.2 21.5 4.7 44-1.4 65.3c20.3-5.8 41.8-7.4 62.4-2.1L471 103c9.4-9.34 24.6-9.34 33.1 0c10.2 9.4 10.2 24.6 0 33.1l-45.3 47c4.5 3.2 8.8 6.7 12.9 10.6c-45.4 6.2-85.2 29.8-112.6 63.7c-7.1-4.1-13.7-9.1-19.7-15.1l-12.2-12.2l-31.9 31c17.2 2.5 34.2 7.7 49.7 16.3c-15.9 26.5-25 57.5-25 90.6v3.1c-29.1 4.5-60-4.5-82.4-27l-12.2-12.2l-31.9 31.9c27.6 2.7 56.2 15 78 36.9l11.3 10.4c6.3 7.1 6.3 17.3 0 23.5l-11.3 11.3c-37.5 37.5-98.2 37.5-135.7 0l-12.3-12.2l-68.87 68.9c-12.5 12.5-32.76 12.5-45.258 0c-12.496-12.5-12.496-32.7 0-45.2l68.918-68.9L67.88 378c-37.49-37.4-37.49-98.2 0-135.7l11.32-12.2c6.24-5.4 16.37-5.4 22.6 0l11.3 12.2c21 21 33.2 47.4 36.6 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.3 0-135.7l11.3-11.4c6.3-6.2 16.4-6.2 22.6 0l10.5 11.4c21 20.9 34 47.4 37.4 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.28 0-135.77l11.3-11.32c6.3-6.25 16.4-6.25 22.7 0l11.3 11.32zM352 368c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm144 96c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm-16.9-176v80c0 8.8 8.1 16 16 16c9.7 0 16-7.2 16-16v-80c0-8.8-6.3-16-16-16c-7.9 0-16 7.2-16 16z"/></svg>   
                <svg v-if="!recipe.vegan && !recipe.vegetarian && !recipe.glutenFree " xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="27" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="#f8f9fa" stroke="#f8f9fa" stroke-width="4" d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"/></svg>
             </b-button>
          </b-button-group>

          <!-- <ul class="details" style="position: absolute;bottom: 0px;padding: 1%;">
            <li v-if="recipe.vegetarian" >
            <div>
              <span class="d-inline-block" tabindex="0" v-b-tooltip.v-info v-b-tooltip.bottom  title="vegetarian">
                 <span class="vegetarianicon" style="color: #00a591;">Ⓥ</span>
              </span>
            </div>
            </li>
            <li v-if="recipe.vegan" >  
            <div>
              <span class="d-inline-block" tabindex="0" v-b-tooltip.v-success v-b-tooltip.bottom  title="vegan">
                 <span style="color: #00a591;">
                   <svg id="vegan" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="34" height="34" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#79c753" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M14.5 11.5C12.75 13.382 11 18 11 18s-2.5-6.5-5-8"/><path d="m18.015 7.73l.297 3.08c.192 1.998-1.306 3.777-3.304 3.97c-1.96.188-3.736-1.245-3.925-3.205a3.566 3.566 0 0 1 3.208-3.892l3.284-.316a.404.404 0 0 1 .44.363Z"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"/></g></svg>
                 </span>
              </span>
            </div>

            </li>
            <li v-if="recipe.glutenFree" >
            <div>
              <span class="d-inline-block" tabindex="0" v-b-tooltip.v-warning v-b-tooltip.bottom  title="gluten-free">
                 <svg id="gluten" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.25em" height="1.6em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="#efc050" d="M416.1 128.1c-8.5 10.2-23.7 10.2-33.1 0c-9.3-8.5-9.3-23.7 0-33.07l88-88.001c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941l-88 87.13zm-99.3-89.47c4.5 4.52 8.6 9.31 12.3 14.3L375 7.029c9.4-9.372 24.6-9.372 33.1 0c10.2 9.371 10.2 24.571 0 33.941L350.7 99.2c5.2 21.5 4.7 44-1.4 65.3c20.3-5.8 41.8-7.4 62.4-2.1L471 103c9.4-9.34 24.6-9.34 33.1 0c10.2 9.4 10.2 24.6 0 33.1l-45.3 47c4.5 3.2 8.8 6.7 12.9 10.6c-45.4 6.2-85.2 29.8-112.6 63.7c-7.1-4.1-13.7-9.1-19.7-15.1l-12.2-12.2l-31.9 31c17.2 2.5 34.2 7.7 49.7 16.3c-15.9 26.5-25 57.5-25 90.6v3.1c-29.1 4.5-60-4.5-82.4-27l-12.2-12.2l-31.9 31.9c27.6 2.7 56.2 15 78 36.9l11.3 10.4c6.3 7.1 6.3 17.3 0 23.5l-11.3 11.3c-37.5 37.5-98.2 37.5-135.7 0l-12.3-12.2l-68.87 68.9c-12.5 12.5-32.76 12.5-45.258 0c-12.496-12.5-12.496-32.7 0-45.2l68.918-68.9L67.88 378c-37.49-37.4-37.49-98.2 0-135.7l11.32-12.2c6.24-5.4 16.37-5.4 22.6 0l11.3 12.2c21 21 33.2 47.4 36.6 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.3 0-135.7l11.3-11.4c6.3-6.2 16.4-6.2 22.6 0l10.5 11.4c21 20.9 34 47.4 37.4 74.8l30.4-30.5l-10.4-10.4c-37.5-37.5-37.5-98.28 0-135.77l11.3-11.32c6.3-6.25 16.4-6.25 22.7 0l11.3 11.32zM352 368c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm144 96c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm-16.9-176v80c0 8.8 8.1 16 16 16c9.7 0 16-7.2 16-16v-80c0-8.8-6.3-16-16-16c-7.9 0-16 7.2-16 16z"/></svg>
              </span>
            </div>


        </li>
            <li v-if="recipe.glutenFree&&!recipe.vegan&&!recipe.vegetarian" style="height: 38px;">
            </li>   
          </ul> -->
        </div>

      </div>
    </b-card-text>
  </b-card>
</div>
</template>

<script>
export default {
  created() {
    this.activeColor = "black";
    
    if (this.recipe.userView) {
      this.activeColor = "grey";
    }
  },
  data() {
    return {
      activeColor: "black",
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
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-image {
  width: 100%;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 168px;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 3px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
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
}

.details {
  display: flex;
  font-size: 25pt;
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
  font-size: 18pt;
}

#minutes,
#like {
  color: #343a40;
  font-family: monospace;
  font-size: 12pt;
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
/* svg{
  margin-bottom:10%;
} */
</style>
