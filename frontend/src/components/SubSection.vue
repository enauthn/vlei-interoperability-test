<template>
  <div class="subsection-wrapper">
    <div class="subsection-header">
      <span>{{ parentNumber }} {{ subsection.name }}</span>
      <!-- Display description if provided -->
      <div v-if="subsection.desc" class="subsection-description">
        <span>{{ subsection.desc }}</span>
      </div>
      <button
        v-if="subsection.button && subsection.button.length > 0 && subsection.button[0].text"
        class="submit-button"
        @click="btnSubmit(subsection.button[0].action || '')"
      >
        {{ subsection.button[0].text }}
      </button>
    </div>

    <div class="subsection-content">
      <div
        class="input-row"
        v-for="(subitem, index) in subsection.subitem"
        :key="index"
        :style="subitem.inputValue !== null ? { justifyContent: 'space-between' } : {}"

      >
        <label :for="subitem.item" class="input-label">{{ subitem.item }}</label>

        <!-- Hide the input if inputValue is null -->
        <input
          v-model="subitem.inputValue"
          :placeholder="subitem.item"
          type="text"
          :id="subitem.item"
          :readonly="!subitem.button || !subitem.button[0].text"
          :hidden="subitem.inputValue === null"
          class="input-field"
        />

        <button
          v-if="subitem.button && subitem.button.length > 0 && subitem.button[0].text"
          class="submit-button"
          :disabled="subitem.inputValue === ''"
          @click="btnSubmit(subitem.button[0].action || '')"
        >
          {{ subitem.button[0].text }} <!-- Display the button text -->
        </button>
      </div>
    </div>
  </div>
</template>




<script setup lang="ts">
import { defineProps } from "vue";
import { Subsection } from "../interfaces/Section";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  parentNumber: string;
  subsection: Subsection;
}>();


const btnSubmit = (action : string) =>{
  console.log(action)
}
</script>

<style scoped>
.subsection-wrapper {
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: #fff;
}

.subsection-header {
  font-weight: bold;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Added gap for spacing between description and button */
}

.subsection-description {
  font-size: 0.9rem;
  color: #666;
}

.submit-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  width: auto; /* Ensures the button size is not full width */
  align-self: flex-start; /* Align the button with the input field */
}

.submit-button:hover {
  background-color: #218838;
}

.submit-button:disabled {
  background-color: #ccc;
}

.subsection-content {
  display: flex;
  flex-direction: column;
  margin-top: 20px;

}

.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.input-label {
  margin-right: 1rem;
  font-weight: bold;
  flex-shrink: 0;
}

.input-field {
  width: 70%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 1rem; /* Ensure spacing between input and button */
}

.submit-button {
  width: auto; /* Ensure button is not full width */
  margin: auto 0;
}

</style>
