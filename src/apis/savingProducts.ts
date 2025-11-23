import { http, isHttpError } from 'tosslib';
import { SavingsProduct } from 'types/response';

export const getSavingsProducts = async () => {
  try {
    const response = await http.get<SavingsProduct[]>('/api/savings-products');
    return response;
  } catch (error) {
    if (isHttpError(error)) {
      console.error(error.status, error.data);
    }
    throw error;
  }
};
