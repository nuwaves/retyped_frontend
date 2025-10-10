import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './features/ui/uiSlice'
import authReducer from './features/auth/authSlice'
import podcastsReducer from './features/podcasts/podcastsSlice'
import episodesReducer from './features/episodes/episodesSlice'
import infiniteScrollReducer from './features/infiniteScroll/infiniteScrollSlice'
import bookmarksReducer from './features/bookmarks/bookmarksSlice'
import followsReducer from './features/follows/followsSlice'
import audioPlayerReducer from './features/audioPlayer/audioPlayerSlice'
import { clientApi } from './services/clientApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      auth: authReducer,
      podcasts: podcastsReducer,
      episodes: episodesReducer,
      infiniteScroll: infiniteScrollReducer,
      bookmarks: bookmarksReducer,
      follows: followsReducer,
      audioPlayer: audioPlayerReducer,
      [clientApi.reducerPath]: clientApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(clientApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']