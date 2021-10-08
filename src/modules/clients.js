import HttpService from '../services/HttpService';
import { ENDPOINTS } from '../constants';

export const getClients = async () => {
  const ax = HttpService.getAxiosClient();
  return ax
    .get(ENDPOINTS.CLIENTS())
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {});
};
