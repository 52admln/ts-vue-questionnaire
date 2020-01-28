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
    icon: 'el-icon-s-promotion',
    title: '创建问卷'
  },
  {
    index: '/user',
    icon: 'el-icon-user-solid',
    title: '用户管理'
  },
  {
    index: '/setting',
    icon: 'el-icon-s-tools',
    title: '管理员设置'
  }
]
export default navigations
