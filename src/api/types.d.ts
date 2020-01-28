export interface IApiNaireSourceData {
  total: number,
  result: {
    naire: Questionnaire.INaire,
    question: IApiQuestionItem[],
    user_result: any[]
  }
}

// 结果统计，附加内容和文本题目答案
type AnswerItem = {
  userNumber: string
  userName: string
  content: string
}

export interface IApiQuestionItem {
  q_id: number,
  q_content: string,
  type: string,
  answerList: AnswerItem[]
}

// 问卷格式
export interface IApiNaireItem {
  n_id: string,
  a_id: string,
  n_creattime: string,
  n_deadline: string,
  n_title: string,
  n_status: string
  n_intro: string
  n_options: string
}

// 结果通统计
export interface IApiNaireStatisticResult {
  naire: Questionnaire.INaire,
  questions: IApiQuestionItem[]
}

// 用户信息
export interface IApiUserInfo {
  u_id: string,
  name: string,
  isFinished: boolean
}

// 部门列表
export interface IApiClassItem {
  u_class: string
}
