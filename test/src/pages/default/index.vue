<template>
  <div>

    <ui-video-show :src-tablet="require('@/assets/tablet.mp4')"
                   :src-phone="require('@/assets/phone.mp4')"></ui-video-show>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Component,
  } from 'vue-property-decorator';

  @Component({
    components: {}
  })
  export default class extends Vue {

    //
    // lifecycle hook.
    constructor() {
      super();
    }

    created() {
      console.log('created: index');
    }
    mounted() {
      console.log('mounted: index');
    }

    beforeDestroy() {
      console.log('beforeDestroy: index');
      console.log('');
    }

    viewAppear(popData: any) {
      console.log('viewAppear: index ' + popData);
    }

    viewDisappear() {
      console.log('viewDisappear: index');
    }

    onClick() {
      this.$router.push('/layout2/page');
    }
  }

</script>


<style lang="scss" scoped>
</style>
