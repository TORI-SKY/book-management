"use client"
import { createTheme } from '@mui/material/styles'

import Color from '@/lib/constant/color'

const theme = createTheme({
  palette: {
    primary: {
      main: Color.primary,
    },
    secondary: {
      main: Color.secondary,
    },
  },
})

export default theme
