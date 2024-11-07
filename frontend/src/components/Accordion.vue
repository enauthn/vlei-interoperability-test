<template>
    <div class="accordion-wrapper">
      <div v-for="(section, index) in sections" :key="index" class="accordion-section">
        <div 
          class="accordion-header" 
          @click="toggleSection(index)"
        >
          <!-- Display the section name with completed/total count -->
          <span>{{ section.name }} ({{ section.completed }}/{{ section.total }})</span>
          <span :class="{ 'rotate-180': isActive(index) }">▼</span>
        </div>
        
        <!-- Mini-subsections list -->
        <div v-if="isActive(index)" class="accordion-content">
          <ul class="mini-process-list">
            <li v-for="(process, i) in section.subsections" :key="i">{{ i + 1 }}. {{ process }}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

// Define the interface for a section
interface Section {
  name: string;
  completed: number;
  total: number;
  subsections: string[];
}

// Define the props with type checking
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ sections: Section[] }>();

// State for tracking which sections are open
const activeSections = ref<Set<number>>(new Set());

// Check if the section is active
const isActive = (index: number) => activeSections.value.has(index);

// Toggle the active section
const toggleSection = (index: number) => {
  if (activeSections.value.has(index)) {
    activeSections.value.delete(index);
  } else {
    activeSections.value.add(index);
  }
};
</script>

<style scoped>
.accordion-wrapper {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.accordion-section {
  border-bottom: 1px solid #ccc;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  font-weight: bold;
}

.accordion-content {
  padding: 1rem;
  background-color: #f9f9f9;
}

.mini-process-list {
  list-style: none;
  padding-left: 1rem;
}

.mini-process-list li {
  margin-bottom: 0.5rem;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
