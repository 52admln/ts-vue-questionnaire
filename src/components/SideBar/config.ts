export interface NavMenu {
  index: string
  icon?: string
  title: string
  children?: NavSubMenu[]
}

export interface NavSubMenu extends NavMenu {
  auth?: string[]
}

const navigations: NavMenu[] = [
  {
    index: '/list',
    icon: 'el-icon-document',
    title: '我的问卷'
  },
  {
    index: '/create',
    icon: 'el-icon-document',
    title: '创建问卷'
  }
]
export default navigations
