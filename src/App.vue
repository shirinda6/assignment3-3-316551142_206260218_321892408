<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      {{ !$root.store.username }}
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        <b-dropdown text="Personal" variant="outline-danger" class="m-2">
          <b-dropdown-item :to="{ name: 'MyFavorites' }">Favorites</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'MyPrivate' }">Private</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'MyFamily' }">La Familia</b-dropdown-item>
        </b-dropdown>
        <!-- <b-button @click="modalShow = !modalShow">Create recipe</b-button> -->
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </span>
    </div>
    



    
     <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'main' }">Vue Recipes</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      <!-- </b-navbar-nav> -->

      <!-- Right aligned nav items -->
      <!-- <b-navbar-nav class="ml-auto"> -->
          <b-nav-item size="sm" class="my-2 my-sm-0" :to="{ name: 'search' }">Search</b-nav-item>
<span v-if="!$root.store.username">
        Guest:
        <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
      </span>
      <span v-else>
        <b-nav-item-dropdown text="Personal" right>
          <b-dropdown-item :to="{ name: 'MyFavorites' }">Favorites</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'MyPrivate' }">Private</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'MyFamily' }">La Familia</b-dropdown-item>
        </b-nav-item-dropdown>

<b-button size="sm" class="my-2 my-sm-0" @click="showModal">create Recipe</b-button>
{{ $root.store.username }}: <button @click="Logout">Logout</button>
</span>
        <!-- <b-nav-item-dropdown right>
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
    
    
<b-modal id="modal-1" ref="my-modal1" title="Create Recipe" @ok="create">
    <CreateRecipe />
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
      create(){
        console.log("create");
      }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
