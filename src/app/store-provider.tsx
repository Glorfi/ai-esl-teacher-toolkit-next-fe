'use client';
// import store, { AppStore, makeStore } from '@/store/store';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import store from './lib/store/store';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const storeRef = useRef<AppStore>();
  // if (!storeRef.current) {
  //   // Create the store instance the first time this renders
  //   storeRef.current = makeStore();
  // }

  return <Provider store={store}>{children}</Provider>;
}
