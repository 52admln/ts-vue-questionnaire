<template>
  <component :is="componentName" v-bind="$attrs" v-on="$listeners" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SingleChoice from './SingleChoice.vue'
import MultiChoice from './MultiChoice.vue'
import TextQuestion from './TextQuestion.vue'
import { questionType } from '@/config/enum/questionType'

@Component({
  components: {
    SingleChoice,
    MultiChoice,
    TextQuestion
  }
})
export default class extends Vue {
  @Prop() type!: string

  get componentName () {
    if (this.type === questionType.SINGLE_CHOICE) { return 'SingleChoice' }
    if (this.type === questionType.MULTIPLE_CHOICE) { return 'MultiChoice' }
    if (this.type === questionType.TEXT_QUESTION) { return 'TextQuestion' }
  }
}
</script>

<style lang="scss">
</style>
