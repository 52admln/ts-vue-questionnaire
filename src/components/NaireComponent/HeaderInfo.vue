<template>
  <div v-if="naire" class="header-info">
    <h2 class="title">{{ naire.title }}</h2>
    <div>
      <el-tag
        class="publish-status"
        :type="naire.status === 0 ? 'danger' : 'success'"
        effect="plain"
      >
        {{ naire.status === 0 ? '未发布' : '已发布' }}
      </el-tag>
      <p class="extend">
        创建日期： {{ naire.creattime | formatTime }} | 截止日期：{{ naire.deadline | formatTime }}
      </p>
    </div>

    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'HeaderInfo'
})
export default class extends Vue {
  @Prop() naire!: Questionnaire.INaire
}
</script>

<style lang="scss" scoped>
.header-info {
  padding: 5px 0 10px 0;
  border-bottom: 2px dotted #eee;

  .title {
    font-size: 16px;
  }

  .publish-status {
    margin: 5px 0;
  }

  .extend {
    font-size: 14px;
  }
}
</style>
