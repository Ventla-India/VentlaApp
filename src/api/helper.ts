// login.js

import { apiClient, apiClientUpload } from './api.ts';
import {
  BASE_URL,
  POST_METHOD,
} from './urls.ts';
import { ENDPOINTS } from './urls';


export const containerappbycode = (appCode: string) => {
  return apiClient({
    baseURL: BASE_URL,
    method: POST_METHOD,
    url: `${ENDPOINTS.CONTAINER_APP_CODE}?code=${appCode}`
    
  });
}
export const infoData = (authToken: string) => {
  return apiClient({
    baseURL: BASE_URL,
    method: POST_METHOD,
    url: `${ENDPOINTS.INFO_DATA}?auth=${authToken}`
    
  });
}