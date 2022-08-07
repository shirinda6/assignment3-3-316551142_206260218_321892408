<template>
 <b-card no-body class="recipe-preview" border-variant="dark" >
  <router-link
          :to="{ name: 'RecipePage', params: { recipe: recipe } }">
         <img v-if="image_load" :src="recipe.image" class="recipe-image" />
      </router-link>
      <b-card-text>
        <div class="recipe-footer">
          <div :title="recipe.recipeName" class="recipe-title">
              {{ recipe.recipeName }}
            </div>
            <ul class="recipe-overview" style="position: absolute; bottom: 0;" >
              <li><b-icon icon="clock" aria-hidden="true"></b-icon> <span id="minutes">{{ recipe.preparationTime }}</span> min</li>

            </ul>
          </div>
      </b-card-text>
 </b-card>






<!-- 
  <router-link
    :to="{ name: 'RecipePage', params: { recipe: recipe } }"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li><b-icon icon="clock" aria-hidden="true"></b-icon> <span id="minutes">{{ recipe.preparationTime }}</span> min</li>
      </ul>
    </div>
  </router-link> -->
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
      image_load: true
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

.recipe-preview .recipe-footer {
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.recipe-image{
  width:100%
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

#minutes{
  color: #000000;
  font-family: monospace;
  font-size: 14pt;
  font-weight: bold;

}
</style>
