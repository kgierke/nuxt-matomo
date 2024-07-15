<template>
  <div>
    <h1>Home</h1>
    <hr />
    <p>Matomo Event Tracking Test:</p>
    <button type="button" @click="handleClick">
      Test Matomo Event Tracking
    </button>
  </div>
</template>

<script setup lang="ts">
const { trackEvent } = useMatomo();

const handleClick = () => {
  console.log("Test Matomo Event Tracking");
  trackEvent("button", "click", "Test Matomo Event Tracking");
};
</script>
