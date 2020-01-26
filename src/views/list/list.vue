<template>
  <div class="naire-list">
    <div class="naire-btn">
      <el-button type="primary" @click="createNaire">新建问卷</el-button>
    </div>
    <el-table :data="list">
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column prop="n_title" label="问卷名称" align="center">
        <template slot-scope="{ row }">
          <router-link tag="a" :to="`./view/${row.n_id}`">
            {{ row.n_title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="n_creattime" label="创建时间" align="center">
        <template slot-scope="{ row }">
          {{ row.n_creattime | formatTime }}
        </template>
      </el-table-column>
      <el-table-column prop="n_deadline" label="截止时间" align="center">
        <template slot-scope="{ row }">
          <!-- 问卷超过截止日期 -->
          <span :class="{ 'highlight': isExpired(row.n_deadline) }">
            {{ row.n_deadline | formatTime }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="n_status" label="发布状态" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.n_status | statusColorFilter">
            {{ row.n_status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="{ row }">
          <el-button size="mini" style="margin-right: 10px" @click="handleStatistics(row)">统计</el-button>
          <el-dropdown @command="onOptionClick($event, row)">
            <el-button type="primary" plain size="mini">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="preview">预览问卷</el-dropdown-item>
              <el-dropdown-item command="copyUrl">复制地址</el-dropdown-item>
              <el-dropdown-item command="submitStatis" divided>查看回收情况</el-dropdown-item>
              <el-dropdown-item command="edit">编辑问卷</el-dropdown-item>
              <el-dropdown-item command="deadline">编辑截止时间</el-dropdown-item>
              <el-dropdown-item command="publish">发布问卷</el-dropdown-item>
              <el-dropdown-item command="unpublish">停止发布</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import * as NaireAction from '@/api/naire'
import { IApiNaireItem } from '@/api/types'

import { NaireStatus, NaireStatusText, NaireStatusColor } from '@/config/enum/naireStatus'

@Component({
  filters: {
    formatTime (val: string | number) {
      const timestamp = Number(val)
      return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    statusFilter (val: NaireStatus) {
      return NaireStatusText[val]
    },
    statusColorFilter (val: NaireStatus) {
      return NaireStatusColor[val]
    }
  }
})
export default class NavBar extends Vue {
  private list: IApiNaireItem[] = []

  mounted () {
    this.fetchListData()
  }

  onOptionClick (command: string, row: any) {
    console.log(command, row)
    switch (command) {
      case 'preview':
        console.log('预览问卷')
        this.$router.push({
          name: 'view',
          params: {
            id: row.n_id
          }
        })
        break
      case 'edit':
        this.$router.push({
          name: 'edit',
          params: {
            id: row.n_id
          }
        })
        break
      case 'publish':
        console.log('发布问卷')
        break
      case 'unpublish':
        console.log('停止发布')
        break
    }
  }

  /**
   * 是否已截止
   * @param deadline
   */
  public isExpired (deadline: number) {
    return deadline < Date.now()
  }

  public createNaire () {
    this.$router.push({ name: 'create' })
  }

  /**
   * 查看统计
   * @param row
   */
  public handleStatistics (row: any) {
    this.$router.push({
      name: 'statisticsResult',
      params: {
        id: row.n_id
      }
    })
  }

  public async fetchListData () {
    const res = await NaireAction.list()
    if (!res.success) return
    this.list = res.data ? res.data : []
  }
}
</script>

<style lang="scss" scoped>
  .naire-btn {
    margin: 10px;
  }
</style>
