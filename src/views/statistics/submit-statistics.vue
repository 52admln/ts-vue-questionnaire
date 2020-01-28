<template>
  <div v-loading.fullscreen.lock="loading">
    <el-form :model="searchParams" inline>
      <el-form-item prop="user">
        <el-select v-model="searchParams.status" placeholder="请选择状态">
          <el-option :value="-1" label="全部" />
          <el-option :value="1" label="已完成" />
          <el-option :value="0" label="未完成" />
        </el-select>
      </el-form-item>
      <el-form-item prop="password">
        <el-select v-model="searchParams.u_class" placeholder="请选择部门">
          <el-option value="all">全部</el-option>
          <el-option v-for="(item, index) in classList" :key="index" :value="item.u_class">
            {{ item.u_class }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">检索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExport">导出为Excel</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list">
      <el-table-column prop="u_id" label="用户ID" />
      <el-table-column prop="u_number" label="工号" />
      <el-table-column prop="u_name" label="姓名" />
      <el-table-column label="性别">
        <template slot-scope="{ row }">
          {{ row.u_sex | sexFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="u_class" label="部门" />
      <el-table-column label="状态">
        <template slot-scope="{ row }">
          <el-tag :type="row.is_finished === '1' ? 'success' : 'danger'">
            {{ row.is_finished === '1' ? '已完成' : '未完成' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page.sync="pageParams.current"
        :page-size="pageParams.page_size"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="onChangePage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as NaireAction from '@/api/naire'
import * as UserAction from '@/api/user'
import { UserModule } from '@/store/modules/user'
import { IApiClassItem } from '@/api/types'

@Component
export default class extends Vue {
  private loading: boolean = false
  private pageParams: {
    current: number,
    page_size: number
  } = {
    current: 1,
    page_size: 10
  }
  private list: any[] = []
  private total: number = 0
  private searchParams: {
    status: number,
    u_class: string
  } = {
    status: -1,
    u_class: ''
  }
  private classList: IApiClassItem[] = []

  onChangePage (val: number) {
    this.pageParams.current = val
    this.fetchData()
  }

  handleSearch () {
    this.pageParams.current = 1
    this.fetchData()
  }

  handleExport () {
    const api = process.env.VUE_APP_BASE_API
    const nId = this.$route.params.id
    const token = UserModule.token
    window.location.href = `${api}/naire/exportStatis?token=${token}&n_id=${nId}`
  }

  // 查看回收情况 数据获取
  async fetchData () {
    this.loading = true
    const res = await NaireAction.submitStatistic({
      n_id: this.$route.params.id,
      ...this.pageParams,
      ...this.searchParams
    })
    this.loading = false
    if (res.success) {
      this.list = res.data.data
      this.total = res.data.total
    } else {
      this.$message.error('获取数据失败')
    }
  }

  async getClass () {
    this.loading = true
    const res = await UserAction.getClass()
    this.loading = false
    if (res.success) {
      this.classList = res.data || []
    } else {
      this.$message.error(res.msg)
    }
  }

  async mounted () {
    await this.getClass()
    await this.fetchData()
  }
}
</script>

<style scoped>

</style>
