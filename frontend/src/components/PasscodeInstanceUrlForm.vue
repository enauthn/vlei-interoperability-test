<template>
  <div class="form-container">
    <div class="input-container">
      <label for="passcode">Passcode:</label>
      <input
        id="passcode"
        type="text"
        v-model="passcode"
        placeholder="Enter passcode"
      />
    </div>
    <div class="input-container">
      <label for="instanceUrl">Instance URL:</label>
      <input
        id="instanceUrl"
        type="url"
        v-model="instanceUrl"
        placeholder="Enter Instance URL"
      />
    </div>
    <div class="connect-btn-container">
      <button @click="connect" :disabled="instanceUrl.length <=0 || passcode.length <=0">Connect</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const passcode = ref("");
const instanceUrl = ref("");

const connect = () => {
  console.log("Connecting to:", instanceUrl.value);
  console.log("Passcode:", passcode.value);
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  justify-content: flex-end;
  align-items: center; /* Vertically center the content */
  margin-bottom: 1rem;
}

.input-container label {
  width: fit-content; /* Allow label to be fit-content */
  margin-right: 1rem; /* Space between label and input */
  font-weight: bold;
}

.input-container input {
  width: 300px; /* Make input fields the same width */
  padding: 0.5rem;
}

.connect-btn-container {
  display: flex;
  justify-content: flex-end;
}

.connect-btn-container button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.connect-btn-container button:hover {
  background-color: #0056b3;
}
.connect-btn-container button:disabled {
  background-color: #ccc;
}
</style>
