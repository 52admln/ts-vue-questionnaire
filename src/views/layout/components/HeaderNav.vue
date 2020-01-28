<template>
  <div class="header-nav">

    <el-menu
      :default-active="defaultActive"
      :unique-opened="true"
      text-color="#657180"
      active-text-color="#39f"
      mode="horizontal"
      router
    >
      <el-menu-item index="result">
        <i class="el-icon-pie-chart" />
        <span slot="title">结果统计</span>
      </el-menu-item>
      <el-menu-item index="source">
        <i class="el-icon-document" />
        <span slot="title">样本数据</span>
      </el-menu-item>
      <el-menu-item index="cross-analysis">
        <i class="el-icon-attract" />
        <span slot="title">交叉分析</span>
      </el-menu-item>
      <el-menu-item index="submit-statistics">
        <i class="el-icon-data-analysis" />
        <span slot="title">回收情况</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HeaderNav extends Vue {
  get defaultActive () {
    return this.$route.meta ? this.$route.meta.subNavIndex || '' : ''
  }
}
</script>

<style lang="scss" scoped>
  .header-nav {
    float: left;
  }
</style>
