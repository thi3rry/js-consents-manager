<template>
  <div v-html="defaultContent" @click.prevent="click"></div>
  <RgpdBanner
    @openModal="openModal"
    v-if="!bannerShouldHide"
    @hideBanner="hideBanner"
  ></RgpdBanner>
  <RgpdModal v-if="!modalShouldClose"
    @closeModal="closeModal"
    @consentsUpdate="consentsUpdate"
  ></RgpdModal>
</template>

<script>
import RgpdModal from "./components/RgpdModal";
import RgpdBanner from "./components/RgpdBanner";

export default {
  name: "App",
  props: {
    defaultContent: String,
    banner: { type: Boolean, default: () => true},
    modal: { type: Boolean, default: () => false},
    onClick: {
      type: String,
      default: () => 'openModal',
      validator: function (value) {
        // La valeur passée doit être l'une de ces chaines de caractères
        return ['openModal', 'showBanner'].indexOf(value) !== -1
      }
    }
  },
  components: {
    RgpdBanner,
    RgpdModal
  },
  data() {
    return {
      bannerShouldHide: false,
      modalShouldClose: true,
      consents: {}
    };
  },
  mounted() {
    console.log('default content', this.defaultContent);
    this.bannerShouldHide = !!this.$ssdStorage.getItem('rgpd-banner-hidden', !this.banner);
    this.modalShouldClose = !!this.$ssdStorage.getItem('rgpd-modal-closed', !this.modal);
  },
  methods: {
    click() {
      switch(this.onClick.toLowerCase()) {
        case 'showmodal':
        case 'openmodal':
          this.openModal()
        break;
        case 'openbanner':
        case 'showbanner':
          this.showBanner()
        break;
      }
    },
    showBanner() {
      this.bannerShouldHide = false;
    },
    hideBanner() {
      this.$ssdStorage.setItem('rgpd-banner-hidden', (new Date()).toISOString());
      this.bannerShouldHide = true;
    },
    openModal() {
      this.modalShouldClose = false;
    },
    closeModal() {
      this.$ssdStorage.setItem('rgpd-modal-closed', (new Date()).toISOString());
      this.modalShouldClose = true;
    },
    consentsUpdate(consents) {
      this.$ssdStorage.setItem('rgpd-consents', consents);
      console.log('consentements mis à jour', consents);
    }
  },
};
</script>
