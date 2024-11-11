<template>
  <h1>Automated Interoperability Testing Web Application</h1>

  <div class="form-progress-wrapper">
    <PasscodeInstanceUrlForm />
    <ProgressBox :sections="currentState" />
  </div>

  <div class="accordion-wrapper">
    <Accordion :sections="currentState" />
  </div>
</template>

<script setup lang="ts">
import PasscodeInstanceUrlForm from './components/PasscodeInstanceUrlForm.vue';
import ProgressBox from './components/ProgressBox.vue';
import Accordion from './components/Accordion.vue';

import { Section } from './interfaces/Section';
import { ref } from 'vue';


const currentState = ref<Section[]>([
  {
    name: "Establishment",
    completed: 0,
    subsections: [
      {
        name: "GEDA init",
        subitem: [
          { item: "Step 1", inputValue: "", button: "false"},
          { item: "Step 2", inputValue: "", button: "true" }
        ]
      },
      {
        name: "GEDA init",
        subitem: [
          { item: "Step 1", inputValue: "", button: "false"},
          { item: "Step 2", inputValue: "", button: "true" }
        ]
      },
      {
        name: "OOBI Resolution",
        subitem: [
          { item: "Step 1", inputValue: "", button: "true" },
          { item: "Step 2", inputValue: "", button: "false"}
        ]
      },
      {
        name: "Challenge",
        subitem: [
          { item: "Step 1", inputValue: "", button: "true" },
          { item: "Step 2", inputValue: "", button: "false"}
        ]
      }
    ]
  },
  {
    name: "Issuance",
    completed: 0,
    subsections: [
      {
        name: "Sign Document",
        subitem: [
          { item: "Step 1", inputValue: "", button: "false"}
        ]
      },
      {
        name: "Verify Identity",
        subitem: [
          { item: "Step 1", inputValue: "", button: "true" }
        ]
      }
    ]
  },
  {
    name: "Rotation",
    completed: 0,
    subsections: [
      {
        name: "Update Record",
        subitem: [
          { item: "Step 1", inputValue: "", button: "true" }
        ]
      },
      {
        name: "Confirm Rotation",
        subitem: [
          { item: "Step 1", inputValue: "", button: "false"}
        ]
      },
      {
        name: "Notify Parties",
        subitem: [
          { item: "Step 1", inputValue: "", button: "true" }
        ]
      }
    ]
  },
  {
    name: "Revocation",
    completed: 0,
    subsections: [
      {
        name: "Revoke Access",
        subitem: [
          { item: "Step 1", inputValue: "", button: "true" }
        ]
      }
    ]
  }
]);
</script>

<style scoped>
.form-progress-wrapper {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  max-width: 1200px;
  margin: 20px auto;
  align-items: flex-start;
}
</style>
