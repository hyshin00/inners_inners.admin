export function adapterOfFetchUserList(data: ApiUserManagement.User[] | null): UserManagement.User[] {
  if (!data) return [];

  return data.map((item, index) => {
    const user: UserManagement.User = {
      index: index + 1,
      key: item.id,
      ...item
    };

    return user;
  });
}

export function adapterOfFetchWebUserList(data: ApiUserManagement.WebUser[] | null): UserManagement.WebUser[] {
  if (!data) return [];
  return data.map(item => {
    const user: UserManagement.WebUser = {
      // index: index + 1,
      index: item.id,
      key: item.username,
      ...item
    };

    return user;
  });
}

export function adapterOfSaveWebUser(data: any) {
  console.log('adapterOfSaveWebUser', data);
  // if (!data) return [];
  // return data.map(item => {
  //   const user: UserManagement.WebUser = {
  //     // index: index + 1,
  //     index: item.id,
  //     key: item.username,
  //     ...item
  //   };

  //   return user;
  // });
}

export function adapterOfDeleteWebUser(data: any) {
  console.log('adapterOfDeleteWebUser', data);
  // if (!data) return [];
  // return data.map(item => {
  //   const user: UserManagement.WebUser = {
  //     // index: index + 1,
  //     index: item.id,
  //     key: item.username,
  //     ...item
  //   };

  //   return user;
  // });
}
