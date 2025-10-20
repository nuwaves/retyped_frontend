import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import uiReducer from './features/ui/uiSlice'
import authReducer from './features/auth/authSlice'
import podcastsReducer from './features/podcasts/podcastsSlice'
import episodesReducer from './features/episodes/episodesSlice'
import infiniteScrollReducer from './features/infiniteScroll/infiniteScrollSlice'
import bookmarksReducer from './features/bookmarks/bookmarksSlice'
import followsReducer from './features/follows/followsSlice'
import audioPlayerReducer from './features/audioPlayer/audioPlayerSlice'
import podcastClaimsReducer from './features/podcastClaims/podcastClaimsSlice'
import { clientApi } from './services/clientApi'

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: unknown) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
  }
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

const audioPlayerPersistConfig = {
  key: 'audioPlayer',
  storage,
  whitelist: ['currentEpisode', 'isVisible', 'isPlaying', 'currentTime', 'volume']
}

const persistedAudioPlayerReducer = persistReducer(audioPlayerPersistConfig, audioPlayerReducer)

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
      audioPlayer: persistedAudioPlayerReducer,
      podcastClaims: podcastClaimsReducer,
      [clientApi.reducerPath]: clientApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(clientApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']