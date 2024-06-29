"use client"
import React from 'react'

const initialState = {
  toastMessage: {
    type: 'info',
    message: '',
  },
}

export const ACTIONS = {
  setToastMessage: 'SET_TOAST_MESSAGE',
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.setToastMessage:
      return {
        ...state,
        toastMessage: action.payload,
      }
    default:
      return state
  }
}

function useToastStore() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return {
    state,
    dispatch,
  }
}

export default useToastStore
