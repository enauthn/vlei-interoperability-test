<template>
  <div class="progress-box">
    <div class="progress-label">Progress</div>
    <div class="progress-box-container">
      <div
        v-for="(section, index) in sections"
        :key="section.name"
        :class="[
          'progress-box-item',
          section.completed === 0
            ? 'not-started'
            : section.completed < section.subsections.length
            ? 'in-progress'
            : 'completed',
        ]"
      >
        <span class="box-text">{{ index + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, defineProps } from "vue";

const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
});

// Watch the `sections` prop to detect changes in the `completed` values.
watch(
  () => props.sections.map(section => section.completed),
  (newValues, oldValues) => {
    console.log("Progress updated:", newValues); // Debugging line
  },
  { deep: true } // Deep watch to ensure nested properties are observed
);
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
