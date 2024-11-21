<template>
  <div class="header-wrapper">
    <h1>vLEI Interoperability Testing Application</h1>
    <span>
      This is a web application created for testing interoperability of
      verifiable Legal Entity Identifier (vLEI) implementations for Qualified
      vLEI Issuers (QVIs).<br />
      Candidate QVIs may complete this test before taking dry runs for the QVI
      qualification with Global Legal Entity Identifier Foundation (GLEIF).
      <br /><br />
      The test loosely follows the QVI qualification dry run, and it should be
      followed step-by-step without any skip.
    </span>
  </div>

  <div class="form-progress-wrapper">
    <PasscodeInstanceUrlForm />
    <ProgressBox :sections="currentState" />
  </div>

  <div class="accordion-wrapper">
    <Accordion :sections="currentState" />
  </div>
</template>

<script setup lang="ts">
import PasscodeInstanceUrlForm from "./components/PasscodeInstanceUrlForm.vue";
import ProgressBox from "./components/ProgressBox.vue";
import Accordion from "./components/AccordionPanel.vue";

import { Section } from "./interfaces/Section";
import langData from "./assets/lang/en.json";

import { onMounted, ref } from "vue";

const currentState = ref<Section[]>([]);

onMounted(() => {
  currentState.value = Object.keys(langData).map((sectionKey) => {
    const section = langData[sectionKey as keyof typeof langData];
    return {
      name: section.name,
      subsections: section.subsections.map((subsection) => ({
        name: subsection.name,
        desc: subsection.desc,
        button:
          subsection.button?.map((btn) => ({
            text: btn.text,
            action: btn.action,
            disabled: btn.disabled,
            position: btn.position || 'top'
          })) || [],
        subitems: subsection.subitems.map((subitem) => ({
          item: subitem.item,
          completed: subitem.completed,
          input: subitem.input || null,
          button:
            subitem.button?.map((btn) => ({
              text: btn.text,
              action: btn.action,
              disabled: btn.disabled,
              position: btn.position || 'top'

            })) || [],
        })),
      })),
    };
  });
});
</script>

<style scoped>
.form-progress-wrapper {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  max-width: 1200px;
  margin: 100px auto;
  align-items: flex-start;
}

.header-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 1200px;

  h1 {
    text-align: center;
    font: bold;
  }

  span {
    margin-top: 10px;
    text-align: start;
    font-size: 18px;
  }
}
</style>
