<template>
  <div class="container" style="max-width: 1980px; width: 100%">
    <h1 class="title">Main Page</h1>  
    <div style="display: flex;">
    <div style="width: 50%; float: left;">
    <RecipePreviewList style="text-align: center;  font-family: Comfortaa;" title="Randome Recipes " class="RandomRecipes center" :key="componentKey" />
    <b-button id="random" style="margin-left:50% ;margin-top: -10%;" @click="reload">
      <b-icon icon="shuffle" aria-hidden="true"></b-icon>
    </b-button>
  </div>
<div style="width: 50%;  font-family: Comfortaa;
 float: right;">
    <!-- <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link> -->
    <RecipeViewList
       style="text-align: center;"  
       title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        // blur: !$root.store.username,
        center: true
      }"
      v-if="$root.store.username"
    ></RecipeViewList>
    <LoginPage 
    v-if="!$root.store.username"
    :class="{
        RandomRecipes: true,
        // blur: !$root.store.username,
        center: true
      }"
      ></LoginPage>
    </div>
    </div>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import RecipeViewList from "../components/RecipeViewList";
import LoginPage from "../pages/LoginPage";
export default {
  data(){
    return{
      componentKey: 0,
    }
  },
  components: {
    RecipePreviewList,
    RecipeViewList,
    LoginPage
  },
  methods:{
    reload(){
      this.componentKey+=1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Amaranth&family=Comfortaa:wght@300&family=Lemonada:wght@400;500&family=Mali:wght@200&family=Shadows+Into+Light+Two&family=Syncopate&display=swap');
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
#random{
  font-family: Comfortaa;
}
#random:hover{
  background-color:rgb(205, 205, 205);
  color: black;
}
</style>
