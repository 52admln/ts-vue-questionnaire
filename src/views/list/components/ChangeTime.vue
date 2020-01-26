<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" title="修改截止时间">
    <el-date-picker
      v-model="deadline"
      type="datetime"
      placeholder="截止日期"
      :editable="false"
      placement="bottom"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IApiNaireItem } from '@/api/types'
import * as NaireAction from '@/api/naire'

@Component
export default class extends Vue {
  @Prop() visible!: boolean
  @Prop() model!: any
  private deadline: Date = new Date()

  @Watch('model')
  watchModel (val: IApiNaireItem) {
    this.deadline = new Date(Number(val.n_deadline))
  }

  get dialogVisible () {
    return this.visible
  }
  set dialogVisible (val) {
    this.$emit('update:visible', val)
  }

  async submit () {
    if (!this.deadline) {
      return this.$message.warning('请填写截止时间！')
    }
    const res = await NaireAction.changeTime({
      n_id: this.model.n_id,
      n_deadline: this.deadline.getTime()
    })
    if (res.success) {
      this.dialogVisible = false
      this.$message.success('截止时间更改成功！')
    } else {
      this.$message.error('更改截止时间失败')
    }
  }
}
</script>

<style scoped>

</style>
