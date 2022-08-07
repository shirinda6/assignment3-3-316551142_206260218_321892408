<template>
  <div style="max-width: 1000px; width: 100%;font-family: Comfortaa;">
    <b-form @submit.stop.prevent="handleSubmit">
      
      <b-form-group
        id="input-group-recipeName"
        label-cols-sm="3" class="title"
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
        label-cols-sm="3" class="title"
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
        label-cols-sm="3" class="title"
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

      <b-form-group class="title"
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
          ><label class="title">Select diets:</label>
          <b-form-checkbox style="  margin-left: 12%;" value="c2">Vegetarian</b-form-checkbox>
          <b-form-checkbox value="c3">Vegan</b-form-checkbox>
          <b-form-checkbox value="c4">Gluten</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <label class="title">Add ingredients : </label>
      <label style="margin-left: 7%;">Ingredient </label>
      <label style="margin-left: 19%;">Amount </label>
      <label style="margin-left: 19%;">Type </label>
      <b-form-group>
        <button
          id="b1"
          @click="addIngredient"
          type="button"
          class="btn btn-secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </button>
        <button
          id="b2"
          @click="removeIngredient"
          type="button"
          class="btn btn-secondary "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-dash-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
            />
          </svg>
        </button>
      </b-form-group>
      <div style="margin-top: -7%; margin-bottom: -2%;">
      <b-row style="margin-top: -3.5%;"  v-for="(ingredient, index) in form.ingredients" :key="index">
        <b-form-group
          style="margin-left: 26%;"
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
            :state="validateState('ingredients', '$each', index, 'ingredient')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Ingredient is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-amount" class="ingredient" label-for="amount">
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
          <select class="form-select form-select-lg mb-3 border border-2" style="height: 38px; border-radius: 10%;" aria-label=".form-select-lg example" v-model="$v.form.ingredients.$each[index].type.$model">
            <option selected></option>
            <option value="gr">gr</option>
            <option value="kl">kl</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
            <option value="Curt">Curt</option>
            <option value="teaspoon">teaspoon</option>
            <option value="spoon">spoon</option>
            <option value="cup">cup</option>
          </select>
        </b-form-group>
      </b-row>
      </div>

      <label class="title" style="padding-top: -4%;">Preparation insructions : </label>
      <b-form-group>
        <button
          id="b3"
          @click="addInstruction"
          type="button"
          class="btn btn-secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </button>
        <button
          id="b4"
          @click="removeInstruction"
          type="button"
          class="btn btn-secondary "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-dash-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
            />
          </svg>
        </button>
      </b-form-group>
      <div style="margin-top: -7%;">
      <b-row style="margin-top: -3.5%;"
        v-for="(instruction, index) in form.preparationInstructions"
        :key="index"
      >
      
        <b-form-group 
          style="width: 72%; display: inline-block;"
          id="input-group-instruction"
          label-for="instruction"
        >
        <span style="margin-left: 31%;margin-top: 1%; ">{{index+1}}. </span>
          <b-form-input style="margin-left: 36%; margin-top: -5%;"
            id="ingredient"
            v-model="
              $v.form.preparationInstructions.$each[index].instruction.$model
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
      
      <div style="background-color:lightgrey;">
<b-form-checkbox id="family" @input="flag = !flag" value="family" class="title" style="margin-left: 2%;"
        >family recipe</b-form-checkbox
      >
  </div>
      <div v-if="!flag">
        <b-form-group
          style="margin-top: 2%;" class="title"
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
          label-cols-sm="3" class="title"
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
        // preparationInstructions: "",
        ingredients: [
          {
            ingredient: "",
            amount: "",
            type:"",
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

  mounted() {
    console.log("enter");
  },

  methods: {
    addIngredient() {
      console.log(this.form.ingredients);
      this.form.ingredients.push({
        ingredient: "",
        amount: "",
        type:""
      });
    },
    removeIngredient() {
      console.log(this.form.ingredients);
      this.form.ingredients.pop();
    },
    addInstruction() {
      this.form.preparationInstructions.push({
        instruction: "",
      });
      console.log(this.form.preparationInstructions);
    },
    removeInstruction() {
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

#b1,
#b2,
#b3,
#b4 {
  box-shadow: 4px 3px 8px 5px rgba(164, 158, 148, 0.868),
    1px 2px 10px 10px rgba(243, 243, 243, 0.85);
  border: 2px solid rgba(216, 151, 0, 0.468);
  background-color: rgba(248, 186, 41, 0.968);
}
#b1:hover,
#b2:hover,
#b3:hover,
#b4:hover {
  box-shadow: 4px 3px 8px 5px rgba(164, 158, 148, 0.868),
    1px 2px 10px 10px rgba(243, 243, 243, 0.85);
  border: 2px solid rgba(254, 194, 52, 0.968);
  background-color: rgba(249, 205, 102, 0.968);
  color: rgb(164, 158, 148);
}
#b2,
#b4 {
  margin-left: 3%;
}

.checks {
  margin-left: 1%;
}

.ingredient{
  margin-left: 1%;
}

.title{
 font-weight: bold;
}

</style>
