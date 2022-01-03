<template>
  <div class="banner banner_bottom">
    <div class="banner-inner">

      <div class="banner-inner-actions">
        <button @click="acceptNecessary">Accepter uniquement la collecte nécessaire au fonctionnement</button>
        <button @click="openModal()">Modifier mes choix</button>
        <button @click="acceptAll">Accepter tout</button>
        <button @click="refuseAll">Refuser tout</button>
      </div>
      <button @click="hideBanner()" class="banner-inner__close">X</button>
    </div>
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
<style lang="scss" scoped>
.banner {
  position: absolute;
  padding: 1em;
  left: 0;
  right: 0;
  background-color: cornflowerblue;
  backdrop-filter: brightness(95%) blur(1px);
  &_top {
    top: 0;
    bottom: initial;
  }
  &_bottom {
    bottom: 0;
    top: initial;
  }

  &-inner {
    position: relative;
    &__close {
      position: absolute;
      padding: 1rem;
      top: -1rem;
      right: -1rem;
      border: none;
      background-color: transparent;
      color: black;
      cursor: pointer;
      &:hover, &:focus, &:active {
        backdrop-filter: brightness(95%);
      }
    }
    &-actions {
      button {
        border: none;
        cursor: pointer;
        padding: 1rem;
        margin-right: .5rem;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          backdrop-filter: brightness(95%) blur(1px);
          background-color: grey;
        }
      }
    }
  }
}
</style>
