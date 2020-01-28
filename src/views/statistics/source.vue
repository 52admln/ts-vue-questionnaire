<template>
  <div v-loading.fullscreen.lock="loading" class="source-data">
    <header-info :naire="statisData.naire">
      <el-dropdown class="export-excel" @command="exportExcelPart">
        <el-button type="primary">
          导出为 Excel<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in Math.ceil((total / excelRowsPerTable))"
            :key="index"
            :command="item"
          >
            导出分表 {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header-info>

    <el-table :data="statisData.userResult" class="border-table">
      <el-table-column label="序号" type="index" width="100" align="center" />
      <el-table-column label="创建时间" min-width="160">
        <template slot-scope="{ row }">
          {{ row.s_creattime | formatTime }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="(column, index) in tableColumns"
        :key="index"
        :prop="column.key"
        :label="column.title"
        :min-width="column.width"
        align="center"
      />
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
import { UserModule } from '@/store/modules/user'
import HeaderInfo from '@/components/NaireComponent/HeaderInfo.vue'
import * as NaireAction from '@/api/naire'
import { IApiQuestionItem } from '@/api/types'

@Component({
  components: {
    HeaderInfo
  }
})
export default class extends Vue {
  private loading: boolean = false
  private excelRowsPerTable: number = 500

  private tableColumns: any[] = []
  private statisData: {
    naire: Questionnaire.INaire | null,
    question: IApiQuestionItem[],
    userResult: any[]
  } = { naire: null, question: [], userResult: [] }
  private pageParams: {
    current: number,
    page_size: number
  } = {
    current: 1,
    page_size: 10
  }
  private total: number = 5

  exportExcelPart (index: number) {
    const url = process.env.VUE_APP_BASE_API
    const token = UserModule.token
    const nId = this.$route.params.id
    const pageSize = this.excelRowsPerTable
    window.open(`${url}/naire/sourcedataExport?token=${token}&n_id=${nId}&current=${index}&page_size=${pageSize}`)
  }

  onChangePage (val: number) {
    this.pageParams.current = val
    this.fetchData()
  }

  getTableColumns (questions: IApiQuestionItem[]) {
    const baseColumns = [
      {
        title: '姓名',
        key: 'u_name',
        fixed: 'left',
        ellipsis: false,
        width: 100
      },
      {
        title: '部门',
        key: 'u_class',
        width: 100
      },
      {
        title: '工号',
        key: 'u_number',
        width: 120
      }
    ]
    questions.forEach((item: IApiQuestionItem, index: number) => {
      baseColumns.push({
        title: item.q_content,
        key: 'q_' + item.q_id, // 表头与数据 采用 q_<q_id> 来关联
        width: 200
      })
    })
    return baseColumns
  }

  async fetchData () {
    this.loading = true
    const res = await NaireAction.sourceData({
      n_id: this.$route.params.id,
      ...this.pageParams
    })
    this.loading = false
    if (res.success) {
      const { total, result } = res.data!
      this.statisData = {
        userResult: result.user_result,
        naire: result.naire,
        question: result.question
      }
      this.total = total
      this.tableColumns = this.getTableColumns(result.question) // 创建表头
    } else {
      this.$message.error(res.msg)
      this.$router.back()
    }
  }

  public mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.source-data {
  .export-excel {
    margin-top: 5px;
  }
}
</style>
