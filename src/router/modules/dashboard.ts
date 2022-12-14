const dashboard: AuthRoute.Route = {
  name: 'dashboard',
  path: '/dashboard',
  component: 'basic',
  children: [
    {
      name: 'dashboard_analysis',
      path: '/dashboard/analysis',
      component: 'self',
      meta: {
        title: '분석 페이지',
        requiresAuth: true,
        icon: 'icon-park-outline:analysis'
      }
    },
    {
      name: 'dashboard_workbench',
      path: '/dashboard/workbench',
      component: 'self',
      meta: {
        title: '워크 벤치',
        requiresAuth: true,
        icon: 'icon-park-outline:workbench'
      }
    }
  ],
  meta: {
    title: '대시 보드',
    icon: 'mdi:monitor-dashboard',
    order: 1
  }
};

export default dashboard;
