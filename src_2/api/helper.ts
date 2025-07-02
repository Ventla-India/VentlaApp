// login.js

import {apiClient, apiClientUpload} from './api';
import {
  BASE_URL,
  POST_METHOD,
  LOGIN,
  GET_INFORMATION,
  GET_METHOD,
} from './urls.ts';

export const login = payload => {
  return apiClient({
    baseURL: BASE_URL,
    method: POST_METHOD,
    url: LOGIN,
    data: payload,
  });
};

export const getInformation = payload => {
  return apiClient({
    baseURL: BASE_URL,
    method: GET_METHOD,
    url: GET_INFORMATION,
  });
};

export const getCustomCategories = () => {
  return apiClient({
    baseURL: BASE_URL,
    method: GET_METHOD,
    url: `${GET_INFORMATION}?auth=MzimX%2fZzu8qMs5QJQUrAWGDK%2fteOosomAW9inoG4rBoG8ggA3QhvPOtBoySSCnwFsvO7sq3mORQ%3d`,
    headers: {
      Cookie: 'ARRAffinity=eb4e4208d6ebb5f793a4332b4a64a855c7544fade2d5147c6f12f156b3f54f61; ARRAffinitySameSite=eb4e4208d6ebb5f793a4332b4a64a855c7544fade2d5147c6f12f156b3f54f61',
    },
  });
};