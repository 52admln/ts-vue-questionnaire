<template>
  <div v-loading.fullscreen.lock="loading">
    <header-info :naire="naire" />

    <div
      v-for="(question, index) in questions"
      :key="index"
      class="question-list"
    >
      <div class="question-item">
        <h3 class="title">Q{{ index + 1 }}: （{{ question.type }}）{{ question.question }}{{ question.isRequired ? '（必填）' : '（选填）' }}
          <el-button type="primary" @click="downloadXls(index)">导出选项数据</el-button>
        </h3>
        <p class="description">{{ question.description }}</p>
      </div>
      <el-table
        v-if="question.type === questionType.SINGLE_CHOICE || question.type === questionType.MULTIPLE_CHOICE"
        class="result-table border-table"
        :data="question.options"
      >
        <el-table-column prop="content" label="选项" />
        <el-table-column prop="count" label="小计" align="center" />
        <el-table-column prop="percent" label="百分比(%)" align="center" />
      </el-table>
      <div v-if="question.type === questionType.TEXT_QUESTION">
        <el-alert
          v-if="question.answerList.length > 100"
          class="overload-tip"
          type="warning"
        >
          为了避免渲染性能问题，当数据超过100行后将不再这里显示，可导出选项数据后查看。
        </el-alert>
        <el-table
          class="result-table border-table"
          height="400"
          :data="question.partOfAnswerList"
        >
          <el-table-column type="index" label="编号" width="80" align="center" />
          <el-table-column prop="userNumber" label="工号" align="center" width="150" />
          <el-table-column prop="userName" label="姓名" align="center" width="150" />
          <el-table-column prop="content" label="提交内容" />
        </el-table>
      </div>
      <p v-if="question.type === questionType.SINGLE_CHOICE && question.addtionContent.length > 0">附加理由列表：</p>
      <el-table
        v-if="question.type === questionType.SINGLE_CHOICE && question.addtionContent.length > 0"
        class="result-table border-table"
        height="200"
        :data="question.addtionContent"
      >
        <el-table-column type="index" label="编号" width="80" align="center" />
        <el-table-column prop="content" label="附加理由" />
      </el-table>
      <!-- 图表，跟随内容变高 -->
      <div
        v-if="question.type === questionType.SINGLE_CHOICE || question.type === questionType.MULTIPLE_CHOICE"
        class="echarts"
      >
        <div
          :id="'chart-'+ question.q_id"
          :style="{ width: '100%', height: question.options.length * 40 + 50 + 'px' }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import echarts from 'echarts'

import HeaderInfo from '@/components/NaireComponent/HeaderInfo.vue'

import { NaireAction } from '@/api/naire'
import { questionType } from '@/config/enum/questionType'

@Component({
  components: {
    HeaderInfo
  }
})
export default class StatisticsComponent extends Vue {
  private loading: boolean = false
  private naire: Questionnaire.INaire | null = null
  private questions: any[] = []
  private chartsOptions: any[] = []
  private questionType = questionType

  getChartsData (questions: any[]) {
    questions.forEach((item: any, quesIndex: number) => {
      if (item.type === questionType.SINGLE_CHOICE || item.type === questionType.MULTIPLE_CHOICE) {
        const tempObj: any = {
          questionTitle: 'Q' + (quesIndex + 1),
          Axis: []
        }
        item.options.forEach((option: any) => {
          // 字数过长则使用 ... 截掉多余文字
          const content = option.content.length > 16 ? `${option.content.substring(0, 14)}...` : option.content
          tempObj.Axis.push(content)
        })
        tempObj.series = item.charts
        this.chartsOptions[item.q_id] = { ...tempObj }
      }
    })
    this.$nextTick(() => {
      questions.forEach((item: any) => {
        if (item.type === questionType.SINGLE_CHOICE || item.type === questionType.MULTIPLE_CHOICE) {
          this.drawChart(item.q_id)
        }
      })
    })
  }

  drawChart (index: number) {
    const element = document.getElementById('chart-' + index) as HTMLDivElement
    const chart = echarts.init(element)
    chart.setOption({
      title: {
        text: this.chartsOptions[index].questionTitle,
        textStyle: {
          color: '#657180'
        }
      },
      grid: {
        left: '10%',
        right: '8%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {},
      color: ['#39f'],
      legend: {
        data: ['数量']
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        axisLabel: {
          interval: 0
        },
        data: this.chartsOptions[index].Axis
      },
      series: [{
        name: '数量',
        type: 'bar',
        data: this.chartsOptions[index].series,
        label: {
          normal: {
            show: true,
            position: 'right',
            textStyle: { // 数值样式
              color: 'black'
            }
          }
        }
      }],
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            excludeComponents: ['toolbox'],
            pixelRatio: 2,
            title: '导出',
            type: 'jpeg',
            lang: ['点击本地保存']
          }
        }
      }
    })
  }

  async fetchData () {
    this.loading = true
    const res = await NaireAction.statis({
      n_id: this.$route.params.id
    })
    this.loading = false
    if (res.success) {
      this.naire = res.data.naire
      this.questions = res.data.questions.map((item: any) => {
        return {
          ...item,
          partOfAnswerList: item.type === questionType.TEXT_QUESTION ? item.answerList.slice(0, 100) : []
        }
      })
      this.getChartsData(res.data.questions)
    } else {
      this.$message.error('获取结果统计失败。')
      this.$router.back()
    }
  }

  public mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
  .question-list {
    padding: 20px 0;
    margin-bottom: 20px;
    border-bottom: 2px dotted #eee;
    .question-item {
      .title {
        font-size: 16px;
      }
      .description {
        font-size: 14px;
      }
    }
  }

  .result-table {
    margin: 20px 0;
  }

  .overload-tip {
    margin-top: 20px;
  }
</style>
