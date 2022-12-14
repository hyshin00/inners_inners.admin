import { adapter } from '@/utils';
import { request, mockRequest } from '../request';
import {
  adapterOfFetchUserList,
  adapterOfFetchWebUserList,
  adapterOfSaveWebUser,
  adapterOfDeleteWebUser
} from './management.adapter';
/** 사용자 목록을 얻으십시오 */
export const fetchUserList = async () => {
  const data = await mockRequest.post<ApiUserManagement.User[] | null>('/getAllUserList');
  return adapter(adapterOfFetchUserList, data);
};

export const fetchWebUserList = async () => {
  const data = await request.post<ApiUserManagement.WebUser[] | null>('/WebUser/GetAllWebUserList');
  return adapter(adapterOfFetchWebUserList, data);
};

export const saveWebUser = async (webUser: ApiUserManagement.WebUser) => {
  let data = null;

  if (webUser.type === 'edit') data = await request.put('/WebUser', webUser);
  else data = await request.post('/WebUser', webUser);
  return adapter(adapterOfSaveWebUser, data);
};

export const deleteWebUser = async (id: number) => {
  const data = await request.delete(`/WebUser?id=${id}`);
  return adapter(adapterOfDeleteWebUser, data);
};
