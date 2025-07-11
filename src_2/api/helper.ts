// login.js

import { apiClient, apiClientUpload } from './api';
import {
  BASE_URL,
  POST_METHOD,
  USER_DETAIL,
} from './urls.ts';


export const userDetail = (authToken: string) => {
  return apiClient({
    baseURL: BASE_URL,
    method: POST_METHOD,
    url: `${USER_DETAIL}?auth=${authToken}`,
    headers: {
      Cookie: 'ARRAffinity=eb4e4208d6ebb5f793a4332b4a64a855c7544fade2d5147c6f12f156b3f54f61; ARRAffinitySameSite=eb4e4208d6ebb5f793a4332b4a64a855c7544fade2d5147c6f12f156b3f54f61',
    },
  });
}