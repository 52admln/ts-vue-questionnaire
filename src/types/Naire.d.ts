declare namespace Questionnaire {
  export interface INaire {
    title: string,
    intro: string,
    deadline: number | string
    status: number,
    options: any,
    topic: IQuestionItem[]
  }

  export interface IQuestionSetting {
    last?: number
  }

  export type QuestionType = '单选' | '多选' | '文本'

  export interface IQuestionItem {
    description: string,
    isRequired: boolean,
    options?: IOptionItem[],
    question: string,
    setting: IQuestionSetting,
    additional?: string,
    selectContent?: string,
    selectMultipleContent?: number[]
    type: string // TODO 使用 QuestionType 报错
  }

  export interface IOptionItem {
    content: string,
    desc: string,
    image: string,
    isAddition: boolean
  }
}
