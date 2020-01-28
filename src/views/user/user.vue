<template>
  <div v-loading.fullscreen.lock="loading">
    <el-form inline>
      <el-form-item>
        <el-button type="primary" @click="addUser">新增用户</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          :action="uploadUrl"
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          name="userfile"
          :show-upload-list="false"
          :limit="1"
          :on-exceeded="onUploadExceeded"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
        >
          <el-button plain icon="el-icon-upload el-icon--right">批量导入</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchParams.keyword" placeholder="搜索类别">
          <el-option
            v-for="(item, index) in searchOptions"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchParams.value" clearable placeholder="搜索内容" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="ios-search" @click="fetchListData">搜索用户</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table :data="list" border @selection-change="onSelectionChange">
        <el-table-column type="selection" />
        <el-table-column prop="u_number" label="工号" />
        <el-table-column prop="u_name" label="姓名" />
        <el-table-column prop="u_sex" label="性别">
          <template slot-scope="{ row }">
            {{ row.u_sex | sexFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="u_class" label="部门" />
        <el-table-column prop="u_identity" label="身份证号" />
        <el-table-column prop="u_email" label="邮箱" />
        <el-table-column prop="u_tel" label="手机号" />
        <el-table-column label="操作" width="180">
          <template slot-scope="{ row }">
            <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-20">
        <el-button type="danger" @click="batchDelete">批量删除</el-button>
        <el-button type="warning" @click="clearAll">一键清空</el-button>
      </div>
    </div>

    <div class="pagination">
      <el-pagination
        :current-page.sync="pageParams.current"
        :page-size="pageParams.page_size"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="onChangePage"
      />
    </div>

    <add-user :visible.sync="addUserVisible" @submit="fetchListData" />
    <edit-user :visible.sync="editUserVisible" :model="editModel" @submit="fetchListData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as UserAction from '@/api/user'
import AddUser from '@/views/user/components/AddUser.vue'
import EditUser from '@/views/user/components/EditUser.vue'
import { defaultUserData } from '@/api/default'

interface ISearchOption {
  value: string,
  label: string
}

@Component({
  components: {
    AddUser,
    EditUser
  }
})
export default class extends Vue {
  private loading: boolean = false
  private searchParams: {
    keyword: string,
    value: string
  } = {
    keyword: 'u_name',
    value: ''
  }
  public searchOptions:ISearchOption[] = [
    { value: 'u_name', label: '姓名' },
    { value: 'u_number', label: '工号' },
    { value: 'u_identity', label: '身份证号' },
    { value: 'u_email', label: '邮箱' },
    { value: 'u_tel', label: '手机号' }
  ]
  private editModel: User.IUser = {
    ...defaultUserData
  }
  private addUserVisible: boolean = false
  private editUserVisible: boolean = false
  private selectContent: User.IUser[] = []
  private pageParams: {
    current: number,
    page_size: number
  } = {
    current: 1,
    page_size: 10
  }
  private total: number = 0
  public list: User.IUser[] = []

  get uploadUrl () {
    return `${process.env.VUE_APP_BASE_API}/user/upload`
  }

  onChangePage (val: number) {
    this.pageParams.current = val
    this.fetchListData()
  }

  onSelectionChange (val: User.IUser[]) {
    this.selectContent = val
  }

  onUploadExceeded () {
    this.$message.warning('仅支持单个单文件导入')
  }

  onUploadSuccess (response: any) {
    if (response.err === 0) {
      this.$message.success(response.msg)
      this.fetchListData()
    } else {
      this.$message.error('上传出错')
    }
  }

  onUploadError () {
    this.$message.error('上传出错')
  }

  handleEdit (row: User.IUser) {
    this.editModel = row
    this.editUserVisible = true
  }

  handleDelete (row: User.IUser) {
    this.$confirm('确认删除此用户吗？', '删除', {
      type: 'warning'
    })
      .then(() => {
        this.delUser(row.u_id || '')
      })
      .catch(() => {})
  }

  public addUser () {
    this.addUserVisible = true
  }

  private async delUser (nIds: string) {
    const res = await UserAction.del({
      u_id: nIds
    })
    if (res.success) {
      this.$message.success(`成功删除${res.data}个用户`)
      this.fetchListData()
    } else {
      this.$message.error(res.msg)
    }
  }

  public batchDelete () {
    this.$confirm('您确认删除这几条内容吗？未选择任何项，则删除全部数据', '批量删除', {
      type: 'warning'
    })
      .then(async () => {
        const rowIds = this.selectContent.map(({ u_id: id }) => id).join(',')
        this.delUser(rowIds)
      })
      .catch(() => {})
  }

  public clearAll () {
    this.$confirm('您确认删除全部内容吗？', '一键清空', {
      type: 'warning'
    })
      .then(async () => {
        const res = await UserAction.clear()
        if (res.success) {
          this.$message.success('清空用户成功')
          this.fetchListData()
        } else {
          this.$message.error(res.msg)
        }
      })
      .catch(() => {})
  }

  public async fetchListData () {
    this.loading = true
    const res = await UserAction.list({
      ...this.searchParams,
      ...this.pageParams
    })
    this.loading = false
    if (res.success) {
      this.list = res.data.list
      this.total = res.data.total
    } else {
      this.$message.error(res.msg)
    }
  }

  mounted () {
    this.fetchListData()
  }
}
</script>

<style scoped>

</style>
