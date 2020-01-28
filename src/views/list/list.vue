<template>
  <div v-loading.fullscreen.lock="loading" class="naire-list">
    <div class="naire-btn">
      <el-button type="primary" @click="createNaire">创建问卷</el-button>
      <el-button type="danger" @click="batchDelete">批量删除</el-button>
    </div>
    <el-table :data="list" @selection-change="onSelectionChange">
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column prop="n_title" label="问卷名称" align="left">
        <template slot-scope="{ row }">
          <router-link tag="a" :to="`./view/${row.n_id}`">
            {{ row.n_title }}
            <el-tag v-if="isExpired(row.n_deadline)" class="ml-10" size="mini" type="danger">已截止</el-tag>
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
          {{ row.n_deadline | formatTime }}
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
          <el-button type="primary" size="mini" style="margin-right: 10px" @click="handleStatistics(row)">统计分析</el-button>
          <el-dropdown @command="onOptionClick($event, row)">
            <el-button type="danger" size="mini">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="preview">预览问卷</el-dropdown-item>
              <el-dropdown-item command="copyUrl">复制地址</el-dropdown-item>
              <el-dropdown-item command="submitStatistic">查看回收情况</el-dropdown-item>
              <el-dropdown-item command="edit" divided>编辑问卷</el-dropdown-item>
              <el-dropdown-item command="deadline">编辑截止时间</el-dropdown-item>
              <el-dropdown-item command="publish">{{ row.n_status === NaireStatus.PUBLISHED ? '停止发布' : '发布问卷' }}</el-dropdown-item>
              <el-dropdown-item command="delete">删除问卷</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <change-time :visible.sync="changeTimeVisible" :model="editModel" />
    <copy-url :visible.sync="copyUrlVisible" :model="editModel" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import ChangeTime from './components/ChangeTime.vue'
import CopyUrl from './components/CopyUrl.vue'
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
  },
  components: {
    ChangeTime,
    CopyUrl
  }
})
export default class NavBar extends Vue {
  private list: IApiNaireItem[] = []
  private NaireStatus = NaireStatus
  private loading: boolean = false
  private changeTimeVisible: boolean = false
  private copyUrlVisible: boolean = false
  private editModel: any = {}
  private selectContent: any[] = []

  mounted () {
    this.fetchListData()
  }

  onSelectionChange (val: any) {
    this.selectContent = val
  }

  onOptionClick (command: string, row: any) {
    switch (command) {
      case 'preview':
        this.$router.push({
          name: 'view',
          params: {
            id: row.n_id
          }
        })
        break
      case 'copyUrl':
        this.editModel = row
        this.copyUrlVisible = true
        break
      case 'submitStatistic':
        this.$router.push({
          name: 'submitStatistics',
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
        this.changeStatus(row)
        break
      case 'deadline':
        this.editModel = row
        this.changeTimeVisible = true
        break
      case 'delete':
        this.singleDelete(row)
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

  private async deleteNaire (nIds: string) {
    const res = await NaireAction.del({
      n_id: nIds
    })
    if (res.success) {
      this.$message.success('删除成功')
      this.fetchListData()
    } else {
      this.$message.error('删除失败')
    }
  }

  public singleDelete (row: IApiNaireItem) {
    this.$confirm('您确认删除问卷吗？', '删除', {
      type: 'warning'
    })
      .then(async () => {
        this.deleteNaire(row.n_id)
      })
      .catch(() => {})
  }

  public batchDelete () {
    this.$confirm('您确认删除这几条内容吗？', '批量删除', {
      type: 'warning'
    })
      .then(async () => {
        const rowIds = this.selectContent.map(({ n_id: id }) => id).join(',')
        this.deleteNaire(rowIds)
      })
      .catch(() => {})
  }

  /**
   * 查看统计
   * @param row
   */
  public handleStatistics (row: IApiNaireItem) {
    this.$router.push({
      name: 'statisticsResult',
      params: {
        id: row.n_id
      }
    })
  }

  /**
   * 修改发布状态
   * @param row
   */
  async changeStatus (row: IApiNaireItem) {
    this.loading = true
    const res = await NaireAction.changeStatus({
      n_id: row.n_id
    })
    this.loading = false
    if (res.success) {
      this.$message.success('更改状态成功')
      this.fetchListData()
    } else {
      this.$message.error(res.msg)
    }
  }

  public async fetchListData () {
    this.loading = true
    const res = await NaireAction.list()
    this.loading = false
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
