<template>
  <div id="app">
    <div class="container">
      <div class="calculator">
        <h1>Calculator</h1>
        <div @submit.prevent="onSubmit">
          <input type="text" class="input-field" v-model="number.first" />
          <span class="operator"> + </span>
          <input type="text" class="input-field" v-model="number.second" />
          <div>
            <button @click="onSubmit" type="submit" class="button">=</button>
          </div>
          <div>
            <span class="result"> {{ number.sum }} </span>
          </div>
          <h4 class="error">{{ number.error }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { createNumber } from "./service/iNumbersAPI";

export default defineComponent({
  setup() {
    const number = reactive({
      first: "",
      second: "",
      sum: "",
      error: "",
    });

    const onSubmit = async () => {
      const data = await createNumber(
        parseInt(number.first),
        parseInt(number.second)
      );
      if (typeof data.result === "number") {
        number.sum = data.result.toString();
      } else {
        number.error = data.error.message;
      }
    };
    return { onSubmit, number };
  },
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

h1 {
  font-size: 2.5rem;
  font-weight: 900;
}

.container {
  height: 44rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calculator {
  width: 33rem;
  height: 19.6rem;
  border-radius: 1.5rem;
  background-color: #4caf50;
  padding: 0.6rem;
  opacity: 0.7;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.input-field {
  width: 7rem;
  height: 3rem;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  border-radius: 0.5rem;
  border: none;
  color: #888;
}

*:focus {
  outline: none;
}

.operator {
  font-size: 2rem;
  font-weight: 500;
}

.button {
  background-color: #424b43;
  border: none;
  color: white;
  padding: 0.62rem 3.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 800;
  margin: 1.2rem -0.75rem;
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: white;
  color: #888;
  border-radius: 4rem;
}

.button:hover {
  background-color: #424b43;
  color: white;
}

.result {
  font-size: 3rem;
  font-weight: 800;
  width: 4rem;
}

.error {
  color: #e60000;
  font-weight: 800;
  font-size: 1.7rem;
}
</style>
