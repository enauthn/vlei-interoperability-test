<template>
  <div class="accordion-wrapper">
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="accordion-section"
    >
      <div class="accordion-header" @click="toggleSection(index)">
        <!-- Display the section index (number) and section name with completed/total count -->
        <span>
          {{ index + 1 }}. {{ section.name }} ({{ calculateCompleted(section) }}/{{ calculateTotal(section) }})
        </span>
        <span :class="{ 'rotate-180': isActive(index) }">▼</span>
      </div>

      <!-- Transition wrapper for accordion-content -->
      <Transition
        name="accordion"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div v-if="isActive(index)" class="accordion-content">
          <ul class="mini-process-list">
            <li v-for="(subsection, i) in section.subsections" :key="i">
              <!-- Pass the entire subsection object -->
              <SubSection
                :parentNumber="`${index + 1}.${i + 1}`"
                :subsection="subsection"
              />
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import SubSection from "./SubSection.vue";
import { Section } from "../interfaces/Section";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ sections: Section[] }>();

// State for tracking the currently open section index
const activeSection = ref<number | null>(null);

// Check if the section is active
const isActive = (index: number) => activeSection.value === index;

// Toggle the active section
const toggleSection = (index: number) => {
  if (activeSection.value === index) {
    activeSection.value = null; // Close the section if it's already active
  } else {
    activeSection.value = index; // Open the clicked section
  }
};

// Calculate completed subsections in a section
const calculateCompleted = (section: Section) => {
  return section.subsections.filter(subsection =>
    (subsection.subitems && subsection.subitems.every(item => item.completed)) // Safe check for subitem
  ).length;
};

// Calculate total subsections in a section
const calculateTotal = (section: Section) => {
  return section.subsections.length;
};

// Transition Hooks
const beforeEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.maxHeight = "0"; // Start with max-height as 0
  element.style.overflow = "hidden"; // Hide content when collapsed
};

const enter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.transition = "max-height 0.3s ease-out"; // Smooth transition
  element.style.maxHeight = `${element.scrollHeight}px`; // Set max-height to content height
};

const beforeLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.transition = "max-height 0.3s ease-in"; // Smooth collapse
  element.style.maxHeight = `${element.scrollHeight}px`; // Ensure we know the content's height
};

const leave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.maxHeight = "0"; // Collapse to 0 height
};
</script>

<style scoped>
.accordion-wrapper {
  width: 100vw;
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

  max-height: 0; /* Initially collapsed */
  transition: max-height 0.3s ease-in-out; /* Smooth transition */
  overflow: hidden; /* Hide content when collapsed */
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
