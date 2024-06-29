"use client"
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { Delete } from '@mui/icons-material'
import { useState } from 'react'

function ConfirmDialog({ callback }) {
  const [open, setopen] = useState(false)
  const handleConfirm = async () => {
    await callback()
    setopen(false)
  }

  const handleClose = () => {
    setopen(false)
  }

  return (
    <>
      <IconButton onClick={() => setopen(true)}>
        <Delete color="primary" fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-primary">
          Are you sure you want to delete this entry?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This instance will be permanently deleted, Please check before confirming
          </DialogContentText>
        </DialogContent>
        <DialogActions className="text-primary">
          <Button variant="outlined" type="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="primary"
            onClick={handleConfirm}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDialog
