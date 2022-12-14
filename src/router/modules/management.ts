const management: AuthRoute.Route = {
  name: 'management',
  path: '/management',
  component: 'basic',
  children: [
    {
      name: 'management_auth',
      path: '/management/auth',
      component: 'self',
      meta: {
        title: '权限管理',
        requiresAuth: true,
        icon: 'ic:baseline-security'
      }
    },
    {
      name: 'management_role',
      path: '/management/role',
      component: 'self',
      meta: {
        title: '角色管理',
        requiresAuth: true,
        icon: 'carbon:user-role'
      }
    },
    {
      name: 'management_user',
      path: '/management/user',
      component: 'self',
      meta: {
        title: '사용자 관리',
        requiresAuth: true,
        icon: 'ic:round-manage-accounts'
      }
    },
    {
      name: 'management_webuser',
      path: '/management/webuser',
      component: 'self',
      meta: {
        title: '웹사용자 관리',
        requiresAuth: true,
        icon: 'ic:round-manage-accounts'
      }
    },
    {
      name: 'management_route',
      path: '/management/route',
      component: 'self',
      meta: {
        title: '라우팅 관리',
        requiresAuth: true,
        icon: 'material-symbols:route'
      }
    }
  ],
  meta: {
    title: '시스템 관리',
    icon: 'carbon:cloud-service-management',
    order: 9
  }
};

export default management;
