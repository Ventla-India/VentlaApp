import axios from 'axios';
import store from '../redux/store'
import { setLoading } from '../redux/reducer';
import { ShowToast } from './ToastService';
// import {setLoading} from '../redux/reducer';
// import {ShowToast} from '../utils/ToastService';
// Common axios instance
export const apiClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
  timeoutErrorMessage: 'Request timed out. Please try again.',
});
// Axios instance for uploads
export const apiClientUpload = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 60000, // 60 seconds timeout for uploads
  timeoutErrorMessage: 'Upload timed out. Please try again.',
});
// Request interceptor
apiClient.interceptors.request.use(
  config => {
    const state = store.getState();
    store.dispatch(setLoading(true));
    const token = state?.cookies?.headertoken?.token;
    // console.log(token)
    const isNetworkConnected = state.sliceReducer.isNetworkConnected;
    // if (!isNetworkConnected) {
    //     Alert.alert("Please check your Internet Connection");
    //     store.dispatch(setLoading(false));
    //     return Promise.reject(new Error("No network connection"));
    // }
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  },
);
// Response interceptor
apiClient.interceptors.response.use(
  response => {
    store.dispatch(setLoading(false));
    return response;
  },
  async error => {
    store.dispatch(setLoading(false));
    const {response} = error;
    if (error.code === 'ECONNABORTED') {
      ShowToast('Request timed out. Please try again.');
      return Promise.reject(error);
    }
    if (error.message === 'Network Error') {
      ShowToast(
        'Network error. Please check your internet connection and try again.',
      );
      return Promise.reject(error);
    }
    if (response) {
      console.log('Error Response:', response);
      const errorMessage = response.data?.message || 'An error occurred';
      console.log(errorMessage, 'errorMessage======>');
      ShowToast(errorMessage);
      store.dispatch(setError(errorMessage));
    } else {
      ShowToast('Network error. Please try again.');
    }
    return Promise.reject(error);
  },
);
// Upload request interceptor
apiClientUpload.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state?.cookies?.headertoken?.data?.token;
    console.log('Upload Token:', token); // Log the token for debugging
    store.dispatch(setLoading(true));
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  error => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  },
);