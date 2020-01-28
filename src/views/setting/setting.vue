<template>
  <div class="change-pwd">
    <el-form ref="form" :model="form" :rules="rules" label-width="80">
      <el-form-item label="原密码" prop="oldPasswd">
        <el-input v-model="form.oldPasswd" type="password" />
      </el-form-item>
      <el-form-item label="密码" prop="passwd">
        <el-input v-model="form.passwd" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="passwdCheck">
        <el-input v-model="form.passwdCheck" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
        <el-button type="ghost" style="margin-left: 8px" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as AdminAction from '@/api/admin'
import { UserModule } from '@/store/modules/user'

@Component
export default class extends Vue {
  private validatePass (rule: any, value: string, callback: Function) {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      if (this.form.passwdCheck !== '') {
        // 对第二个密码框单独验证
        const ref = this.$refs.form as ElForm
        ref.validateField('passwdCheck')
      }
      callback()
    }
  }
  private validatePassCheck (rule: any, value: string, callback: Function) {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== this.form.passwd) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }

  private form: {
    passwd: string,
    passwdCheck: string,
    oldPasswd: string
  } = {
    passwd: '',
    passwdCheck: '',
    oldPasswd: ''
  }

  private rules: any = {
    passwd: [
      { validator: this.validatePass, trigger: 'blur' }
    ],
    passwdCheck: [
      { validator: this.validatePassCheck, trigger: 'blur' }
    ],
    oldPasswd: [
      { required: true, message: '请输入原密码', trigger: 'blur' }
    ]
  }

  private loading: boolean = false

  handleSubmit () {
    const ref = this.$refs.form as ElForm
    ref.validate(async (valid) => {
      if (!valid) return
      const params = {
        oldpwd: this.form.oldPasswd,
        newpwd: this.form.passwd
      }
      this.loading = true
      const res = await AdminAction.changePwd(params)
      this.loading = false
      if (res.success) {
        if (res.data > 0) {
          this.$message.success('修改成功')
          // 重置表单
          this.handleReset()
          UserModule.logout()
          this.$router.push('/login')
        } else {
          this.$message.error('修改失败，请重试')
        }
      } else {
        this.$message.error('修改失败，请重试')
      }
    })
  }

  handleReset () {
    const ref = this.$refs.form as ElForm
    ref.resetFields()
  }
}
</script>

<style lang="scss" scoped>
  .change-pwd {
    width: 50%;
  }
</style>
