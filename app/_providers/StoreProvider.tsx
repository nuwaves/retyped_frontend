'use client'

import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { makeStore, AppStore } from '@/app/_store/store'

declare global {
  interface Window {
    __REDUX_STORE__?: AppStore
  }
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  const persistorRef = useRef<any>()

  if (!storeRef.current) {
    if (typeof window !== 'undefined') {
      if (!window.__REDUX_STORE__) {
        window.__REDUX_STORE__ = makeStore()
      }
      storeRef.current = window.__REDUX_STORE__
    } else {
      storeRef.current = makeStore()
    }
  }

  useEffect(() => {
    if (storeRef.current && !persistorRef.current) {
      persistorRef.current = persistStore(storeRef.current)
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}