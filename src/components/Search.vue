<template>
  <div style=" display: flex; margin-left: 5%;">
    <div style="width: 60%; float: left;">
      <div>
        <div>
          <b-form-input style="width: 90%"
    id="foodName"
    placeholder="Enter food name"
    v-model="model"></b-form-input>
        </div>
      </div>
      <div>
        <b-form-spinbutton
          id="sb-step"
          v-model="selected"
          style="width:90% ;margin-top: 2%; padding: 1%;"
          min="5"
          max="15"
          step="5"
        ></b-form-spinbutton>
      </div>
      <div style="margin-top: -16%;margin-left: -14%; width: 15%;">
        <b-button class="bt" v-b-toggle.sidebar-1 variant="dark" style="font-size: 20pt;height: 80px;border-radius: 10%;background-color: rgba(149,179,169,.75);box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.5);" @click="showSidebar=true;"><b-icon icon="filter" aria-hidden="true"></b-icon></b-button>
        <b-sidebar id="sidebar-1" :visible="showSidebar" title="Select for filter"  >
          <div role="tablist" class="accordion"> 
            <b-card no-body class="mb-1" >
              <b-card-header role="tab" class="p-1" header-tag="header">
                <b-button block v-b-toggle.cuisines
                  ><b-icon icon="chevron-down" aria-hidden="true"></b-icon>
                  cuisines</b-button
                >
              </b-card-header>
              <b-collapse
                id="cuisines"
                visible
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-form-checkbox
                    v-for="cuisine in cuisines"
                    v-bind:key="cuisine"
                    v-bind:value="cuisine"
                    @input="insertCuisines(cuisine)"
                    >{{ cuisine }}</b-form-checkbox
                  >
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header role="tab" class="p-1">
                <b-button block v-b-toggle.diets
                  ><b-icon icon="chevron-down" aria-hidden="true"></b-icon>
                  diets</b-button
                >
              </b-card-header>
              <b-collapse id="diets" visible role="tabpanel">
                <b-card-body>
                  <b-form-checkbox
                    v-for="diet in diets"
                    v-bind:key="diet"
                    v-bind:value="diet"
                    @input="insertDiets(diet)"
                    >{{ diet }}
                  </b-form-checkbox>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header role="tab" class="p-1">
                <b-button block v-b-toggle.intolerances
                  ><b-icon icon="chevron-down" aria-hidden="true"></b-icon>
                  intolerances</b-button
                >
              </b-card-header>
              <b-collapse id="intolerances" visible role="tabpanel">
                <b-card-body>
                  <b-form-checkbox
                    v-for="intolerance in intolerances"
                    v-bind:key="intolerance"
                    v-bind:value="intolerance"
                    @input="insertIntolerances(intolerance)"
                    >{{ intolerance }}</b-form-checkbox
                  >
                </b-card-body>
              </b-collapse>
            </b-card>
          </div> 
        </b-sidebar>
      </div>
    </div>
    <div class="col" style="float: left;">
      <b-button
        class="bt"
        type="submit"
        variant="dark"
        @click="SearchRecipe"
        style=" margin-top: 2%;box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.5); background-color: rgba(149,179,169,.75);margin-left:-10%; border-radius: 50%; width: 25%;height:90%;font-size: 20pt;"
        ><b-icon icon="search" aria-hidden="true"></b-icon
      ></b-button>
    </div>
  </div>
</template>

<script>
import cuisines from "../assets/cuisines";
import diets from "../assets/diets";
import intolerances from "../assets/intolerances";

export default {
  data() {
    return {
      food:"",
      cuisines: [],
      diets: [],
      intolerances: [],
      recipes: [],
      showSidebar:false,
    };
  },
  props: {
    selected: {
      type: Number,
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    filtercuisines: {
      type: Array,
      required: true,
    },
    filterdiets: {
      type: Array,
      required: true,
    },
    filterintolerances: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
  },
  computed: {
    model: {
      get() {
        return this.foodName;
      },
      set(value) {
        this.$emit('inputName', this.foodName);
        this.food=value;
      },
    },
  },
  methods: {
    insertCuisines(item) {
      if (this.filtercuisines.includes(item)) {
        let index = this.filtercuisines.indexOf(item);
        this.filtercuisines.splice(index, 1);
      } else this.filtercuisines.push(item);
    },
    insertDiets(item) {
      if (this.filterdiets.includes(item)) {
        let index = this.filterdiets.indexOf(item);
        this.filterdiets.splice(index, 1);
      } else this.filterdiets.push(item);
    },
    insertIntolerances(item) {
      if (this.filterintolerances.includes(item)) {
        let index = this.filterintolerances.indexOf(item);
        this.filterintolerances.splice(index, 1);
      } else this.filterdiets.push(item);
    },
    async SearchRecipe() {
      try {
        let params = {
          numberOfRecipe: this.selected,
          RecipeName: this.food,
          cuisine: this.filtercuisines.join(","),
          diet: this.filterdiets.join(","),
          intolerance: this.filterintolerances.join(","),
        };
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          this.$root.store.serverDomain + "/recipes/search",
          { params },
          { withCredentials: true }
        );
        console.log(response);
        this.showSidebar=false;
        this.recipes = response.data.search;
        let last = {
            paramsQuery: params,
            resuilts: this.recipes,
          };
        if (this.$root.store.username) {
          const views = response.data.view;
          const favorites = response.data.favorite;

          this.recipes.forEach((recipe) => {
            recipe.userView = views[recipe.id];
            recipe.userFavorite = favorites[recipe.id];
          });
          last = {
            paramsQuery: params,
            resuilts: this.recipes,
          };

          this.$root.store.Search(last);
        }
        console.log("end",this.food);
        this.$emit("res", last);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.bt:hover{
 color: #25383C;;
 background-color:rgba(177, 188, 184, 0.75)
}
</style>
