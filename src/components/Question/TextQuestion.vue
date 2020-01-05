<template>
  <div>
    <el-form label-width="80px" class="form">
      <el-form-item label="题目" prop="title">
        <el-input v-model="topic.question" placeholder="请输入题目内容" />
      </el-form-item>
      <el-form-item label="题目说明" prop="description">
        <el-input v-model="topic.description" placeholder="请输入题目说明，可以为空" />
      </el-form-item>
      <el-form-item label="必填项">
        <div class="option-addtion">
          <el-switch
            v-model="topic.isRequired"
            active-text="有"
            inactive-text="否"
          />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) private topic!: Questionnaire.IQuestionItem
}
</script>

<style lang="scss" scoped>

</style>
