<template>
  <div>
    <b-form @submit.stop.prevent="handleSubmit">
        <b-form-checkbox id="family" @input="flag = !flag" value="family" >family recipe</b-form-checkbox>
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
        >
          <b-form-checkbox value="c1">Clickable</b-form-checkbox>
          <b-form-checkbox value="c2">Vegetarian</b-form-checkbox>
          <b-form-checkbox value="c3">Vegan</b-form-checkbox>
          <b-form-checkbox value="c4">Gluten</b-form-checkbox>

        </b-form-checkbox-group>
        </b-form-group>
        
        <b-row v-for="(ingredient, index) in form.ingredients" :key="index">
            <b-form-group
            id="input-group-ingredient"
            label-cols-sm="3"
            label="ingredient:"
            label-for="ingredient"
        >
        <b-form-input
            id="ingredient"
            v-model="$v.form.ingredients.ingredient.$model"
            type="text"
            class="form-control"
            :name="`ingredients[${index}][ingredient]`"
            :state="validateState('ingredients')"
            ></b-form-input>
            <b-form-invalid-feedback>
            Ingredient is required
            </b-form-invalid-feedback>
            </b-form-group>
        <b-form-group
            id="input-group-amount"
            label-cols-sm="3"
            label="amount:"
            label-for="amount"
        >
        <b-form-input
            id="amount"
            v-model="$v.form.ingredients.amount.$model"
            type="number"
            min="1"
            class="form-control"
            :name="`ingredients[${index}][amount]`"
            :state="validateState('ingredients')"
            ></b-form-input>
            <b-form-invalid-feedback>
            Amount is required
            </b-form-invalid-feedback>
            </b-form-group>
        </b-row>  

        <b-form-group>
            <button @click="addIngredient" type="button" class="btn btn-secondary">Add Ingredient</button>
        </b-form-group>        
        <!-- add require and validation -->
       <b-form-textarea
        id="preparationInstructions"
        placeholder="Enter preparation insructions"
        rows="4"
        v-model="$v.form.preparationInstructions.$model"
       ></b-form-textarea>

        
        <b-form-group
        id="input-group-customaryPrepare"
        label-cols-sm="3"
        label="customary Prepare:"
        label-for="customaryPrepare"
      >
      <b-form-input
          id="customaryPrepare"
          v-model="$v.form.customaryPrepare.$model"
          type="text"
          :disabled="flag"
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
          :disabled="flag"

        ></b-form-input>
        </b-form-group>
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
  min
} from "vuelidate/lib/validators";

export default {
    name:"CreateRecipe",
    data() {
    return {
      flag : true,  
      form: {
        recipeName: "",
        image: "",
        preparationTime: "",
        customaryPrepare: "",
        owner: "",
        checked: [],
        preparationInstructions:"",
        ingredients:[
        {
        ingredient: "",
        amount: ""
        },
    ],
      },
      errors: [],
      validated: false
    };
    },

    validations: {
        form: {
        recipeName:{
            required
        },
        image:{
            required
        },
        customaryPrepare:{
            
        },
        preparationTime: {
            required
        },
        owner: {
            
        },
        numberOfDishes: {
            required,
        },
        preparationInstructions:{
            required,
        },
        ingredients: {
            ingredient: {
            required
        },
            amount: {
            required
        },
        },
        clickable: {
            required
        },
        }
    },

    mounted(){
        console.log("enter");
    },

    methods:{
    addIngredient () {
        console.log(this.form.ingredients)
        this.form.ingredients.push({
        ingredient: "",
        amount: ""
      })
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    }
    }
}
</script>

