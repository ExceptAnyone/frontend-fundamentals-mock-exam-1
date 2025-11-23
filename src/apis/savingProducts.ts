import { http, isHttpError } from 'tosslib';
import { SavingsProduct } from 'types/response';
import { API_ENDPOINTS } from 'constants/api';

export const getSavingsProducts = async () => {
  try {
    const response = await http.get<SavingsProduct[]>(API_ENDPOINTS.SAVINGS_PRODUCTS);
    return response;
  } catch (error) {
    if (isHttpError(error)) {
      throw new Error('적금 상품을 불러오는 데 실패했어요.');
    }
    throw error;
  }
};
