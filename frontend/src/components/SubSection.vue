<template>
  <div class="subsection-wrapper">
    <div class="subsection-header">
      <span>{{ parentNumber }} {{ label }}</span>
    </div>
    
    <div class="subsection-content">
      <div class="input-row" v-for="(subitem, index) in subitems" :key="index">
        <label :for="subitem.item" class="input-label">{{ subitem.item }}</label>

        <input
          v-model="subitem.inputValue"
          :placeholder="subitem.item"
          type="text"
          :id="subitem.item"
          class="input-field"
        />
        
        <button v-if="subitem.button === 'true'" class="submit-button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  label: string;
  subitems: { item: string; inputValue: string; button: string }[];
  parentNumber: string; //
}>();
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
}

.subsection-content {
  display: flex;
  flex-direction: column;
}

.input-row {
  display: flex;
  align-items: center; /* Ensures the input and button are aligned vertically */
  margin-bottom: 1rem;
}

.input-label {
  margin-right: 1rem;
  font-weight: bold;
}

.input-field {
  width: 70%; /* Adjusted width for consistent alignment */
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.submit-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  margin-left: 1rem; /* Added margin to separate button from input */
}

.submit-button:hover {
  background-color: #218838;
}
</style>
