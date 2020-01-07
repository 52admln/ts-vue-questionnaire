<template>
  <el-container class="layout">
    <el-aside width="220px" class="layout-menu-left">
      <logo title="微型问卷系统" />
      <nav-bar />
    </el-aside>
    <el-container class="layout-content-right">
      <el-header class="layout-header-wrap">
        <layout-header>
          <header-nav v-if="hasSubNav" />
        </layout-header>
      </el-header>
      <el-main class="layout-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Logo from '@/components/Logo'
import NavBar from '@/components/SideBar/NavBar'
import LayoutHeader from '@/components/LayoutHeader'
import HeaderNav from './components/HeaderNav'

@Component({
  components: {
    Logo,
    NavBar,
    LayoutHeader,
    HeaderNav
  }
})
export default class LayoutComponent extends Vue {
  get hasSubNav () {
    return this.$route.meta ? this.$route.meta.hasSubNav || false : false
  }
}
</script>

<style lang="scss" scoped>
  .layout {
    height: 100%;
    background: #f5f7f9;
    min-width: 960px;
  }

  .layout-menu-left {
    display: block;
    width: 250px;
    background: #464c5b;
  }

  .layout-content-right {
    min-height: 100vh;
  }

  .layout-content {
    min-height: 500px;
    margin: 15px;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    background: #fff;
  }

  .layout-header-wrap {
    padding: 0;
  }
</style>
