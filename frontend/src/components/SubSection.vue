<template>
  <div class="subsection-wrapper">
    <div class="subsection-header">
      <span>{{ parentNumber }} {{ subsection.name }}</span>
      <!-- Display description if provided -->
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
        :disabled="subsection.button[0].disabled"
        @click="btnSubSection(subsection)"
      >
        {{ subsection.button[0].text }}
      </button>
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

        <!-- Hide the input if input is not provided -->
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
import { defineProps } from "vue";
import { Subsection, Subitem } from "../interfaces/Section";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  parentNumber: string;
  subsection: Subsection;
}>();

const btnSubSection = (subsection: Subsection) => {
  if (subsection.button && subsection.button.length > 0) {
    console.log(
      "Action triggered for subsection: ",
      subsection.button[0].action
    );
  } else {
    console.log("No action for subsection");
  }

  if (subsection.button && subsection.button[0].action === "init-gleif-aids") {
    subsection.button[0].disabled = true;
    subsection.subitems.forEach((subitems) => {
      if (subitems.input) {
        subitems.input.value = "123"; // Update with random string
      }
      subitems.completed = true;
    });
    console.log("Updated subitemss with random strings.");
  }

  if (
    subsection.button &&
    subsection.button[0].action === "generate-gleif-oobis"
  ) {
    subsection.button[0].disabled = true;
    subsection.subitems.forEach((subitems) => {
      if (subitems.input) {
        subitems.input.value = "456"; // Update with random string
      }
      subitems.completed = true;
    });
    console.log("Updated subitemss with random strings.");
  }
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
  margin-right: 1rem;
}
</style>
