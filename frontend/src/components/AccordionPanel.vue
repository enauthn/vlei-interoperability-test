<template>
  <div class="accordion-wrapper">
    <div
      v-for="(section, sectionIndex) in sections"
      :key="sectionIndex"
      class="accordion-section"
    >
      <div class="accordion-header" @click="toggleSection(sectionIndex)">
        <span>
          {{ sectionIndex + 1 }}. {{ section.name }} ({{
            calculateCompleted(section)
          }}/{{ calculateTotal(section) }})
        </span>
        <span :class="{ 'rotate-180': isActive(sectionIndex) }">▼</span>
      </div>

      <Transition
        name="accordion"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div v-if="isActive(sectionIndex)" class="accordion-content">
          <ul class="mini-process-list">
            <li
              v-for="(subsection, subsectionIndex) in section.subsections"
              :key="subsectionIndex"
            >
              <SubSection
                :parentNumber="`${sectionIndex + 1}.${subsectionIndex + 1}`"
                :subsection="subsection"
                :disabled="
                  currentStepIndex !== `${sectionIndex}.${subsectionIndex}`
                "
                @complete="advanceStep(sectionIndex, subsectionIndex)"
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

const props = defineProps<{ sections: Section[] }>();

// State for tracking the currently open section index
const activeSection = ref<number | null>(null);

// Current step in the format 'sectionIndex.subsectionIndex' (e.g., "0.0")
const currentStepIndex = ref<string>("0.0");

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

// Advance the step when the current subsection is marked as completed
const advanceStep = (sectionIndex: number, subsectionIndex: number) => {
  const nextSubsectionIndex = subsectionIndex + 1;
  const nextSectionIndex = sectionIndex + 1;

  // Check if there's another subsection in the current section
  if (props.sections[sectionIndex]?.subsections[nextSubsectionIndex]) {
    currentStepIndex.value = `${sectionIndex}.${nextSubsectionIndex}`;
  }
  // Otherwise, move to the first subsection of the next section
  else if (props.sections[nextSectionIndex]?.subsections[0]) {
    currentStepIndex.value = `${nextSectionIndex}.0`;
  }
};

// Calculate completed subsections in a section
const calculateCompleted = (section: Section) => {
  return section.subsections.filter((subsection) =>
    subsection.subsubsections.every((item) => item.completed === true || item.completed === null)
  ).length;
};

// Calculate total subsections in a section
const calculateTotal = (section: Section) => section.subsections.length;

// Transition Hooks for accordion
const beforeEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.maxHeight = "0";
  element.style.overflow = "hidden";
};

const enter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.transition = "max-height 0.3s ease-out";
  element.style.maxHeight = `${element.scrollHeight}px`;
};

const beforeLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.transition = "max-height 0.3s ease-in";
  element.style.maxHeight = `${element.scrollHeight}px`;
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
