import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux'; 
import { configureStore } from '@reduxjs/toolkit'; 
import cookiesReducer from './cokiesReducer';
import sliceReducer from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  sliceReducer,
  cookies: cookiesReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cookies'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;