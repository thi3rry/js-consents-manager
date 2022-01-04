<template>
  <Modal @closeModal="closeModal">
    <template #header>
      <h2>Utilisation de vos données</h2>
    </template>
    <template #body>
      <Confirm ref="confirm" @confirm="confirmed = true" @cancel="confirmed = false">
        <ConsentRow
          v-model:consent="consents.necessary"
          title="Données nécessaires au bon fonctionnement du site"
          messageIfNoConsent="Ces données si elles ne sont pas acceptées peuvent nuire à votre navigation sur notre site."
        ></ConsentRow>
        <ConsentRow
          v-model:consent="consents.marketing"
          title="Cookies marketing"
        ></ConsentRow>
        <ConsentRow
          v-model:consent="consents.analytics"
          title="Cookies de mesure d'audience"
        ></ConsentRow>
        <div class="actions">
          <button @click="saveChoices">Enregistrer mes consentements</button>
          <button @click="removeChoices">Supprimer mes consentements</button>
          <button @click="acceptNecessary">Accepter uniquement la collecte nécessaire au fonctionnement</button>
          <button @click="acceptAll">Accepter tout</button>
          <button @click="refuseAll">Refuser tout</button>
        </div>
      </Confirm>
    </template>
  </Modal>
</template>
<script>
import Modal from "./Modal";
import ConsentRow from "./ConsentRow";
import Confirm from "./Confirm";
export default {
  components: {Confirm, ConsentRow, Modal},
  data() {
    return {
      // store date of choices done
      consentsRemovedAt: null,
      consentsUpdatedAt: null,
      consentsCreatedAt: null,
      consents: {
        necessary: null,
        marketing: null,
        analytics: null,
      }
    };
  },
  emits: ['close-modal', 'consents-update'],
  created() {
    let data = null;
    let consents = {};
    try {
      // TODO window.localStorage.setItem('ssd-rgpd-modal-data', ...)
      data = JSON.parse(window.localStorage.getItem('ssd-rgpd-modal-data'));
      consents = data.consents;
    }
    catch (e) {
      data = {
        consents: {},
        consentsCreatedAt: null,
        consentsUpdatedAt: null,
        consentsRemovedAt: null,
      }
    }
    this.consents.necessary = consents.necessary || null;
    this.consents.marketing = consents.marketing || null;
    this.consents.analytics = consents.analytics || null;
    this.consentsCreatedAt = data.consentsCreatedAt || null;
    this.consentsUpdatedAt = data.consentsUpdatedAt || null;
    this.consentsRemovedAt = data.consentsRemovedAt || null;
  },
  watch: {
    consents: {
      deep: true,
      handler() {
        this.emitConsentsUpdate();
      }
    }
  },
  methods: {
    closeModal(doNotConfirmNecessary = false) {
      doNotConfirmNecessary = doNotConfirmNecessary || this.confirmed;
      if(!doNotConfirmNecessary && !this.consents.necessary) {
        this.$refs.confirm.confirm({
          message: "Les cookies nécessaires au bon fonctionnement du site n'ont pas été accepté, votre navigation risque d'être troublée. Êtes-vous sûr de vouloir refuser l'utilisation de données 'nécessaires' ? ",
        }).then((confirm) => {
          console.log('confirm finished', confirm)
          if (confirm) {
            this.$emit('close-modal');
          }
        })
      }
      else {
        this.$emit('close-modal');
      }
    },
    closeModalTimeout(doNotConfirmNecessary = false, timeout = 250) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.closeModal(doNotConfirmNecessary);
        }, timeout);
      })
    },
    getConsents() {
      return this.consents;
    },
    saveChoices() {
      // Ensure all choice are true or false and not null
      Object.keys(this.consents).forEach((index) => {
        this.consents[index] = !!this.consents[index];
      })
      const date = new Date();
      this.consentsRemovedAt = null;
      this.consentsUpdatedAt = date;
      if (this.consentsCreatedAt === null) {
        this.consentsCreatedAt = date;
      }
      this.emitConsentsUpdate();
      this.closeModalTimeout();
    },
    removeChoices() {
      Object.keys(this.consents).forEach((index) => {
        this.consents[index] = null;
      })
      const date = new Date();
      this.consentsRemovedAt = date;
      this.consentsUpdatedAt = null;
      this.consentsCreatedAt = null;
      this.emitConsentsUpdate();
      this.closeModalTimeout(true);
    },
    emitConsentsUpdate() {
      this.$emit('consents-update', {
        consents: {...this.consents},
        consentsRemovedAt: this.consentsRemovedAt,
        consentsUpdatedAt: this.consentsUpdatedAt,
        consentsCreatedAt: this.consentsCreatedAt,
      });
    },
    acceptNecessary() {
      Object.keys(this.consents).forEach((index) => {
        this.consents[index] = false;
      })
      this.consents.necessary = true;
      this.saveChoices();
    },
    refuseAll() {
      Object.keys(this.consents).forEach((index) => {
        this.consents[index] = false;
      })
      const date = new Date();
      this.consentsRemovedAt = null;
      this.consentsUpdatedAt = date;
      if (this.consentsCreatedAt === null) {
        this.consentsCreatedAt = date;
      }
      this.emitConsentsUpdate();
      this.closeModalTimeout();
    },
    acceptAll() {
      Object.keys(this.consents).forEach((index) => {
        this.consents[index] = true;
      });
      this.saveChoices();
    }
  }
}
</script>
