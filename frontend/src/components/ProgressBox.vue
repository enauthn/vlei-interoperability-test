<template>
  <div class="progress-box">
    <div class="progress-label">Progress</div>
    <div class="progress-box-container">
      <div
        v-for="(section, index) in sections"
        :key="section.name"
        :class="['progress-box-item', sectionStatusClass(section)]"
      >
        <span class="box-text">{{ index + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Section } from "../interfaces/Section";

// Define props with sections being an array of Section objects
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ sections: Section[] }>();

// Function to determine the status class based on completion of Subitems within Subsections
const sectionStatusClass = (section: Section) => {
  // Flatten all subitems from subsections and filter for valid subitems
  const allSubitems = section.subsections.flatMap(subsection => subsection.subitem || []);

  // Check if all subitems have the 'completed' property and if all or some are completed
  const allCompleted = allSubitems.every(item => item?.completed);
  const anyCompleted = allSubitems.some(item => item?.completed);

  // Determine the class based on the completion state of subitems
  if (allCompleted) {
    return "completed";
  } else if (anyCompleted) {
    return "in-progress";
  } else {
    return "not-started";
  }
};
</script>

<style scoped>
.progress-box {
  width: fit-content;
  border: 2px solid black;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.progress-box .progress-label {
  font-size: 14px;
  margin-bottom: 10px;
}

.progress-box-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.progress-box-item {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  color: black;
}

.progress-box-item.not-started {
  background-color: rgb(185, 180, 180);
}

.progress-box-item.in-progress {
  background-color: yellow;
}

.progress-box-item.completed {
  background-color: rgb(3, 183, 3);
}

.box-text {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
}
</style>
