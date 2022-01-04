<template>
  <div v-html="defaultContent" v-toggle-modal v-toggle-banner v-open-modal v-show-banner></div>
  <RgpdBanner
    @openModal="openModal"
    v-if="!bannerShouldHide"
    @hideBanner="hideBanner"
    :acceptNecessaryBtn="bannerAcceptNecessaryBtn"
    :acceptAllBtn="bannerAcceptAllBtn"
    :openModalBtn="bannerOpenModalBtn"
    :refuseAllBtn="bannerRefuseAllBtn"
    :hideBannerBtn="bannerHideBtn"
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
    bannerAcceptNecessaryBtn: { type: Boolean, default: () => false},
    bannerHideBtn: { type: Boolean, default: () => true},
    bannerAcceptAllBtn: { type: Boolean, default: () => true},
    bannerOpenModalBtn: { type: Boolean, default: () => true},
    bannerRefuseAllBtn: { type: Boolean, default: () => true},
  },
  directives: {
    toggleModal: {
      mounted(el, binding) {
        const openModalElements = el.querySelectorAll('[data-toggle-modal]')
        openModalElements.forEach((openModalEl)=> {
          openModalEl.addEventListener('click', (ev) => {
            ev.preventDefault();
            binding.instance.toggleModal(ev)
          })
        })
      }
    },
    openModal: {
      mounted(el, binding) {
        const openModalElements = el.querySelectorAll('[data-open-modal]')
        openModalElements.forEach((openModalEl)=> {
          openModalEl.addEventListener('click', (ev) => {
            ev.preventDefault();
            binding.instance.openModal(ev)
          })
        })
      }
    },
    toggleBanner: {
      mounted(el, binding) {
        const showBannerElements = el.querySelectorAll('[data-toggle-banner]')
        showBannerElements.forEach((showBannerEl)=> {
          showBannerEl.addEventListener('click', (ev) => {
            ev.preventDefault();
            binding.instance.toggleBanner(ev);
          })
        })
      }
    },
    showBanner: {
      mounted(el, binding) {
        const showBannerElements = el.querySelectorAll('[data-show-banner]')
        showBannerElements.forEach((showBannerEl)=> {
          showBannerEl.addEventListener('click', (ev) => {
            ev.preventDefault();
            binding.instance.showBanner(ev);
          })
        })
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
    toggleBanner() {
      this.bannerShouldHide = !this.bannerShouldHide;
    },
    toggleModal() {
      this.modalShouldClose = !this.modalShouldClose;
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
    acceptAll() {},
    consentsUpdate(consents) {
      this.$ssdStorage.setItem('rgpd-consents', consents);
      console.log('consentements mis à jour', consents);
    }
  },
};
</script>
