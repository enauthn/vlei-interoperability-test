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
  <div class="AccDiv">
    <Accordion :sections="sections" />
  </div>
</template>

<script setup lang="ts">
import PasscodeInstanceUrlForm from './components/PasscodeInstanceUrlForm.vue';
import ProgressBox from './components/ProgressBox.vue';
import Accordion from './components/Accordion.vue';

const sections = [
  {
    name: "Establishment",
    completed: 0,
    total: 3,
    subsections: ["GEDA init", "OOBI Resolution", "Challenge", "dsdas"],
  },
  {
    name: "Issuance",
    completed: 0,
    total: 2,
    subsections: ["Sign Document", "Verify Identity"],
  },
  {
    name: "Rotation",
    completed: 0,
    total: 3,
    subsections: ["Update Record", "Confirm Rotation", "Notify Parties"],
  },
  {
    name: "Revocation",
    completed: 0,
    total: 1,
    subsections: ["Revoke Access"],
  },
];
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
