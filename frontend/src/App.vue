<template>
  <h1>Automated Interoperability Testing Web Application</h1>

  <!-- Wrapper div to align form and progress boxes vertically -->
  <div class="form-progress-wrapper">
    <!-- Passcode and Instance URL Section -->
    <PasscodeInstanceUrlForm />

    <!-- Progress Box Section -->
    <ProgressBox :sections="sections" />
  </div>

  <!-- Main Accordion -->
  <div class="accordion-wrapper">
    <Accordion :sections="sections" />
  </div>  



</template>

<script setup lang="ts">
import PasscodeInstanceUrlForm from './components/PasscodeInstanceUrlForm.vue';
import ProgressBox from './components/ProgressBox.vue';
import Accordion from './components/Accordion.vue';

import { Section } from './types/Section';


const sections: Section[] = [
  {
    name: "Establishment",
    completed: 0,
    subsections: ["GEDA init", "OOBI Resolution", "Challenge", "dsdas"],
    total: 0,
  },
  {
    name: "Issuance",
    completed: 0,
    subsections: ["Sign Document", "Verify Identity"],
    total: 0,
  },
  {
    name: "Rotation",
    completed: 0,
    subsections: ["Update Record", "Confirm Rotation", "Notify Parties"],
    total: 0,
  },
  {
    name: "Revocation",
    completed: 0,
    subsections: ["Revoke Access"],
    total: 0,
  },
];

// Dynamically update the total for each section based on the number of subsections
sections.forEach(section => {
  section.total = section.subsections.length;
});
</script>

<style scoped>
/* Add any necessary styles for the wrapper if needed */
.form-progress-wrapper {
  display: flex;
  flex-direction: row; /* Arrange form and progress boxes in a row */
  gap: 2rem; /* Add space between form and progress box */
  max-width: 1200px;
  margin: 20px auto;
  align-items: flex-start; /* Align items to the start of the container */
}
</style>
