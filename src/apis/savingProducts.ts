import { http, isHttpError } from 'tosslib';
import { SavingsProduct } from 'types/response';
import { API_ENDPOINTS } from 'constants/api';

export const getSavingsProducts = async () => {
  try {
    const response = await http.get<SavingsProduct[]>(API_ENDPOINTS.SAVINGS_PRODUCTS);
    return response;
  } catch (error) {
    if (isHttpError(error)) {
      console.error(error.status, error.data);
    }
    throw error;
  }
};
