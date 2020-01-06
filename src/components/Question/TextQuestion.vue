<template>
  <div>
    <el-form-item
      label="题目"
      :prop="'topic.' + index + '.question'"
      :rules="{
        required: true, message: '题目内容不能为空', trigger: 'blur'
      }"
    >
      <el-input v-model="topic.question" placeholder="请输入题目内容" />
    </el-form-item>
    <el-form-item label="题目说明">
      <el-input v-model="topic.description" placeholder="请输入题目说明，可以为空" />
    </el-form-item>
    <el-form-item
      label="必填项"
      :prop="'topic.' + index + '.isRequired'"
      :rules="{
        type: 'boolean', required: true, message: '请选择是否为必填项', trigger: 'change'
      }"
    >
      <div class="option-addtion">
        <el-switch
          v-model="topic.isRequired"
          active-text="有"
          inactive-text="否"
        />
      </div>
    </el-form-item>
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
