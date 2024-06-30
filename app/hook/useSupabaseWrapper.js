import React from 'react'

import ToastContext from '@/lib/context/toastContext'
import { ACTIONS } from '@/lib/store/ToastStore'

export function useSupabaseWrapper() {
  const { dispatch } = React.useContext(ToastContext)

  function updateToastMessage(message, defaultMessage, errorType="info") {
    dispatch({
      type: ACTIONS.setToastMessage,
      payload: { 
        message: message || defaultMessage,
        type: errorType
      },
    })
  }

  async function supabaseActionWrapper(
    supabaseFunc,
    { successMessage, showMessage } = {},
  ) {
    try {
      const { data, error } = await supabaseFunc()
      if (error) {
        updateToastMessage(error.message, 'Something went wrong!', 'error')

      }
      if (!error && showMessage) {
        updateToastMessage(successMessage, 'Success')
      }
      return data
    } catch (error) {
      updateToastMessage(error.message, 'Something went wrong!')
      return false
    }
  }

  return {
    supabaseActionWrapper,
  }
}
