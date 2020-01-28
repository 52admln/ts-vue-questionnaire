<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" title="修改截止时间">
    <el-form
      ref="editUser"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="80px"
      class="form"
    >
      <el-form-item label="姓名" prop="u_name">
        <el-input
          v-model="form.u_name"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="部门" prop="u_class">
        <el-input
          v-model="form.u_class"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="工号" prop="u_number">
        <el-input
          v-model="form.u_number"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="出生日期" prop="u_birthday">
        <el-input
          v-model="form.u_birthday"
          placeholder="格式：20171001"
        />
      </el-form-item>
      <el-form-item label="民族" prop="u_nation">
        <el-input
          v-model="form.u_nation"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="u_email">
        <el-input
          v-model="form.u_email"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="手机号" prop="u_tel">
        <el-input
          v-model="form.u_tel"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="身份证号" prop="u_identity">
        <el-input
          v-model="form.u_identity"
          placeholder="如最后为字母，以大写结尾"
        />
      </el-form-item>
      <el-form-item label="性别" prop="u_sex">
        <el-radio-group v-model="form.u_sex">
          <el-radio
            v-for="(item, index) in sexEnumMap"
            :key="index"
            :label="index"
          >{{ item }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import * as UserAction from '@/api/user'
import { sexEnumMap } from '@/config/enum/sex'
import { ElForm } from 'element-ui/types/form'
import { defaultUserData } from '@/api/default'

interface IUserForm extends User.IUser{
  u_id: string
}

@Component
export default class extends Vue {
  @Prop() visible!: boolean
  @Prop() model!: IUserForm
  private form: IUserForm = {
    u_id: '',
    ...defaultUserData
  }
  private rules: any = {
    u_name: [
      { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    u_class: [
      { required: true, message: '请输入部门', trigger: 'blur' }
    ],
    u_number: [
      { required: true, message: '请输入工号', trigger: 'blur' }
    ],
    u_birthday: [
      { required: true, message: '请输入出生日期', trigger: 'blur' }
    ],
    u_nation: [
      { required: true, message: '请输入民族', trigger: 'blur' }
    ],
    u_sex: [
      { required: true, message: '请选择性别', trigger: 'change' }
    ],
    u_email: [
      { type: 'email', required: true, message: '请输入邮箱地址', trigger: 'blur' }
    ],
    u_tel: [
      { required: true, message: '请输入手机号', trigger: 'blur' }
    ],
    u_identity: [
      { required: true, message: '请输入身份证号', trigger: 'blur' }
    ]
  }
  private sexEnumMap = sexEnumMap

  @Watch('model')
  watchModel (val: IUserForm) {
    this.form = val
  }

  get dialogVisible () {
    return this.visible
  }
  set dialogVisible (val) {
    this.$emit('update:visible', val)
  }

  async submit () {
    const ref = this.$refs.editUser as ElForm
    ref.validate(async (valid: boolean) => {
      if (!valid) return
      const res = await UserAction.updateUser({
        ...this.form
      })
      if (res.success) {
        this.dialogVisible = false
        this.$message.success('新增用户成功！')
        ref.resetFields()
        this.$emit('submit')
      } else {
        this.$message.error('新增用户失败')
      }
    })
  }
}
</script>

<style scoped>

</style>
