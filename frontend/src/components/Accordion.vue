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
            <li v-for="(process, i) in section.subsections" :key="i">{{ i + 1 }}. {{ process }}</li>
          </ul>
        </div>
      </Transition>
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

// Transition Hooks
const beforeEnter = (el: Element) => {
  const element = el as HTMLElement; // Cast to HTMLElement
  element.style.height = '0';
  element.style.overflow = 'hidden';
};

const enter = (el: Element) => {
  const element = el as HTMLElement; // Cast to HTMLElement
  element.style.transition = 'height 0.3s ease-out';
  element.style.height = `${element.scrollHeight}px`;
};

const beforeLeave = (el: Element) => {
  const element = el as HTMLElement; // Cast to HTMLElement
  element.style.transition = 'height 0.3s ease-in';
  element.style.height = `${element.scrollHeight}px`; // Start from the current height
};

const leave = (el: Element) => {
  const element = el as HTMLElement; // Cast to HTMLElement
  element.style.height = '0';
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
  overflow: hidden;
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

.accordion {
  max-width: 400px;
  font-family: Lato;
  margin-bottom: 20px;
  background-color: #ec5366;
  border-radius: 6px;
}

.accordion .header {
  height: 40px;
  line-height: 40px;
  padding: 0 40px 0 8px;
  position: relative;
  color: #fff;
  cursor: pointer;
}

.accordion .header-icon {
  position: absolute;
  top: 5px;
  right: 8px;
  transform: rotate(0deg);
  transition-duration: 0.3s;
}

.accordion .body {
  overflow: hidden;
  background-color: #fff;
  border: 10px solid #ec5366;
  border-top: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  transition: 150ms ease-out;
}

.accordion .body-inner {
  padding: 8px;
  overflow-wrap: break-word;
}

.accordion .header-icon.rotate {
  transform: rotate(180deg);
  transition-duration: 0.3s;
}

.accordion.purple {
  background-color: #8c618d;
}

.accordion.purple .body {
  border-color: #8c618d;
}

.accordion .accordion-fade-enter-active,
.accordion .accordion-fade-leave-active {
  transition: height 0.3s ease-in-out;
}

.accordion .accordion-fade-enter, .accordion .accordion-fade-leave-to {
  height: 0;
  opacity: 0;
}
</style>
