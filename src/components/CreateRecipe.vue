<template>
  <div style="max-width: 1000px; width: 100%;font-family: Comfortaa;">
    <b-form @submit.stop.prevent="handleSubmit">

<!-- Add title -->
      <b-form-group
        id="input-group-recipeName"
        label-cols-sm="3"
        class="title"
        label="recipe name:"
        label-for="recipeName"
        style="margin-top: -1.5%"
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

<!-- Add image -->
        <b-form-group
          id="input-group-image"
          label-cols-sm="3"
          class="title"
          label="Image: (url)"
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

<!-- preparation Time + number Of Dishes -->
      <div>
        <div>
          <b-form-group
            id="input-group-preparationTime"
            label-cols-sm="3"
            class="title"
            label="Preparation Time :"
            label-for="preparationTime"
          >
            <b-form-input
              id="preparationTime"
              v-model="$v.form.preparationTime.$model"
              type="text"
              style="width: 30%;"
              :state="validateState('preparationTime')"
            ></b-form-input>
            <b-form-invalid-feedback>
              Preparation time is required
            </b-form-invalid-feedback>
          </b-form-group>
        </div>
        <div style="float: left;" >
          <b-form-group
            class="title"
            id="input-group-numberOfDishes"
            label-cols-sm="6"
            label="number Of Dishes:"
            label-for="numberOfDishes"

          
          >
            <b-form-input
              id="numberOfDishes"
              v-model="$v.form.numberOfDishes.$model"
              type="number"
              min="1"
              style="width:167.84px;margin-left:15px"
              :state="validateState('numberOfDishes')"
            ></b-form-input>
            <b-form-invalid-feedback>
              Number Of Dishes is required
            </b-form-invalid-feedback>
          </b-form-group>
        </div>
      </div>
    
<!--  checkbox:Vegetarian/ Vegan/ Gluten-->
      <b-form-group id="input-group-4" style="margin-top: -6%;float: right;" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
          ><label class="title" >Select diets:</label>
          <div style="margin-top: 5.5%;">
            <b-form-checkbox style=" " value="c2" >Vegetarian</b-form-checkbox>
            <b-form-checkbox value="c3">Vegan</b-form-checkbox>
            <b-form-checkbox value="c4">FreeGluten</b-form-checkbox>
          </div>
        </b-form-checkbox-group>
      </b-form-group>

<!-- Add Ingredients -->
      <div style="margin-top: 10%;"> 
        <label class="title" >Add ingredients : </label>
        <label style="margin-left: 8%;">Ingredient </label>
        <label style="margin-left: 21%;">Amount </label>
        <label style="margin-left: 15%;">Type </label>

       <div class="btn-group bt"  role="group" style="height: 50%;margin-left: 2%;" aria-label="Basic example">
          <button
            id="b1"
            @click="addIngredient"
            type="button"
            class="btn btn-light"
            ><b-icon  style="width: 100%;" icon="plus" aria-hidden="true"></b-icon>
          </button>
          <button
              id="b2"
              @click="removeIngredient"
              type="button"
              class="btn btn-light "
            ><b-icon  style="width: 100%;" icon="dash" aria-hidden="true"></b-icon>
          </button>
       </div>
        <div style="margin-top: -5%; margin-bottom: -2%;">
          <b-row
            style="margin-top: -3.5%;"
            v-for="(ingredient, index) in form.ingredients"
            :key="index"
          >
            <b-form-group
              style="margin-left: 27%; width:30%"
              class="ingredient"
              id="input-group-ingredient"
              label-for="ingredient" 
            >
              <b-form-input
                id="ingredient"
                v-model="$v.form.ingredients.$each[index].ingredient.$model"
                type="text"
                class="form-control"
                :name="`ingredients[${index}][ingredient]`"
                :state="
                  validateState('ingredients', '$each', index, 'ingredient')
                "
              ></b-form-input>
              <b-form-invalid-feedback>
                Ingredient is required
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              id="input-group-amount"
              class="ingredient"
              label-for="amount" style="width: 20%;"
            >
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
            <b-form-group class="ingredient">
              <select
                class="form-select form-select-lg mb-3 border border-2"
                style="height: 38px; border-radius: 10%;"
                aria-label=".form-select-lg example"
                v-model="$v.form.ingredients.$each[index].type.$model"
              >
                <option selected></option>
                <option value="gr">gram</option>
                <option value="kl">kilogram</option>
                <option value="ml">milliliter</option>
                <option value="l">liter</option>
                <option value="Curt">Curt</option>
                <option value="tsp">teaspoon</option>
                <option value="spoon">spoon</option>
                <option value="cup">cup</option>
              </select>
            </b-form-group>
          </b-row>
        </div>
      </div>
   
<!-- Add Instruction -->
     <div style="margin-top: -8%;">
        <label class="title" >Add instruction : </label>
        <div class="btn-group bt" role="group" style="margin-left:-16%;margin-top: 9%;" aria-label="Basic example">
          <button
            id="b3"
            @click="addInstruction"
            type="button"
            class="btn btn-light"
            ><b-icon  style="width: 100%;" icon="plus" aria-hidden="true"></b-icon>
          </button>
          <button
              id="b4"
              @click="removeInstruction"
              type="button"
              class="btn btn-light "
            ><b-icon  style="width: 100%;" icon="dash" aria-hidden="true"></b-icon>
          </button>
        </div>
        <div style="margin-top: -5%;">
          <b-row
              v-for="(instruction, index) in form.preparationInstructions"
              :key="index"
            >
              <b-form-group
                style="width: 70%;margin-left:24%; display: inline-block;"
                id="input-group-instruction"
                label-for="instruction"
              >
                <span style="margin-top: 1%; "
                  >{{ index + 1 }}.
                </span>
                <b-form-input
                  style="margin-left: 5%; margin-top: -5%;"
                  id="ingredient"
                  v-model="
                    $v.form.preparationInstructions.$each[index].instruction
                      .$model
                  "
                  type="text"
                  class="form-control "
                  :name="`preparationInstructions[${index}][instruction]`"
                  :state="
                    validateState(
                      'preparationInstructions',
                      '$each',
                      index,
                      'instruction'
                    )
                  "
                ></b-form-input>
                <b-form-invalid-feedback>
                  Instruction is required
                </b-form-invalid-feedback>
              </b-form-group>
          </b-row>
        </div>
      </div>

<!-- checkbox for family-recipe -->
      <div style="background-color:rgba(177, 188, 184, 0.75);">
        <b-form-checkbox
          id="family"
          @input="flag = !flag"
          value="family"
          class="title"
          style="margin-left: 2%;margin-bottom: -2%;"
          >family recipe</b-form-checkbox
        >
      </div>
      <div v-if="!flag">
       <!-- customary Prepare -->
        <b-form-group
          style="margin-top: 3%;"
          class="title"
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
       <!-- owner  -->
        <b-form-group
          id="input-group-owner"
          label-cols-sm="3"
          class="title"
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
        preparationInstructions: [
          {
            instruction: "",
          },
        ],
        ingredients: [
          {
            ingredient: "",
            amount: "",
            type: "",
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
        $each: {
          instruction: {
            required,
          },
        },
      },
      ingredients: {
        $each: {
          ingredient: {
            required,
          },
          amount: {
            required,
          },
          type: {
            required,
          },
        },
      },
    },
  },

 

  methods: {
    addIngredient() {
      console.log(this.form.ingredients);
      this.form.ingredients.push({
        ingredient: "",
        amount: "",
        type: "",
      });
    },
    removeIngredient() {
      if(this.form.ingredients.length>1)
        this.form.ingredients.pop();
    },
    addInstruction() {
      this.form.preparationInstructions.push({
        instruction: "",
      });
    },
    removeInstruction() {
      if(this.form.preparationInstructions.length>1)
        this.form.preparationInstructions.pop();
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
@import url("https://fonts.googleapis.com/css2?family=Amaranth&family=Comfortaa:wght@300&family=Lemonada:wght@400;500&family=Mali:wght@200&family=Shadows+Into+Light+Two&family=Syncopate&display=swap");


#b1,#b2,#b3,#b4{
  color:white; background-color: rgba(149, 179, 169, 0.75);
 }
#b1:hover,
#b2:hover,
#b3:hover,
#b4:hover {
  color:white; background-color:rgba(177, 188, 184, 0.75);
}

.checks {
  margin-left: 1%;
}

.ingredient {
  margin-left: 1%;
}

.title {
  font-weight: bold;
}
</style>
