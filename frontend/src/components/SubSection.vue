<template>
  <div class="subsection-wrapper">
    <PopupMsg
      :popupData="popUpMsg"
      :visible="popupVisible"
      @close="popupVisible = false"
    />
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
        :disabled="
          props.disabled || subsection.button[0].disabledByDefault || isLoading
        "
        @click="btnSubSection(subsection)"
      >
        <span v-if="isLoading" class="loading-spinner"></span>
        {{ isLoading ? "Loading..." : subsection.button[0].text }}
      </button>
    </div>

    <div class="subsection-content">
      <div
        class="input-row"
        v-for="(subsubsection, index) in subsection.subsubsections"
        :key="index"
      >
        <!-- Start Buttons -->
        <div class="button-group button-start">
          <button
            v-for="(btn, btnIndex) in getStartButtons[index]"
            :key="btnIndex"
            class="submit-button"
            :disabled="
              disabled ||
              btn.disabledByDefault ||
              subsubsection.input?.value === '' ||
              (subsubsection.input?.value === '' &&
                subsubsection.input?.disabledByDefault)
            "
            @click="btnSubSubSection(subsubsection, btn)"
          >
            {{ btn.text }}
          </button>
        </div>

        <!-- Label -->
        <label
          v-if="subsubsection.name !== ''"
          :for="subsubsection.name"
          class="input-label"
        >
          {{ subsubsection.name }}
        </label>

        <!-- Input Field -->
        <input
          v-if="subsubsection.input"
          v-model="subsubsection.input.value"
          :placeholder="subsubsection.name"
          type="text"
          :id="subsubsection.name"
          :disabled="disabled || subsubsection.input.disabledByDefault"
          class="input-field"
        />

        <!-- End Buttons -->
        <div class="button-group">
          <div
            class="sub-button-group"
            v-for="(btn, btnIndex) in getEndButtons[index]"
            :key="'subsubsection-' + btnIndex"
          >
            <button
              :key="btnIndex"
              class="submit-button submit-button-check"
              :disabled="
                disabled ||
                btn.disabledByDefault ||
                subsubsection.input?.value === '' ||
                (subsubsection.input?.value === '' &&
                  subsubsection.input?.disabledByDefault)
              "
              @click="btnSubSubSection(subsubsection, btn)"
            >
              {{ btn.text }}
            </button>
            <font-awesome-icon
              v-if="
                (btn.text === 'Check' || btn.text === 'Approve') &&
                subsubsection.completed
              "
              :key="btnIndex"
              class="popup-icon"
              icon="fa-solid fa-circle-check"
            />
          </div>
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
          :disabled="
            props.disabled ||
            subsection.button[0].disabledByDefault ||
            isLoading
          "
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
import { ref, watch } from "vue";
import { defineProps } from "vue";
import { Button, Subsection, SubSubsection } from "../interfaces/Section";
import { computed } from "vue";
import PopupMsg from "./PopupMsg.vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  parentNumber: string;
  subsection: Subsection;
  disabled: boolean;
}>();

// Define computed properties for filtered buttons
const getStartButtons = computed(() =>
  props.subsection.subsubsections.map((subsubsection) =>
    subsubsection.button!.filter((btn) => btn.position === "start")
  )
);

const getEndButtons = computed(() =>
  props.subsection.subsubsections.map((subsubsection) =>
    subsubsection.button!.filter(
      (btn) => btn.position === "end" || btn.position === "top"
    )
  )
);

const emit = defineEmits<{
  (e: "complete"): void;
}>();

const isLoading = ref(false);

const popUpMsg = ref<{
  type: "success" | "error" | "info" | "warning";
  header: string;
  desc: string;
}>({
  type: "success", // Default type
  header: "",
  desc: "",
});

const popupVisible = ref(false);

watch(
  () =>
    props.subsection.subsubsections.every(
      (subsub) => subsub.completed === true || subsub.completed === null
    ), // Check if all completed values are true
  (isCompleted) => {
    if (isCompleted) {
      emit("complete"); // Emit only when all completed values are true
    }
  }
);

const btnSubSection = (subsection: Subsection) => {
  isLoading.value = true;

  if (!subsection.button || subsection.button.length === 0) {
    console.error("No button action found in subsection.");
    isLoading.value = false;
    return;
  }

  const action = subsection.button[0].action;

  switch (action) {
    case "init-gleif-aids": {
      subsection.button[0].disabledByDefault = true;

      subsection.subsubsections.forEach((subsubsection) => {
        if (subsubsection.input) {
          subsubsection.input.value = "123"; // Update with random string
          subsubsection.completed = true;
        } else {
          popUpMsg.value = {
            type: "error",
            header: "Error",
            desc: "Please enter input for all required fields.",
          };
          popupVisible.value = true;
          subsection.button![0].disabledByDefault = false;
        }
      });

      isLoading.value = false;
      break;
    }

    case "resolve-qar-oobis": {
      setTimeout(() => {
        subsection.button![0].disabledByDefault = true;

        subsection.subsubsections.forEach((subsubsection) => {
          if (subsubsection.input && subsubsection.input.value !== "") {
            subsubsection.input.value = "456"; // Update with random string
            subsubsection.completed = true;
          } else {
            popUpMsg.value = {
              type: "error",
              header: "Error",
              desc: "Please enter input for all required fields.",
            };
            popupVisible.value = true;
            subsection.button![0].disabledByDefault = false;
          }
        });

        isLoading.value = false;
      }, 1000); // Simulate async action
      break;
    }

    default: {
      console.warn(`Unhandled action: ${action}`);
      isLoading.value = false;
      subsection.subsubsections.forEach((subsubsection) => {
        if (subsubsection.input) {
          subsubsection.input.value = "123"; // Update with random string
          subsubsection.completed = true;
        } else {
          subsection.button![0].disabledByDefault = false;
        }
      });

      break;
    }
  }
};

const btnSubSubSection = (subsubsection: SubSubsection, btn: Button) => {
  if (!subsubsection.button) {
    console.error("No button action provided.");
    return;
  }

  // Reset states
  isLoading.value = true;

  const action = btn.action;

  // Find current button index and next button
  const currentButtonIndex = subsubsection.button.indexOf(btn);
  const nextButton = subsubsection.button[currentButtonIndex + 1];

  // Find current subsubsection index
  const currentSubsectionIndex =
    props.subsection.subsubsections.indexOf(subsubsection);

  // Helper function to skip invalid subsubsections and find the next valid one
  const getNextValidSubsubsection = (index: number) => {
    let nextSubsection = props.subsection.subsubsections[index + 1];

    // Skip invalid or empty subsubsections (completed === null or no buttons)
    while (
      nextSubsection &&
      (nextSubsection.completed === null || !nextSubsection.button?.length)
    ) {
      nextSubsection = props.subsection.subsubsections[++index + 1]; // Move to the next subsubsection
    }

    return nextSubsection;
  };

  // Get the next valid subsubsection
  const nextSubsection = getNextValidSubsubsection(currentSubsectionIndex);

  switch (action) {
    case "confirm-3-aids-created": {
      btn.disabledByDefault = true; // Disable the current button
      const checkAPI = true;

      if (checkAPI) {
        subsubsection.completed = true;
        console.log(`${subsubsection.name} marked as completed.`);

        if (nextButton) {
          // Enable the next button in the same subsubsection
          nextButton.disabledByDefault = false;
        } else if (nextSubsection && nextSubsection.button!.length > 0) {
          // Move to the next subsubsection and enable its first button
          nextSubsection.button![0].disabledByDefault = false;
        }
      } else {
        btn.disabledByDefault = false; // Re-enable the current button on failure
      }

      isLoading.value = false;
      break;
    }

    case "reset-input": {
      btn.disabledByDefault = true; // Disable the current button

      if (subsubsection.input) {
        subsubsection.input.value = ""; // Reset input value
        subsubsection.completed = false;
        console.log(`${subsubsection.name} input has been reset.`);

        if (nextButton) {
          // Enable the next button in the same subsubsection
          nextButton.disabledByDefault = false;
        } else if (nextSubsection && nextSubsection.button!.length > 0) {
          // Move to the next subsubsection and enable its first button
          nextSubsection.button![0].disabledByDefault = false;
        }
      } else {
        btn.disabledByDefault = false; // Re-enable the current button on failure
      }

      isLoading.value = false;
      break;
    }

    case "simulate-async-action": {
      btn.disabledByDefault = true; // Disable the current button
      console.log(`Simulating async action for ${subsubsection.name}...`);

      setTimeout(() => {
        if (subsubsection.input && subsubsection.input.value) {
          subsubsection.completed = true;
          console.log(`Async action completed for ${subsubsection.name}.`);

          if (nextButton) {
            // Enable the next button in the same subsubsection
            nextButton.disabledByDefault = false;
          } else if (nextSubsection && nextSubsection.button!.length > 0) {
            // Move to the next subsubsection and enable its first button
            nextSubsection.button![0].disabledByDefault = false;
          }
        } else {
          btn.disabledByDefault = false; // Re-enable the current button on failure
        }

        isLoading.value = false;
      }, 1000); // Simulate 1-second delay
      break;
    }

    default: {
      console.warn(`Unhandled action: ${action}`);
      isLoading.value = false;
      btn.disabledByDefault = true; // Disable the current button
      if (btn.text !== "Generate") {
        subsubsection.completed = true;
      }

      if (nextButton) {
        // Enable the next button in the same subsubsection
        nextButton.disabledByDefault = false;
      } else if (nextSubsection && nextSubsection.button!.length > 0) {
        // Move to the next subsubsection and enable its first button
        nextSubsection.button![0].disabledByDefault = false;
      }

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
  font-size: 1rem;
  white-space: pre-line;
  font-weight: 400;
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

.submit-button-check {
  margin: auto;
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
  min-width: 220px;
  max-width: fit-content;
  margin-right: 1rem;
  font-size: 1rem;
  font-weight: 400;
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
.sub-button-group {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.bottom-left-button {
  margin-left: auto;
  margin-right: 30.25%;
}

.button-start {
  .submit-button {
    margin-right: 20px;
  }
}

.popup-icon {
  margin: auto;
  font-size: 2.3rem;
  color: rgb(15, 235, 15);
}
</style>
