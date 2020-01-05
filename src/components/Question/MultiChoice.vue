<template>
  <div>
    <el-form label-width="80px" class="form">
      <el-form-item label="题目" prop="title">
        <el-input v-model="topic.question" placeholder="请输入题目内容" />
      </el-form-item>
      <el-form-item label="题目说明" prop="description">
        <el-input v-model="topic.description" placeholder="请输入题目说明，可以为空" />
      </el-form-item>
      <el-form-item label="选项" prop="title">
        <div
          v-for="(option, opIndex) in topic.options"
          :key="opIndex"
          class="option-item"
        >
          <el-row style="margin-bottom: 5px">
            <el-col :span="2">{{ opIndex + 1 }}</el-col>
            <el-col :span="16">
              <el-input
                :key="opIndex"
                v-model="option.content"
                placeholder="请输入选项内容"
                style="display:inline-block"
              />
            </el-col>
            <el-col :span="6">
              <div class="option-btn">
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  size="mini"
                  @click="addOption(index)"
                />
                <el-button
                  type="warning"
                  icon="el-icon-delete"
                  size="mini"
                  @click="delOption(index, opIndex)"
                />
              </div>

            </el-col>
          </el-row>
          <el-row style="margin-bottom: 5px">
            <el-col :span="2">描述</el-col>
            <el-col :span="16"><el-input
              v-model="option.desc"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入选项描述"
            /></el-col>
          </el-row>
          <el-row>
            <el-col :span="2">图片</el-col>
            <el-col :span="16"><el-input
              v-model="option.image"
              placeholder="请输入图片地址"
            /></el-col>
          </el-row>
          <div class="option-addtion">
            是否有附加说明内容：
            <el-switch
              v-model="option.isAddition"
              active-text="有"
              inactive-text="无"
              disabled
            />
          </div>
        </div>
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
      <el-form-item v-if="topic.setting" label="最少勾几项">
        <el-input v-model="topic.setting.last" placeholder="请输入至少勾选几项，默认请填写1" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) private topic!: Questionnaire.IQuestionItem

  private addOption () {
    this.$emit('addOption')
  }
  private delOption () {
    this.$emit('delOption')
  }
}
</script>

<style lang="scss" scoped>

</style>
