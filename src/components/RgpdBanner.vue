<template>
  <div class="actions">
    <button @click="acceptNecessary">Accepter uniquement la collecte nécessaire au fonctionnement</button>
    <button @click="openModal()">Modifier mes choix</button>
    <button @click="acceptAll">Accepter tout</button>
    <button @click="refuseAll">Refuser tout</button>
    <button @click="hideBanner()">X</button>
  </div>
</template>
<script>
/**
 * Create a banner to quickly accept or refuse consents
 */
// TODO WIP

export default {
  emits: ['open-modal', 'hide-banner'],
  methods: {
    hideBanner() {
      this.$emit('hide-banner')
    },
    openModal() {
      this.$emit('open-modal')
    }
  }
}
</script>
<style lang="scss">
.actions {}
</style>
