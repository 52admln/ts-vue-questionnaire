<template>
  <div v-loading.fullscreen.lock="loading">
    <header-info :naire="naire" />
    <el-row class="cross-analysis-select" :gutter="20">
      <el-col :span="12">
        <h3>自变量：</h3>
        <p>一般为样本数据，例如性别和年龄，目前支持一项。</p>
        <el-select v-model="searchParams.x_id" style="width:100%;">
          <el-option
            v-for="(item, index) in questions"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-col>
      <el-col :span="12">
        <h3>因变量：</h3>
        <p>您要分析的目标题目，目前支持一项。</p>
        <el-select v-model="searchParams.y_id" style="width:100%;">
          <el-option
            v-for="(item, index) in questions"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-col>
    </el-row>
    <div class="cross-analysis-btn">
      <el-button type="primary" icon="ios-shuffle" @click="crossAnalysis">交叉分析</el-button>
    </div>
    <div v-if="columns && result" class="cross-analysis-table">
      <el-table
        class="border-table"
        size="small"
        :stripe="true"
        :data="result"
      >
        <el-table-column label="X \ Y" prop="type" min-width="100" max-width="150" />
        <el-table-column label="小计" prop="count" width="100" />
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :label="item.title"
          :prop="item.key"
          :width="item.width"
        />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderInfo from '@/components/NaireComponent/HeaderInfo.vue'
import * as NaireAction from '@/api/naire'
import { getRound } from '@/utils'

@Component({
  components: {
    HeaderInfo
  }
})
export default class extends Vue {
  private loading: boolean = false
  private statisData: {
    naire: Questionnaire.INaire | null,
    row: any[],
    column: any[],
    crossResult: any[]
  } = { naire: null, row: [], column: [], crossResult: [] }
  private naire: Questionnaire.INaire | null = null
  private questions: any[] = []
  private searchParams: {
    x_id: number | '',
    y_id: number | ''
  } = { x_id: '', y_id: '' }
  private result: any[] | null = null
  private columns: any[] | null = null

  // 格式化数据
  formateData () {
    // 得出已有的结果对象
    const curResult: {
      [key: string]: {
        count: string,
        value: string,
        y_id: string,
        x_id: string
      }
    } = {}
    this.statisData.crossResult.forEach((crossResult) => {
      curResult[`${crossResult.y_id}_${crossResult.x_id}`] = {
        count: crossResult['count'],
        value: crossResult['x_value'],
        y_id: crossResult['y_id'],
        x_id: crossResult['x_id']
      }
    })
    const rows: {
      [key: number]: {
        id: number
      }
    } = {}
    this.statisData.row.forEach((row) => {
      rows[row.o_id] = { id: row.o_value }
    })
    // 遍历全部的 x+y 的组合
    const allResult: any[] = []
    this.statisData.row.forEach((row) => {
      const _obj: {
        type: number,
        [key: string]: any
      } = { type: rows[row.o_id].id } // 每一行数据初始对象
      let sum = 0 // 小计
      this.statisData.column.forEach((column) => {
        // 格式为： 'y_id, x_id'
        // 对应为： `${column.o_id}_${row.o_id}`
        // 通过循环全部结果，从而判断不存在的结果，赋值为 0
        const curItem = curResult[`${column.o_id}_${row.o_id}`] // 当前组合的对象
        const curCount: number = !curItem ? 0 : Number(curItem.count) // 当前组合对象的数量
        _obj[`y_${column.o_id}`] = curCount // 生成 y_id 对应的数据列
        sum += curCount // 小计
      })
      // 将一行数据添加
      _obj.count = sum
      allResult.push(_obj)
    })
    // 对列数据进行百分比运算
    allResult.forEach(item => {
      for (const key in item) {
        if (!item.hasOwnProperty(key)) continue
        if (key !== 'type' && key !== 'count') {
          item[key] = `${item[key]} (${item[key] === 0 ? 0 : getRound((item[key] * 100 / item.count), 2)}%)`
        }
      }
    })
    this.result = allResult
  }
  // 根据返回的题目列表，创建表格表头
  getColumns (columns: any[]) {
    return columns.map((item, index) => {
      return {
        title: item.o_value,
        key: `y_${item.o_id}`, // 表头与数据 采用 y_<y_id> 来关联
        width: 100
      }
    })
  }

  async crossAnalysis () {
    this.loading = true
    const res = await NaireAction.crossanalysis({
      n_id: this.$route.params.id,
      ...this.searchParams
    })
    this.loading = false
    if (res.success) {
      const { column } = res.data
      this.statisData = {
        crossResult: res.data.cross_result,
        naire: res.data.naire,
        row: res.data.row,
        column: res.data.column
      }
      this.columns = this.getColumns(column) // 创建表头
      this.formateData() // 格式化表表格数据
    } else {
      this.$message.error(res.data)
      this.$router.back()
    }
  }

  async fetchQuestionData () {
    this.loading = true
    const res = await NaireAction.questions({
      n_id: this.$route.params.id
    })
    this.loading = false
    if (res.success) {
      const { naire, questions } = res.data
      this.naire = naire
      this.questions = questions
    } else {
      this.$message.error(res.msg)
      this.$router.back()
    }
  }

  public mounted () {
    this.fetchQuestionData()
  }
}
</script>

<style lang="scss" scoped>
.cross-analysis-select {
  margin-top: 10px;
}

.cross-analysis-btn {
  margin-top: 10px;
}

.cross-analysis-table {
  margin-top: 10px;
}
</style>
