<template>
  <div class="modal" @click="backdropClick" v-on-escape="closeModal" tabindex="0">
    <div
        class="modal-inner"
        id="modal"
        role="dialog"
        aria-labelledby="modal-header"
        aria-describedby="modal-body"
        @click.stop="containerClick"
    >
      <button
          class="close-button"
          id="close-button"
          aria-label="Close modal"
          @click.prevent="closeModal"
          v-if="allowClose"
      >X</button>
      <div class="modal-container" >
        <header class="modal-header" id="modal-header">
          <slot name="header">Header goes here ...</slot>
        </header>

        <section class="modal-body" id="modal-body">
          <slot name="body">Body goes here ...</slot>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  emits: ['close-modal'],
  props: {
    allowClose: {
      type :Boolean,
      default: () => true
    }
  },
  directives: {
    onEscape: {
      mounted(el) {
        el.focus();
      },

      created(el, binding) {
        el.addEventListener('keydown', (event)=> {
          if (event.code === 'Escape') {
            binding.value();
          }
        })
      }, // new
    }
  },
  methods: {
    closeModal() {
      if (this.allowClose) {
        console.log('close modal');
        this.$emit("close-modal");
      }
      else {
        console.log('close modal is not allowed')
      }
    },
    containerClick() {
      console.log('container click');
    },
    backdropClick() {
      this.closeModal();
    }
  },
};
</script>

<style lang="css" scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(1px) brightness(30%);
  z-index: 999;
  display: flex;
  flex: 1 1;
  flex-direction: row;
}
.modal-inner {
  z-index: 1000;
  width: 50%;
  min-width: 20rem;
  margin: auto;
  max-height: 80%;
  position: relative;
}
.modal-container {
  background: white;
  padding: 1em;
}
.modal-header {
  text-align: center;
}
.close-button {
  border: none;
  background: transparent;
  color: white;
  position: absolute;
  right: 0;
  top: -2em;
}
</style>
