<template>
  <div style="max-width: 1000px; width: 100%;font-family: Comfortaa;">
    <b-form @submit.stop.prevent="handleSubmit">
      <b-form-checkbox id="family" @input="flag = !flag" value="family"
        >family recipe</b-form-checkbox
      >
      <b-form-group
        id="input-group-recipeName"
        label-cols-sm="3"
        label="recipe name:"
        label-for="recipeName"
      >
        <b-form-input
          id="recipeName"
          v-model="$v.form.recipeName.$model"
          type="text"
          :state="validateState('recipeName')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Recipe name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-image"
        label-cols-sm="3"
        label="Image:"
        label-for="image"
      >
        <b-form-input
          id="image"
          v-model="$v.form.image.$model"
          type="text"
          :state="validateState('image')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Image is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-preparationTime"
        label-cols-sm="3"
        label="Preparation Time :"
        label-for="preparationTime"
      >
        <b-form-input
          id="preparationTime"
          v-model="$v.form.preparationTime.$model"
          type="text"
          :state="validateState('preparationTime')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Preparation time is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-numberOfDishes"
        label-cols-sm="3"
        label="number Of Dishes:"
        label-for="numberOfDishes"
      >
        <b-form-input
          id="numberOfDishes"
          v-model="$v.form.numberOfDishes.$model"
          type="number"
          min="1"
          :state="validateState('numberOfDishes')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Number Of Dishes is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes-4"
         
          :aria-describedby="ariaDescribedby"
        >Select diets:
    
        <b-form-checkbox style="  margin-left: 12%;" value="c1">Clickable</b-form-checkbox>
        <b-form-checkbox value="c2">Vegetarian</b-form-checkbox>
        <b-form-checkbox value="c3">Vegan</b-form-checkbox>
        <b-form-checkbox value="c4">Gluten</b-form-checkbox>
      
       
        </b-form-checkbox-group>
      </b-form-group>
      <label>Add ingredients : </label>
      <label style="margin-left: 7%;">Ingredient </label>
      <label style="margin-left: 19%;">Amount </label>
      <b-row v-for="(ingredient, index) in form.ingredients" :key="index">
        <b-form-group
          style="margin-left: 26%;"
          id="input-group-ingredient"
          label-for="ingredient"
        >
          <b-form-input
            id="ingredient"
            v-model="$v.form.ingredients.$each[index].ingredient.$model"
            type="text"
            class="form-control"
            :name="`ingredients[${index}][ingredient]`"
            :state="validateState('ingredients', '$each', index, 'ingredient')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Ingredient is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-amount" label-for="amount">
          <b-form-input
            id="amount"
            v-model="$v.form.ingredients.$each[index].amount.$model"
            type="number"
            min="1"
            class="form-control"
            :name="`ingredients[${index}][amount]`"
            :state="validateState('ingredients', '$each', index, 'amount')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Amount is required
          </b-form-invalid-feedback>
        </b-form-group>
      </b-row>
      <b-form-group>
        <button id="b1"
          @click="addIngredient"
          type="button"
          class="btn btn-secondary"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/></svg>
        </button>
        <button id="b2"
          @click="removeIngredient"
          type="button"
          class="btn btn-secondary "
        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/></svg>
        </button>
      </b-form-group>
      <!-- <b-form-group>
        <button @click="addIngredient" type="button" class="btn btn-secondary">
          Add Ingredient
        </button>
          <button @click="removeIngredient" type="button" class="btn btn-secondary">
          Remove Ingredient
        </button>
      </b-form-group> -->
      <!-- add require and validation -->
      <b-form-textarea
        id="preparationInstructions"
        placeholder="Enter preparation insructions"
        rows="4"
        v-model="$v.form.preparationInstructions.$model"
      ></b-form-textarea>
      <div v-if="!flag">
        <b-form-group
          style="margin-top: 2%;"
          id="input-group-customaryPrepare"
          label-cols-sm="3"
          label="customary Prepare:"
          label-for="customaryPrepare"
        >
          <b-form-input
            id="customaryPrepare"
            v-model="$v.form.customaryPrepare.$model"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-owner"
          label-cols-sm="3"
          label="owner :"
          label-for="owner"
        >
          <b-form-input
            id="owner"
            v-model="$v.form.owner.$model"
            type="text"
          ></b-form-input>
        </b-form-group>
      </div>
    </b-form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  image,
  number,
  checked,
  min,
} from "vuelidate/lib/validators";

export default {
  name: "CreateRecipe",
  data() {
    return {
      flag: true,
      form: {
        recipeName: "",
        image: "",
        preparationTime: "",
        customaryPrepare: "",
        owner: "",
        checked: [],
        preparationInstructions: "",
        ingredients: [
          {
            ingredient: "",
            amount: "",
          },
        ],
      },
      errors: [],
      validated: false,
    };
  },

  validations: {
    form: {
      recipeName: {
        required,
      },
      image: {
        required,
      },
      customaryPrepare: {},
      preparationTime: {
        required,
      },
      owner: {},
      numberOfDishes: {
        required,
      },
      preparationInstructions: {
        required,
      },
      ingredients: {
        $each: {
          ingredient: {
            required,
          },
          amount: {
            required,
          },
        },
      },
      clickable: {
        required,
      },
    },
  },

  mounted() {
    console.log("enter");
  },

  methods: {
    addIngredient() {
      console.log(this.form.ingredients);
      this.form.ingredients.push({
        ingredient: "",
        amount: "",
      });
    },
    removeIngredient() {
      console.log(this.form.ingredients);
      this.form.ingredients.pop();
    },
    validateState(...param) {
      const { $dirty, $error } = param.reduce((value, property) => {
        // param[0] === "ingredients" && console.log(value);
        return value[property];
      }, this.$v.form);
      return $dirty ? !$error : null;
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Amaranth&family=Comfortaa:wght@300&family=Lemonada:wght@400;500&family=Mali:wght@200&family=Shadows+Into+Light+Two&family=Syncopate&display=swap');

#b1, #b2{
    box-shadow: 4px 3px 8px 5px rgba(164, 158, 148, 0.868), 1px 2px 10px 10px rgba(243, 243, 243, 0.85);
    border: 2px solid rgba(216, 151, 0, 0.468);
    background-color: rgba(248, 186, 41, 0.968);
}
#b1:hover, #b2:hover{
    box-shadow: 4px 3px 8px 5px rgba(164, 158, 148, 0.868), 1px 2px 10px 10px rgba(243, 243, 243, 0.85);
    border: 2px solid  rgba(254, 194, 52, 0.968);
    background-color: rgba(249, 205, 102, 0.968);
    color: rgb(164, 158, 148);
}
#b2{
  margin-left:3%;
}
.checks{
  margin-left: 1%;;
}
</style>
