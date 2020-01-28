<template>
  <div class="mt-20 mb-20">
    <el-input
      v-model="topic.selectContent"
      type="textarea"
      :autosize="{minRows: 2,maxRows: 5}"
      placeholder="请输入..."
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) private topic!: Questionnaire.IQuestionItem
  @Prop({ required: true }) private index!: number
}
</script>

<style lang="scss" scoped>

</style>
