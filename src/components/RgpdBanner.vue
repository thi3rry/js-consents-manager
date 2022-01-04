<template>
  <div class="banner banner_bottom">
    <div class="banner-inner">

      <div class="banner-inner__consents-actions">
        <button v-if="acceptNecessaryBtn" @click="acceptNecessary">Accepter uniquement la collecte nécessaire au fonctionnement</button>
        <button v-if="acceptAllBtn" @click="acceptAll">Accepter tout</button>
        <button v-if="refuseAllBtn" @click="refuseAll">Refuser tout</button>
      </div>
      <div class="banner-inner__actions">
        <button v-if="hideBannerBtn" @click="hideBanner()" class="hide-banner">X</button>
        <button v-if="openModalBtn" @click="openModal()" class="open-modal">Modifier mes&nbsp;choix</button>
      </div>
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
  props: {
    acceptNecessaryBtn: { type: Boolean, default: () => true},
    acceptAllBtn: { type: Boolean, default: () => true},
    openModalBtn: { type: Boolean, default: () => true},
    refuseAllBtn: { type: Boolean, default: () => true},
    hideBannerBtn: { type: Boolean, default: () => true},
  },
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
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    @media screen and (min-width: 426px) {
      flex-direction: row;
    }
    &__actions {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: end;
      @media screen and (min-width: 426px) {
        flex-direction: column;
      }
      .hide-banner, .open-modal {
        &::before {
          display: inline-block;
          height: .5rem;
          width: .5rem;
        }
        padding: .5rem;
        border: none;
        background-color: transparent;
        color: black;
        cursor: pointer;
        text-align: right;
        &:hover, &:focus, &:active {
          backdrop-filter: brightness(95%);
        }
      }
    }

    &__consents-actions {
      padding: .5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      @media screen and (min-width: 426px) {
        flex-direction: row;
      }
      button {
        border: none;
        cursor: pointer;
        padding: .5rem;
        margin-bottom: .5rem;
        &:last-child {
          margin-bottom: 0;
        }
        @media screen and (min-width: 426px) {
          margin-bottom: 0;
          margin-right: .5rem;
          &:last-child {
            margin-right: 0;
          }
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
