<template>
  <div>
    <label>
      <input
        type="checkbox"
        :value="consent"
        @change="(event) => $emit('update:consent', event.target.checked)"
      >
      {{ title }}
    </label>
    <div v-if="consent !== null && !consent" class="message-if-no-consent">
      {{messageIfNoConsent}}
    </div>
    <div v-if="consent === null" class="no-choice">
      Aucun choix actuellement effectué
    </div>
  </div>
</template>
<script>
export default {
  emits: ['update:consent'],
  props: {
    consent: null,
    title: String,
    description: { type: String, required: false, default: () => null},
    messageIfNoConsent: { type: String, required: false, default: () => null}
  },
}
</script>
<style scoped>
.no-choice {
  color: grey;
}

</style>
