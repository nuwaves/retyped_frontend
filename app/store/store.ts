import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './features/ui/uiSlice'
import authReducer from './features/auth/authSlice'
import podcastsReducer from './features/podcasts/podcastsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      auth: authReducer,
      podcasts: podcastsReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']