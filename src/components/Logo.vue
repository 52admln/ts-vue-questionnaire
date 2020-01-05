<template>
  <div class="logo">{{ title }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class LogoComponent extends Vue {
  @Prop({ default: '' }) private title!: string;
}
</script>

<style lang="scss" scoped>
.logo {
  min-height: 30px;
  text-align: center;
  font-size: 24px;
  color: #fff;
  line-height: 30px;
  border-radius: 3px;
  margin: 15px auto;
}
</style>
