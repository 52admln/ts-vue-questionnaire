<template>
  <div>
    <el-checkbox-group v-model="topic.selectMultipleContent" class="checkbox-list">
      <el-checkbox
        v-for="(option, opIndex) in topic.options"
        :key="opIndex"
        :label="option.o_id"
        class="option-item"
      >
        <span>{{ option.content }}</span>
        <div :class="['option-desc']" v-text="option.desc" />
      </el-checkbox>
    </el-checkbox-group>
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
  .checkbox-list {
    width: 100%;

    .option-item {
      display: block;
      margin: 20px 0;
    }

    .option-desc {
      width: 100%;
      padding-left: 19px;
      box-sizing: border-box;
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  }
</style>
