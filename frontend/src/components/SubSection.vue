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
          subsection.button[0].text &&
          subsection.button[0].position === 'top'
        "
        class="submit-button"
        :disabled="subsection.button[0].disabledByDefault || isLoading"
        @click="btnSubSection(subsection)"
      >
        <span v-if="isLoading" class="loading-spinner"></span>
        {{ isLoading ? "Loading..." : subsection.button[0].text }}
      </button>

      <span v-if="errorMsg" class="error-msg">* {{ errorMsg }}</span>
    </div>

    <div class="subsection-content">
      <div
        class="input-row"
        v-for="(subsubsection, index) in subsection.subsubsections"
        :key="index"
      >
        <label :for="subsubsection.name" class="input-label">
          {{ subsubsection.name }}
        </label>

        <input
          v-if="subsubsection.input"
          v-model="subsubsection.input.value"
          :placeholder="subsubsection.name"
          type="text"
          :id="subsubsection.name"
          :disabled="subsubsection.input.disabledByDefault"
          class="input-field"
        />

        <div
          v-if="subsubsection.button && subsubsection.button.length > 0"
          class="button-group"
        >
          <button
            v-for="(btn, index) in subsubsection.button"
            :key="index"
            class="submit-button"
            :disabled="
              (subsubsection.input?.value === '' &&
                !subsubsection.input.disabledByDefault) ||
              btn.disabledByDefault
            "
            @click="btnSubSubSection(subsubsection , btn)"
          >
            {{ btn.text }}
          </button>
        </div>
      </div>
      <div class="input-row">
        <button
          v-if="
            subsection.button &&
            subsection.button.length > 0 &&
            subsection.button[0].text &&
            subsection.button[0].position === 'bottom'
          "
          class="submit-button bottom-left-button"
          :disabled="subsection.button[0].disabledByDefault || isLoading"
          @click="btnSubSection(subsection)"
          :hidden="subsection.button[0].position === 'bottom'"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          {{ isLoading ? "Loading..." : subsection.button[0].text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { defineProps } from "vue";
import { Button, Subsection, SubSubsection } from "../interfaces/Section";

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

  if (!subsection.button || subsection.button.length === 0) {
    console.error("No button action found in subsection.");
    isLoading.value = false;
    return;
  }

  const action = subsection.button[0].action;

  switch (action) {
    case "init-gleif-aids": {
      subsection.button[0].disabledByDefault = true;

      let hasError = false;

      subsection.subsubsections.forEach((subsubsection) => {
        if (subsubsection.input) {
          subsubsection.input.value = "123"; // Update with random string
          subsubsection.completed = true;
        } else {
          hasError = true;
          errorMsg.value = "Please enter input for all required fields.";
          subsection.button![0].disabledByDefault = false;
        }
      });

      if (!hasError) {
        console.log("Updated subsubsection with random strings.");
        errorMsg.value = ""; // Clear error if no issues
      }

      isLoading.value = false;
      break;
    }

    case "resolve-qar-oobis": {
      setTimeout(() => {
        subsection.button![0].disabledByDefault = true;

        let hasError = false;

        subsection.subsubsections.forEach((subsubsection) => {
          if (subsubsection.input && subsubsection.input.value !== "") {
            subsubsection.input.value = "456"; // Update with random string
            subsubsection.completed = true;
          } else {
            hasError = true;
            errorMsg.value = "Please enter input for all required fields.";
            subsection.button![0].disabledByDefault = false;
          }
        });

        if (!hasError) {
          console.log("Updated subsubsection with random strings.");
          errorMsg.value = ""; // Clear error if no issues
        }

        isLoading.value = false;
      }, 1000); // Simulate async action
      break;
    }

    default: {
      console.warn(`Unhandled action: ${action}`);
      isLoading.value = false;
      break;
    }
  }
};

const btnSubSubSection = (subsubsection: SubSubsection , btn : Button) => {
  if (!subsubsection.button) {
    console.error("No button action provided.");
    return;
  }

  // Reset states
  isLoading.value = true;
  errorMsg.value = "";

  const action = btn.action;

  switch (action) {
    case "confirm-3-aids-created": {
      btn.disabledByDefault = true;
      const checkAPI = true;
      if (checkAPI) {
        subsubsection.completed = true;
        console.log(`${subsubsection.name} marked as completed.`);
      } else {
        errorMsg.value = "Input value is required to mark as completed.";
        btn.disabledByDefault = false;
      }

      isLoading.value = false;
      break;
    }

    case "reset-input": {
      btn.disabledByDefault = true;

      if (subsubsection.input) {
        subsubsection.input.value = ""; // Reset input value
        subsubsection.completed = false;
        console.log(`${subsubsection.name} input has been reset.`);
      } else {
        errorMsg.value = "Cannot reset input; no input field found.";
        btn.disabledByDefault = false;
      }

      isLoading.value = false;
      break;
    }

    case "simulate-async-action": {
      btn.disabledByDefault = true;
      console.log(`Simulating async action for ${subsubsection.name}...`);

      setTimeout(() => {
        if (subsubsection.input && subsubsection.input.value) {
          subsubsection.completed = true;
          console.log(`Async action completed for ${subsubsection.name}.`);
        } else {
          errorMsg.value = "Input value is required for this async action.";
          subsubsection.button![0].disabledByDefault = false;
        }

        isLoading.value = false;
      }, 1000); // Simulate 1-second delay
      break;
    }

    default: {
      console.warn(`Unhandled action: ${action}`);
      isLoading.value = false;
      subsubsection.completed = true

      break;
    }
  }
};
</script>

<style scoped>
.subsection-wrapper {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: #fff;
  height: 100%;
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
  white-space: pre-line;
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
  from {
    transform: rotate(0deg);
  }
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
  margin-bottom: 1em;
}

.input-label {
  min-width: 200px;
  margin-right: 1rem;
  font-weight: bold;
  flex-shrink: 0;
}

.input-field {
  width: 50%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 1rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}
.bottom-left-button {
  margin-left: auto;
  margin-right: 32%;
}
</style>
