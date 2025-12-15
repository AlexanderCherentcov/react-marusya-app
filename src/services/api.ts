import { Api } from '@/api/Api';

// Базовый URL
export const apiClient = new Api({
  baseUrl: 'https://cinemaguide.skillbox.cc',
  baseApiParams: {
    credentials: 'include',
  },
});
