<template>
  <!-- 创建问卷 -->
  <div class="create">
    <el-form ref="form" label-position="right" label-width="100px">
      <el-form-item label="问卷名称">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="问卷介绍">
        <el-input v-model="form.intro" type="textarea" rows="5" />
      </el-form-item>

      <div class="add-option">
        <el-button type="primary" @click="addOption(questionType.SINGLE_CHOICE)">单选题</el-button>
        <el-button type="primary" @click="addOption(questionType.MULTIPLE_CHOICE)">多选题</el-button>
        <el-button type="primary" @click="addOption(questionType.TEXT_QUESTION)">文本提</el-button>
      </div>

      <!-- question list -->

      <question-list :question-list="form.topic" />

      <div class="create-footer">

        <el-form-item label="截止时间">
          <el-date-picker
            v-model="form.deadline"
            type="datetime"
            :picker-options="datePickerOptions"
            placeholder="选择日期时间"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="default">保存问卷</el-button>
          <el-button type="success">发布问卷</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import { questionType, questionTypeText } from '@/config/enum/questionType'
import QuestionList from '@/components/Question/QuestionList.vue'

@Component({
  components: {
    QuestionList
  }
})
export default class NavBar extends Vue {
  private questionType = questionType
  private form:Questionnaire.INaireItem = {
    title: '',
    intro: '',
    deadline: '',
    status: '',
    options: {},
    topic: []
  }

  private datePickerOptions = {
    disabledDate (time: Date) {
      return time.getTime() < dayjs().add(-1, 'day').valueOf()
    }
  }

  addOption (type: questionTypeText) {
    console.log(type)
    switch (type) {
      case questionType.SINGLE_CHOICE:
        const radioQues = {
          question: '单选题目',
          options: [
            {
              content: '选项',
              isAddition: false,
              image: '',
              desc: ''
            }
          ],
          description: '',
          type: '单选',
          isRequired: true,
          selectContent: '',
          setting: {
            last: 1
          },
          additional: ''
        }
        this.form.topic.push(radioQues)
        break
      case questionType.MULTIPLE_CHOICE:
        const checkboxQues = {
          question: '多选题目',
          options: [
            {
              content: '选项',
              isAddition: false,
              image: '',
              desc: ''
            }
          ],
          description: '',
          type: '多选',
          isRequired: true,
          setting: {
            last: 1 // 最少选择几项
          },
          selectMultipleContent: []
        }
        this.form.topic.push(checkboxQues)
        break
      case questionType.TEXT_QUESTION:
        const textareaQues = {
          question: '文本题目',
          description: '',
          type: '文本',
          isRequired: true,
          setting: {},
          selectContent: ''
        }
        this.form.topic.push(textareaQues)
        break
    }
  }
}
</script>

<style lang="scss" scoped>
.create {
  padding: 10px;

  .add-option {
    margin-bottom: 20px;
    text-align: center;
  }
}
</style>
