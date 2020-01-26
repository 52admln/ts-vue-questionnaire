import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '../views/layout/layout.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/list',
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/list/list.vue'),
        meta: { navIndex: '/list', title: '我的问卷' }
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/create/create.vue'),
        meta: { navIndex: '/list', title: '创建' }
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: () => import('@/views/edit/edit.vue'),
        meta: { navIndex: '/list', title: '编辑' }
      },
      {
        path: 'statistics/:id',
        name: 'statistics',
        component: () => import('@/views/statistics/index.vue'),
        meta: { hasSubNav: true, navIndex: '/list', title: '结果统计' },
        children: [
          {
            path: 'result',
            name: 'statisticsResult',
            component: () => import('@/views/statistics/result.vue'),
            meta: {
              navIndex: '/list',
              subNavIndex: 'result',
              title: '结果统计',
              hasSubNav: true
            }
          },
          {
            path: 'source',
            name: 'statisticsSource',
            component: () => import('@/views/statistics/source.vue'),
            meta: {
              navIndex: '/list',
              subNavIndex: 'source',
              title: '样本数据',
              hasSubNav: true
            }
          },
          {
            path: 'cross-analysis',
            name: 'statisticsCrossAnalysis',
            component: () => import('@/views/statistics/cross-analysis.vue'),
            meta: {
              navIndex: '/list',
              subNavIndex: 'cross-analysis',
              title: '交叉分析',
              hasSubNav: true
            }
          },
          {
            path: 'submit-statistics',
            name: 'submitStatistics',
            component: () => import('@/views/statistics/submit-statistics.vue'),
            meta: {
              navIndex: '/list',
              subNavIndex: 'submit-statistics',
              title: '回收情况',
              hasSubNav: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/view/:id',
    name: 'view',
    component: () => import('@/views/view/view.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
