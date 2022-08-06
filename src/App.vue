<template>
  <div id="app"> 
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#" id="brand">sal-recipes</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav style="padding-left: 8%">
            <b-nav-item :to="{ name: 'main' }" >Main</b-nav-item>
            <b-nav-item href="#" style="margin-left:4%;">About</b-nav-item>
            <b-nav-item size="sm" class="my-2 my-sm-0" :to="{ name: 'search' }" style="margin-left:4%;">Search</b-nav-item>
            <span v-if="!$root.store.username" class="userConnect">
              Guest:
              <b-nav-item :to="{ name: 'register' }" style="margin-left:4%;">Register</b-nav-item>
              <b-nav-item :to="{ name: 'login' }" style="margin-left:4%;">Login</b-nav-item>
            </span>
            <span v-else class="userConnect" style="margin-left:4%;">
              <b-nav-item-dropdown text="Personal" right >
                <b-dropdown-item :to="{ name: 'MyFavorites' }">Favorites</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'MyPrivate' }">Private</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'MyFamily' }">La Familia</b-dropdown-item>
              </b-nav-item-dropdown>
            <b-nav-item style="margin-left:4%;display: inline-block; white-space: nowrap;"   @click="showModal">Create Recipe</b-nav-item>          
            </span>
            <span  v-if="$root.store.username" style="margin-left:50%;">
                <button variant="outline-info" style="background-color:	#D3D3D3;border:3px solid #00FFFF;border-radius: 25px; width: 170%;height: 95%;" class="mb-2" @click="Logout">
                  <b-icon icon="power" aria-hidden="true">
                </b-icon> {{ $root.store.username }}</button>
            </span>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>      
    <b-modal size="lg" id="modal-1" ref="my-modal1" title="Create Recipe" @ok="create">
      <CreateRecipe ref="createRecipe" />
    </b-modal>
    <router-view />
  </div>
</template>

<script>
import CreateRecipe from './components/CreateRecipe.vue';

export default {
  name: "App",
  components: {
      CreateRecipe,
    },
    data() {
      return {
        // modalShow:false
      };
    },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    showModal() {
        this.$refs['my-modal1'].show()
      },
      async create(event){
        event.preventDefault()
        console.log(this.$refs.createRecipe.form,"form");
        if(!(this.$refs.createRecipe.form.recipeName && this.$refs.createRecipe.form.ingredients && this.$refs.createRecipe.form.image && this.$refs.createRecipe.form.preparationTime && this.$refs.createRecipe.form.preparationInstructions)){
          console.log("am");
          return
        }
        // add ml grm to amount 
        let str = "";
        let f=false;
        for (const [key, value] of Object.entries(this.$refs.createRecipe.form.ingredients)) {
          console.log("value",value)
          if(str!=="") {str+=",";}
          str+=`${value.ingredient}:${value.amount}`;
          // if(key==0)
          //   continue;
          // if(String(key)=="ingredient"){
          //   if(f){
          //     str+=","  }
          //   f=true;
          //   str+=`${value}:`
          // }
          // if(String(key)=="amount"){
          //   str+=`${value}`
          // }
        }
        console.log("str",str)
        // call server - create recipe
        let ids="";
        try {
        this.axios.defaults.withCredentials = true;  
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
           this.$root.store.serverDomain+"/recipes/createRecipe/",
          {
            recipeName: this.$refs.createRecipe.form.recipeName,
            image: this.$refs.createRecipe.form.image,
            preparationTime: this.$refs.createRecipe.form.preparationTime,
            clickable:Object.values(this.$refs.createRecipe.form.checked).includes("c1"),
            ingredients: str,
            preparationInstructions:this.$refs.createRecipe.form.preparationInstructions,
            numberOfDishes:this.$refs.createRecipe.form.numberOfDishes,
            vegetarian:Object.values(this.$refs.createRecipe.form.checked).includes("c2"),
            vegan: Object.values(this.$refs.createRecipe.form.checked).includes("c3"),
            gluten: Object.values(this.$refs.createRecipe.form.checked).includes("c4"),
            owner:this.$refs.createRecipe.form.owner,
            customaryPrepare:this.$refs.createRecipe.form.customaryPrepare,
          },{withCredentials: true}
        );
        console.log(response);
        ids= response.data.recipe_id.toString();
      } catch (err) {
        console.log(err)
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }

        // if selected my-family add to myFamily table
        if((!(this.$refs.createRecipe.flag) &&this.$refs.createRecipe.form.owner &&this.$refs.createRecipe.form.customaryPrepare))
           {
             try {
                this.axios.defaults.withCredentials = true;  
                const response1 = await this.axios.post(
                  // "https://test-for-3-2.herokuapp.com/user/Register",
                this.$root.store.serverDomain+"/users/myFamily",

          {reciepeId: ids,},{withCredentials: true}
        );
        // console.log(response);
      } catch (err) {
        console.log(err.response1);
        this.form.submitError = err.response.data.message;
      }
           }

        this.$nextTick(() => {
        this.$bvModal.hide('modal-1')
        })    
      },
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
@import url('https://fonts.googleapis.com/css2?family=Amaranth&family=Lemonada:wght@400;500&family=Mali:wght@200&family=Shadows+Into+Light+Two&family=Syncopate&display=swap');

#app {
  font-family: 'Brush Script MT', cursive;
  font-size: 12pt;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 3px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.userConnect{
  display: flex;
}
#brand{
    font-size: 20pt;
    font-family: 'Syncopate', sans-serif;

}

</style>
