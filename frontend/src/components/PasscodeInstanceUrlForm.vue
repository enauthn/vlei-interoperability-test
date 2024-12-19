<template>
  <form class="form-container" @submit.prevent="onConnect">
    <PopupMsg
      :popupData="popUpMsg"
      :visible="popupVisible"
      @close="popupVisible = false"
    />
    <div class="input-container">
      <label for="passcode">API Key:</label>
      <input
        id="passcode"
        type="text"
        v-model="passcode"
        placeholder="Enter passcode"
        required
        :disabled="isLoading || connectState == 'Connected'"
      />
    </div>
    <div class="input-container">
      <label for="instanceUrl">Instance URL:</label>
      <input
        id="instanceUrl"
        type="text"
        v-model="instanceUrl"
        placeholder="Enter Instance URL"
        required
        :disabled="isLoading || connectState == 'Connected'"
      />
    </div>
    <div class="connect-btn-container">
      <button
        type="submit"
        :disabled="!isFormValid || isLoading || connectState == 'Connected'"
      >
        <span v-if="isLoading" class="spinner"></span>
        <span>{{ connectState }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import PopupMsg from "./PopupMsg.vue";
const passcode = ref("");
const instanceUrl = ref("");
const isLoading = ref(false);
const connectState = ref("Connect");
const popUpMsg = ref<{
  type: "success" | "error" | "info" | "warning";
  header: string;
  desc: string;
}>({
  type: "success", // Default type
  header: "",
  desc: "",
});

const popupVisible = ref(false);

// Emit event for connection status
const emit = defineEmits<{
  (e: "update:isConnect", value: boolean): void;
}>();

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return passcode.value.trim() !== "" && instanceUrl.value.trim() !== "";
});

// Handle form submission
const onConnect = () => {
  isLoading.value = true; // Set loading state
  connectState.value = "Connecting...";
  setTimeout(() => {
    const isValid = validateInput(passcode.value, instanceUrl.value);
    if (isValid) {
      emit("update:isConnect", true);
      connectState.value = "Connected";
    } else {
      connectState.value = "Connect";
      popUpMsg.value = {
        type: "error",
        header: "Connection Error",
        desc: "Failed to Connect. Please check your inputs.",
      };
      popupVisible.value = true;
    }
    isLoading.value = false; // Reset loading state
  }, 2000); // Simulate a delay (e.g., network request)
};

// Example validation logic
const validateInput = (passcode: string, url: string) => {
  // Simulate validation failure for demonstration
  return passcode.trim() === "123" && url.trim() === "123";
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
}

.input-container label {
  width: fit-content;
  margin-right: 1rem;
  font-weight: bold;
}

.input-container input {
  width: 300px;
  padding: 0.5rem;
}

.connect-btn-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}

.connect-btn-container button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.connect-btn-container button:hover {
  background-color: #0056b3;
}

.connect-btn-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-msg {
  color: red;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
