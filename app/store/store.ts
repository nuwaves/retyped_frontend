import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './features/ui/uiSlice'
import authReducer from './features/auth/authSlice'
import podcastsReducer from './features/podcasts/podcastsSlice'
import episodesReducer from './features/episodes/episodesSlice'
import { baseApi } from './services/baseApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      auth: authReducer,
      podcasts: podcastsReducer,
      episodes: episodesReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']