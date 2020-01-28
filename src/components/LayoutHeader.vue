<template>
  <div class="layout-header">
    <slot />
    <a class="logout" @click="logout">注销 {{ userName }}</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component
export default class LayoutHeaderComponent extends Vue {
  get userName () {
    return UserModule.userName
  }

  logout () {
    UserModule.logout()
    this.$message.warning('已登出!')
    this.$router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);

    .logout {
      float: right;
      padding-right: 30px;
      line-height: 60px;
      font-size: 14px;
    }
  }
</style>
