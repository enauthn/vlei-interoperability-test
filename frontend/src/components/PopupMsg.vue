<template>
  <div class="popup-overlay" v-if="visible">
    <div class="popup-container" :class="popupTypeClass">
      <div class="popup-header">
        <span class="popup-title">{{ popupData.header }}</span>
      </div>
      <div class="popup-body">
        <p>{{ popupData.desc }}</p>

        <font-awesome-icon
          v-if="popupData.type == 'error'"
          class="popup-icon"
          icon="fa-solid fa-circle-xmark"
        />

        <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="popup-footer">
        <button @click="closePopup" class="popup-close-btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps<{
  popupData: {
    type: "success" | "error" | "info" | "warning"; // Type of the popup
    header: string; // Header text
    desc: string; // Description message
  };
  visible: boolean; // Controls visibility
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const closePopup = () => {
  emit("close");
};

const popupTypeClass = computed(() => {
  switch (props.popupData.type) {
    case "success":
      return "popup-success";
    case "error":
      return "popup-error";
    case "info":
      return "popup-info";
    case "warning":
      return "popup-warning";
    default:
      return "";
  }
});
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.popup-container.popup-success {
  border-left: 5px solid #28a745;
}

.popup-container.popup-error {
  border-left: 5px solid #dc3545;
}

.popup-container.popup-info {
  border-left: 5px solid #007bff;
}

.popup-container.popup-warning {
  border-left: 5px solid #ffc107;
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.popup-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 10px;
}

.popup-icon {
  font-size: 2.8rem;
  color: #dc3545;
  margin-top: 20px;
}

.popup-body {
  font-size: 1rem;
  color: #333;
}

.popup-footer {
  margin-top: 20px;
}

.popup-close-btn {
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.popup-close-btn:hover {
  background: #0056b3;
}
</style>
