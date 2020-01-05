<template>
  <div>
    <div>
      <p v-if="questionList && questionList.length === 0" style="margin: 10px 0">一点东西都没有，赶快点击上方按钮添加题目吧！</p>
      <el-row
        v-for="(topic, index) in questionList"
        :key="index"
        type="flex"
        justify="start"
        align="top"
        :class="['question-item', type]"
      >
        <el-col :span="6" class="question-order">
          <div>Q{{ index + 1 }}：</div>
          <!-- 删除问题-->
          <div class="question-action" @click="delQuestion(index)">
            <i class="el-icon-delete-solid" />
          </div>
        </el-col>
        <el-col :span="18">
          <question-item
            :type="topic.type"
            :topic="topic"
          />
        </el-col>
      </el-row>
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

  delQuestion () {

  }
}
</script>

<style lang="scss" scoped>
  .question-order {
    width: 60px;
    text-align: center
  }

  .question-action{
    &:hover {
      color: #018fe5;
      cursor: pointer;
    }
  }
</style>
