<template>
  <div class="container" style="max-width: 1980px; width: 100%;">
    <div style="display: flex;">
    <div style="width: 50%; float: left;">
    <RecipePreviewList style="text-align: center;  font-family: Comfortaa;margin-top: 3%; margin-left: -3%;" title="Explore this recipes" class="RandomRecipes center" :key="componentKey" />
    <b-button id="random" style="margin-left:45%; box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.5);" @click="reload">
      <b-icon icon="shuffle" aria-hidden="true"></b-icon>
    </b-button>
  </div>
<div style="width: 50%; padding-top: 0.8%; font-family: Comfortaa;
 float: right;">
    <RecipeViewList
       style="text-align: center;"  
       title="Last watched recipes"
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

//  .container {
//     background: url("https://inspirationfeed.com/wp-content/uploads/2019/10/Top-5-Healthy-Foods-to-Eat-in-2019.jpg") center top no-repeat fixed;
    
//     // padding-top: 2%;
    
//     position: fixed;
//     float: center;
//     background-image: url('background.jpg') ;
//      background-repeat: no-repeat;
//     background-size: cover;

//     padding-bottom: 2%;
// }

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
