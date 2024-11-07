<template>
  <div class="progress-box">
    <div class="progress-label">Progress</div>
    <div class="progress-box-container">
      <div
        v-for="(section, index) in sections"
        :key="index"
        :class="[
          'progress-box-item',
          section.completed === 0
            ? 'not-started'
            : section.completed > 0 && section.completed < section.total
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.progress-box {
  width: fit-content;
  border: 2px solid black; /* Black border */
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
  justify-content: space-between; /* Space boxes evenly */
  gap: 10px;
}

.progress-box-item {
  width: 50px; /* Set width and height to form a square */
  height: 50px;
  border-radius: 6px; /* Rounded corners */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  color: black; /* Text color */
  position: relative; /* Position for text shadow */
}

/* Square color states */
.progress-box-item.not-started {
  background-color: grey;
}

.progress-box-item.in-progress {
  background-color: yellow;
}

.progress-box-item.completed {
  background-color: green;
}

/* Text inside the box */
.box-text {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
}
</style>
