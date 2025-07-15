// login.js

import { apiClient, apiClientUpload } from './api.ts';
import {
  BASE_URL,
  POST_METHOD,
  INFO_DATA,
} from './urls.ts';


export const infoData = (authToken: string) => {
  return apiClient({
    baseURL: BASE_URL,
    method: POST_METHOD,
    url: `${INFO_DATA}?auth=${authToken}`,
    headers: {
      Cookie: 'ARRAffinity=eb4e4208d6ebb5f793a4332b4a64a855c7544fade2d5147c6f12f156b3f54f61; ARRAffinitySameSite=eb4e4208d6ebb5f793a4332b4a64a855c7544fade2d5147c6f12f156b3f54f61',
    },
  });
}