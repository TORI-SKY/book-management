"use client"
import React from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import ToastContext from '@/lib/context/toastContext'
import { ACTIONS } from '@/lib/store/ToastStore'

function ToastMessage() {
  const { state, dispatch } = React.useContext(ToastContext)
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={state.toastMessage.message !== ''}
      autoHideDuration={3000}
      onClose={() =>
        dispatch({
          type: ACTIONS.setToastMessage,
          payload: { message: '' },
        })
      }
    >
      <Alert severity={state.toastMessage.type} sx={{ width: '100%' }}>
        {state.toastMessage.message}
      </Alert>
    </Snackbar>
  )
}

export default ToastMessage
