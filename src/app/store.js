import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '@/features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import usersReducer from '../features/users/usersSlice'
import apiSlice from './api/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    counter: counterReducer,
    user: userReducer,
    users: usersReducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;