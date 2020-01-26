<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" title="复制地址">
    <el-row>
      <el-col :span="18">
        <el-input
          id="url"
          ref="copyURL"
          :value="url"
          :autofocus="true"
          :readonly="true"
        />
      </el-col>
      <!-- 投票类地址 -->
      <el-col :span="4" :offset="1">
        <el-button
          class="copyboard"
          data-clipboard-target="#url"
          @click="handleCopy"
        >复制</el-button>
      </el-col>
    </el-row>
    <el-alert class="mt-20">如无法使用上方复制按钮，请选中内容后，使用 Ctrl + C 复制。也可扫描下方二维码或右键保存二维码进行访问。</el-alert>
    <div class="qrcode-wrapper">
      <canvas ref="qrcode" />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IApiNaireItem } from '@/api/types'
import * as NaireAction from '@/api/naire'
import Clipboard from 'clipboard'
import QRCode from 'qrcode'

@Component
export default class extends Vue {
  @Prop() visible!: boolean
  @Prop() model!: any
  private deadline: Date = new Date()

  @Watch('model')
  watchModel (val: IApiNaireItem) {
    this.deadline = new Date(Number(val.n_deadline))
    this.$nextTick(() => {
      QRCode.toCanvas(this.$refs.qrcode, this.url, {
        width: 300
      }, function (error) {
        if (error) console.error(error)
      })
    })
  }

  get dialogVisible () {
    return this.visible
  }
  set dialogVisible (val) {
    this.$emit('update:visible', val)
  }

  get url () {
    return window.location.origin + '/#/view/' + this.model.n_id
  }

  handleCopy () {
    const clipboard = new Clipboard('.copyboard')

    clipboard.on('success', (e) => {
      this.$message.success('复制成功！')
      e.clearSelection()
    })

    clipboard.on('error', (e) => {
      this.$message.error('复制失败！')
    })
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

<style lang="scss" scoped>
.qrcode-wrapper {
  text-align: center;
}
</style>
