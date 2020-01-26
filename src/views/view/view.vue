<template>
  <div v-loading.fullscreen.lock="loading" class="view-layout">
    <div v-if="isNotPublish" class="main">
      <div class="header">
        <h1>问卷未发布！</h1>
      </div>
      <div class="content">
        <p>您所填写的问卷未发布，暂不能填写。</p>
      </div>
    </div>
    <div v-else-if="isExpired" class="main">
      <div class="header">
        <h1>问卷已过期！</h1>
      </div>
      <div class="content">
        <p>您所填写的问卷已到截止日期，暂不能填写。</p>
      </div>
    </div>
    <div v-else-if="naire" class="main">
      <div class="header">
        <h1>{{ naire.title }}</h1>
      </div>
      <div class="content">
        <div class="intro">
          <div style="white-space: pre-wrap">{{ naire.intro }}</div>
          <p class="mt-10">截止日期：{{ naire.deadline | formatTime }}</p>
        </div>
        <div class="user-info">
          <el-alert :type="isLogin ? 'success' : 'warning'">{{ loginTip }}</el-alert>
          <el-form
            v-show="!isLogin"
            ref="userInfo"
            class="mt-10"
            :model="userInfo"
            :rules="userInfoRule"
            inline
          >
            <el-form-item prop="name">
              <el-input v-model="userInfo.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item prop="identity">
              <el-input v-model="userInfo.identity" placeholder="请输入身份证后6位" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">点击登录</el-button>
            </el-form-item>
          </el-form>
        </div>

        <question-list :question-list="naire.topic" />

        <div class="text-center">
          <el-button
            v-if="isAdmin"
            type="success"
            @click="goBack"
          >返回管理平台
          </el-button>
          <el-button
            type="primary"
            :loading="finished"
            :disabled="finished"
            @click="submitNaire"
          >提交问卷</el-button>
        </div>
      </div>
      <div class="footer">
        <p>微型问卷系统</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import * as NaireAction from '@/api/naire'
import * as UserAction from '@/api/user'
import QuestionList from './components/Question/QuestionList.vue'
import { ElForm } from 'element-ui/types/form'
import { questionType } from '@/config/enum/questionType'

@Component({
  components: {
    QuestionList
  }
})
export default class extends Vue {
  private loading: boolean = false
  private naire: any = null
  private isLogin: boolean = false
  private userId: string = ''
  private userInfo: any = {
    name: '',
    identity: ''
  }
  private userInfoRule: any = {
    name: [
      { required: true, message: '请填写用户名', trigger: 'blur' }
    ],
    identity: [
      { required: true, message: '请填写身份证后6位', trigger: 'blur' }
    ]
  }
  private finished: boolean = false

  @Watch('$route')
  watchRoute () {
    this.fetchData()
  }

  get loginTip () {
    if (this.isLogin) return `当前登录用户：${this.userInfo.name}，请继续完成问卷！`
    return `在填写表单之前，请先填写用户信息。`
  }

  get isAdmin () {
    return UserModule.isAdmin
  }

  get isNotPublish () {
    return this.isAdmin ? false : this.naire.status === '0'
  }

  get isExpired () {
    return this.isAdmin ? false : Number(this.naire.deadline) < new Date().getTime()
  }

  goBack () {
    this.$router.push('/list')
  }

  handleSubmit () {
    const ref = this.$refs['userInfo'] as ElForm
    ref.validate(async (valid) => {
      if (!valid) return
      // 查找用户，返回用户id
      const res = await UserAction.getId({
        n_id: this.naire.n_id,
        name: this.userInfo.name,
        identity: this.userInfo.identity.toUpperCase()
      })
      if (res.success) {
        this.isLogin = true
        this.userId = res.data.u_id
        if (res.data.isFinished) {
          this.$notify({
            title: '已完成问卷',
            message: '您已完成该问卷，请勿重复提交！',
            type: 'warning'
          })
          this.$router.push('/complete')
        } else {
          this.$notify({
            title: '欢迎您 ' + res.data.name,
            message: '请继续完成问卷内容吧！',
            type: 'success'
          })
        }
      } else {
        this.$message.error('用户登录失败，请重试')
      }
    })
  }

  validateNaire () {
    let _flag = true
    let _addtion = false
    this.naire!.topic.forEach((item: Questionnaire.IQuestionItem, index: number) => {
      if (item.isRequired) {
        if (item.type === questionType.TEXT_QUESTION) {
          if (!(item.selectContent && item.selectContent.trim().length > 0)) {
            _flag = false
          }
        }
        if (item.type === questionType.SINGLE_CHOICE) {
          const _isAddtion = item.options && item.options.some((option, index) => {
            return option.isAddition && option.o_id === item.selectContent
          })
          // 有附加理由的情况
          if (_isAddtion && !(item.additional && item.additional.trim().length > 0)) {
            _addtion = true
          }
          if (!(item.selectContent && item.selectContent.trim().length > 0)) {
            _flag = false
          }
        }
        if (item.type === questionType.MULTIPLE_CHOICE) {
          if (!(item.selectMultipleContent && item.selectMultipleContent.length > 0)) {
            _flag = false
          }
          // 必选几项
          if ((item.setting.last && item.setting.last > 0) &&
            (item.selectMultipleContent && item.selectMultipleContent.length !== Number(item.setting.last)
            )) {
            _flag = false
          }
        }
      }
    })
    if (!_flag) {
      this.$notify.warning({
        title: '提示',
        message: '您还有必填项未正确填写，请检查后提交！',
        type: 'warning'
      })
      return false
    }
    if (_addtion) {
      this.$notify.warning({
        title: '提示',
        message: '请填写附加理由',
        type: 'warning'
      })
      return false
    }
    if (!this.isLogin) {
      this.$notify.warning({
        title: '提示',
        message: '请先填写用户信息',
        type: 'warning'
      })
      return false
    }
    return true
  }

  async submitNaire () {
    if (!this.validateNaire()) {
      return
    }
    this.finished = true
    const nId = this.naire.n_id
    const result: any[] = []

    this.naire.topic.forEach((question: Questionnaire.IQuestionItem, index: number) => {
      if (question.type === '单选') {
        const curQues = {
          n_id: nId,
          u_id: this.userId,
          q_id: question.q_id,
          o_id: question.selectContent,
          o_addition: question.additional ? question.additional.trim() : ''
        }
        result.push(curQues)
      } else if (question.type === '多选') {
        const curQues = {
          n_id: nId,
          u_id: this.userId,
          q_id: question.q_id,
          o_id: question.selectMultipleContent,
          o_addition: question.additional ? question.additional.trim() : ''
        }
        result.push(curQues)
      } else {
        const curQues = {
          n_id: nId,
          u_id: this.userId,
          q_id: question.q_id,
          o_id: '',
          o_addition: question.selectContent ? question.selectContent.trim() : ''
        }
        result.push(curQues)
      }
    })
    const res = await NaireAction.submit({
      nId,
      result: result,
      userId: this.userId
    })
    this.finished = false
    if (res.success) {
      this.$message.success(res.data.msg)
      this.$router.push('/complete')
    } else {
      this.$message.error('提交失败，错误信息：' + res.data.msg)
    }
  }

  async fetchData () {
    this.loading = true
    const res = await NaireAction.detail({
      n_id: this.$route.params.id,
      type: 'normal'
    })
    this.loading = false
    if (res.success) {
      this.naire = res.data
      document.title = res.data.title
    }
  }

  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.view-layout {
    background-color: rgb(237, 240, 248);
    min-height: 100vh;
    max-height: 100%;
    height: 100%;
    width: 100%;
    padding: 20px 10px;
    font-size: 14px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .main {
      max-width: 800px;
      width: 100%;
      height: auto;
      margin: 0 auto;
      padding-bottom: 30px;
      background-color: #fff;
      box-shadow: 0 2px 5px 1px rgba(124, 124, 124, .2);
    }

    .header {
      padding: 30px 20px;
      height: auto;
      min-height: 33px;
      border-bottom: 2px dotted #eee;

      h1 {
        width: 100%;
        margin: 0 auto;
        text-align: center;
      }
    }

    .content {
      padding: 20px;
      text-align: left;
      font-size: inherit;

      .intro {
        margin: 10px 0;
      }
    }

    .footer {
      margin-top: 10px;
      padding-top: 10px;
      text-align: center;
      border-top: 1px dotted #eee;
    }
  }

  .code-row-bg button {
    margin: 0 10px;
  }
</style>
