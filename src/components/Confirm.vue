<template>
  <template v-if="!visible">
    <slot></slot>
  </template>
  <template v-else>

    <div>{{confirmMessage}}
    </div>
    <div>
      <button @click.prevent="accept">{{ acceptLabel }}</button>
      <button @click.prevent="cancel">{{ cancelLabel}}</button>
    </div>
  </template>
</template>

<script>
  export default {
    props: {
    },
    emits: ['confirm', 'cancel'],
    data() {
      return {
        confirmMessage: 'Êtes-vous sûr ?',
        visible: false,
        acceptLabel: 'Oui',
        cancelLabel: 'Non',
        resolve: () => {},
        reject: () => {},

      }
    },
    methods: {
      async confirm({message, acceptLabel, cancelLabel}) {
        this.acceptLabel = acceptLabel ? acceptLabel : this.acceptLabel;
        this.cancelLabel = cancelLabel ? cancelLabel : this.cancelLabel;
        this.confirmMessage = message ? message : this.confirmMessage;
        this.visible = true;
        return new Promise((res, rej) => {
          this.resolve = res;
          this.reject = rej;
        });
      },
      accept() {
        this.visible = false;
        this.$emit('confirm');
        this.resolve(true);
      },
      cancel() {
        this.visible = false;
        this.$emit('cancel');
        this.resolve(false);
      }
    }
  }

</script>
