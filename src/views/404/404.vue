<template>
  <div class="view-layout">
    <div class="main">
      <div class="header">
        <h1>404 错误</h1>
      </div>
      <div class="content">
        <p>无法找到该页面，请检查链接是否正确。</p>
        <p><a href="/">点击跳转</a>至首页。</p>
      </div>
    </div>
    <div class="footer">
      <p>微型问卷调查系统</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NotFoundComp extends Vue {
}
</script>

<style lang="scss" scoped>
  .view-layout {
    width: 100%;
    height: 100vh;
    padding: 20px 10px;
    background-color: rgb(237, 240, 248);

    .main {
      max-width: 800px;
      height: auto;
      margin: 0 auto;
      padding-bottom: 30px;
      background-color: #fff;
      box-shadow: 0 2px 5px 1px rgba(124, 124, 124, .2);
    }
    .header {
      padding: 15px 20px;
      height: auto;
      min-height: 33px;
      border-bottom: 2px dotted #eee;
      h1 {
        text-align: center;
      }
    }

    .content {
      padding: 20px;
      text-align: center;
    }

    .footer {
      margin-top: 10px;
      padding-top: 10px;
      text-align: center;
      border-top: 1px dotted #eee;
    }
  }
</style>
