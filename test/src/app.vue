
<template>
  <component
    :is="layout"
    id="app"
  ></component>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import * as ui from '@bpui/ui';
import layouts from './router/_tmpLayout';

@Component({
  components: {
  }
})
export default class extends Vue {
  layout: any = null;

  @Watch('$route')
  onRouteChange(newRoute: bp.Location, oldRoute?: bp.Location) {
    console.log(newRoute, oldRoute)
    this.layout = ui.getLayout(layouts, newRoute, oldRoute);
  }

  beforeMount() {
    ui.setTheme();
  }

  mounted() {
    this.onRouteChange(this.$route);
  }
}
</script>


<style lang="scss">
@import '~@bpui/ui/theme';
@import '~@bpui/ui/style';

</style>