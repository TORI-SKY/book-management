'use client';

import ToastContext from '@/lib/context/toastContext'
import useToastStore from '@/lib/store/ToastStore'

export function Providers({ children }) {
  const { state, dispatch } = useToastStore()
  return (
    <>
      <ToastContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {children}
      </ToastContext.Provider>
    </>
  );
}