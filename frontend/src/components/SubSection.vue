<template>
  <div class="subsection-wrapper">
    <div class="subsection-header">
      <span>{{ parentNumber }} {{ subsection.name }}</span>
      <div v-if="subsection.desc" class="subsection-description">
        <span>{{ subsection.desc }}</span>
      </div>
      <button
        v-if="
          subsection.button &&
          subsection.button.length > 0 &&
          subsection.button[0].text
        "
        class="submit-button"
        :disabled="subsection.button[0].disabled || isLoading"
        @click="btnSubSection(subsection)"
      >
        <span v-if="isLoading" class="loading-spinner"></span>
        {{ isLoading ? 'Loading...' : subsection.button[0].text }}
      </button>
      <span v-if="errorMsg" class="error-msg">* {{ errorMsg }}</span>
    </div>

    <div class="subsection-content">
      <div
        class="input-row"
        v-for="(subitems, index) in subsection.subitems"
        :key="index"
        :style="subitems.input ? { justifyContent: 'space-between' } : {}"
      >
        <label :for="subitems.item" class="input-label">
          {{ subitems.item }}
        </label>

        <input
          v-if="subitems.input"
          v-model="subitems.input.value"
          :placeholder="subitems.item"
          type="text"
          :id="subitems.item"
          :disabled="subitems.input.disabled"
          class="input-field"
        />

        <button
          v-if="
            subitems.button &&
            subitems.button.length > 0 &&
            subitems.button[0].text
          "
          class="submit-button"
          :disabled="
            subitems.input?.value === '' || subitems.button[0].disabled
          "
          @click="btnsubitems(subitems)"
        >
          {{ subitems.button[0].text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { defineProps } from "vue";
import { Subsection, Subitem } from "../interfaces/Section";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  parentNumber: string;
  subsection: Subsection;
}>();

const isLoading = ref(false);
const errorMsg = ref("");

const btnSubSection = (subsection: Subsection) => {
  isLoading.value = true;
  errorMsg.value = ""; // Reset error message

  // 1.1 Initialize GEDA and GIDA
  if (subsection.button && subsection.button[0].action === "init-gleif-aids") {
      subsection.button[0].disabled = true;

      let hasError = false;

      subsection.subitems.forEach((subitems) => {
        if (subitems.input) {
          subitems.input.value = "123"; // Update with random string
          subitems.completed = true;
        } else {
          hasError = true;
          errorMsg.value = "Please enter input for all required fields.";
          subsection.button[0].disabled = false;
        }
      });

      if (!hasError) {
        console.log("Updated subitems with random strings.");
        errorMsg.value = ""; // Clear error if no issues
      }

      isLoading.value = false;
    }


  // 1.4 Resolve QAR'S OOBIs
  setTimeout(() => {
    if (subsection.button && subsection.button[0].action === "resolve-qar-oobis") {
      subsection.button[0].disabled = true;

      let hasError = false;

      subsection.subitems.forEach((subitems) => {
        if (subitems.input && subitems.input.value !== "") {
          subitems.input.value = "456"; // Update with random string
          subitems.completed = true;
        } else {
          hasError = true;
          errorMsg.value = "Please enter input for all required fields.";
          subsection.button[0].disabled = false;
        }
      });

      if (!hasError) {
        console.log("Updated subitems with random strings.");
        errorMsg.value = ""; // Clear error if no issues
      }

      isLoading.value = false;
    }
  }, 1000); // Simulate async action
};

const btnsubitems = (subitems: Subitem) => {
  if (subitems.button && subitems.button.length > 0) {
    subitems.button[0].disabled = true;
    console.log("Action triggered for subitems: ", subitems.button[0].action);
    subitems.completed = true;
    console.log(`${subitems.item} marked as completed.`);
  } else {
    console.log("No action for subitems");
  }
};
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
  gap: 0.5rem;
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
  align-self: flex-start;
  display: flex;
  align-items: center;
}

.submit-button:hover {
  background-color: #218838;
}

.submit-button:disabled {
  background-color: #ccc;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #fff;
  border-top: 2px solid #ccc;
  border-radius: 50%;
  margin-right: 0.5rem;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-msg {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
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
  margin-right: 1rem;
}
</style>
