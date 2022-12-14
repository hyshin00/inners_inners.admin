// import { adapter } from '@/utils';
import { request } from '../../request';

// export function adapterOfFetchWebUserList(data: ApiManagement.MobileRssi[] | null): Management.MobileRssi[] {
//   if (!data) return [];
//   return data.map(item => {
//     const dt: Management.MobileRssi = {
//       ...item
//     };

//     return dt;
//   });
// }

export const getList = async () => {
  const data = await request.get<Management.MobileRssi[] | null>('/Management/MobileRssi');
  return data;
};
export const deleteData = async (id: number) => {
  const data = await request.delete(`/Management/MobileRssi?id=${id}`);
  return data;
};
export const saveData = async (data: Management.MobileRssi) => {
  let response = null;

  if (data.type === 'edit') response = await request.put('/Management/MobileRssi', data);
  else response = await request.post('/Management/MobileRssi', data);

  return response;
};
// export const saveData = async (webUser: Management.MobileRssi) => {
//   let data = null;

//   if (webUser.type === 'edit') data = await request.put('/WebUser', webUser);
//   else data = await request.post('/WebUser', webUser);
//   return adapter(adapterOfSaveWebUser, data);
// };

// export const deleteWebUser = async (id: number) => {
//   const data = await request.delete(`/WebUser?id=${id}`);
//   return adapter(adapterOfDeleteWebUser, data);
// };
