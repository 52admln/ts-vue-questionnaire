<template>
  <!-- 创建问卷 -->
  <div v-loading.fullscreen.lock="loading" class="create">
    <el-alert class="mb-20" type="error">编辑问卷会清空已有的统计数据，请确保问卷在未发布的情况下进行修改。</el-alert>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="100px"
    >
      <el-form-item label="问卷名称" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="问卷介绍" prop="intro">
        <el-input v-model="form.intro" type="textarea" rows="5" />
      </el-form-item>

      <div class="add-option">
        <el-button type="primary" @click="addOption(questionType.SINGLE_CHOICE)">单选题</el-button>
        <el-button type="primary" @click="addOption(questionType.MULTIPLE_CHOICE)">多选题</el-button>
        <el-button type="primary" @click="addOption(questionType.TEXT_QUESTION)">文本题</el-button>
      </div>

      <question-list
        :question-list="form.topic"
        @delQuestion="onDelQuestion"
        @addOption="onAddOption"
        @delOption="onDelOption"
      />

      <el-form-item label="截止时间" prop="deadline">
        <el-date-picker
          v-model="form.deadline"
          type="datetime"
          :picker-options="datePickerOptions"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="default" @click="submitNaire(NaireStatus.UNPUBLISHED)">保存问卷</el-button>
        <el-button type="success" @click="submitNaire(NaireStatus.PUBLISHED)">发布问卷</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import { Form as ElForm } from 'element-ui'

import * as NaireAction from '@/api/naire'

import { questionType, questionTypeText } from '@/config/enum/questionType'
import { NaireStatus } from '@/config/enum/naireStatus'

import QuestionList from '@/components/Question/QuestionList.vue'

@Component({
  components: {
    QuestionList
  }
})
export default class NavBar extends Vue {
  private questionType = questionType
  private NaireStatus = NaireStatus
  private form:Questionnaire.INaire = {
    title: '',
    intro: '',
    deadline: '',
    status: 0,
    options: '',
    topic: []
  }
  private loading: boolean = false
  private rules = {
    title: [
      { required: true, message: '请输入问卷标题', trigger: 'blur' }
    ],
    deadline: [
      { required: true, message: '请选择截止时间', trigger: 'blur' }
    ]
  }

  private datePickerOptions = {
    disabledDate (time: Date) {
      return time.getTime() < dayjs().add(-1, 'day').valueOf()
    }
  }

  private onAddOption ({ index }: { index: number }) {
    const tempData = {
      content: '选项',
      isAddition: false,
      image: '', // 选项图片
      desc: ''
    }
    this.form.topic[index].options!.push({ ...tempData })
  }

  private onDelOption ({ index, opIndex }: { index: number, opIndex: number }) {
    if (this.form.topic[index].options!.length < 2) {
      return this.$message.warning('已经是最后一个选项，无法删除。')
    }
    this.form.topic[index].options!.splice(opIndex, 1)
  }

  private onDelQuestion ({ index }: { index: number }) {
    this.form.topic.splice(index, 1)
  }

  addOption (type: questionTypeText) {
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

  submitNaire (type: NaireStatus) {
    const form = this.$refs.form as ElForm
    form.validate(async (valid) => {
      if (!valid) return
      if (this.form.topic.length === 0) {
        return this.$message.warning('请至少添加一道题目。')
      }
      const params = {
        naire: {
          ...this.form,
          deadline: new Date(this.form.deadline).getTime()
        },
        status: 'update'
      }
      this.loading = true
      const res = await NaireAction.create(params)
      this.loading = false
      if (res.success) {
        this.$message.success('修改问卷成功！')
        await this.$router.push('/list')
      } else {
        this.$message.error(res.msg)
      }
    })
  }

  async fetchData () {
    this.loading = true
    const res = await NaireAction.detail({
      n_id: this.$route.params.id,
      type: 'normal'
    })
    this.loading = false
    if (res.success) {
      this.form = {
        ...res.data,
        deadline: new Date(Number(res.data.deadline))
      }
    }
  }

  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
  .create {
    .add-option {
      margin-bottom: 20px;
      text-align: center;
    }
  }
</style>
