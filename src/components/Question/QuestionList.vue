<template>
  <div>
    <div
      v-if="questionList && questionList.length === 0"
      class="no-question"
    >
      一点东西都没有，赶快点击上方按钮添加题目吧！
    </div>
    <div
      v-for="(topic, index) in questionList"
      :key="index"
      :class="['question-item', type]"
    >
      <div class="question-order">
        <div>Q{{ index + 1 }}：</div>
        <!-- 删除问题-->
        <div class="question-action" @click="delQuestion(index)">
          <i class="el-icon-delete-solid" />
        </div>
      </div>
      <div class="question-content">
        <el-card shadow="hover">
          <question-item
            :type="topic.type"
            :topic="topic"
            :index="index"
            v-on="$listeners"
          />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import QuestionItem from '@/components/Question/QuestionItem.vue'

@Component({
  components: {
    QuestionItem
  }
})
export default class extends Vue {
  @Prop() questionList!: Questionnaire.IQuestionItem[]
  @Prop({ default: 'normal' }) type?: string

  private delQuestion (index: number) {
    this.$emit('delQuestion', { index })
  }
}
</script>

<style lang="scss" scoped>
  .no-question {
    margin: 30px 0;
    font-size: 14px;
  }

  .question-item {
    display: flex;
    align-content: center;
    justify-content: flex-start;
    margin-bottom: 20px;

    .question-order {
      flex: 60px 0 0;
      text-align: center
    }

    .question-action{
      &:hover {
        color: #018fe5;
        cursor: pointer;
      }
    }

    .question-content {
      flex: 1;
    }
  }
</style>
