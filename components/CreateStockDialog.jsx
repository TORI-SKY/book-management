"use client"
import React, { useEffect, useState } from 'react'
import Add from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import { useSupabaseWrapper } from '@/app/hook/useSupabaseWrapper'
import { supabaseBrowser } from "@/lib/supabase/browser";


export default function AddDialog({ refresh }) {

  const { supabaseActionWrapper } = useSupabaseWrapper()
  const supabase = supabaseBrowser();

  const [bookList, setBookList] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [assignedBook, setAssignedBook] = useState(null)

  const [OpenDialog, setOpenDialog] = useState(false)
  const handleCloseDialog = () => {
    setQuantity(0)
    setAssignedBook(null)
    setOpenDialog(false)
  }


  const createBook = async (e) => {
    e.preventDefault()
    await supabaseActionWrapper(
      () => supabase
      .from('book_stocks')
      .insert([
        { book_id: assignedBook?.id, quantity, initial_stock: quantity },
      ])
      .select()
    )
    refresh()
    setOpenDialog(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await supabaseActionWrapper(
        () => supabase.from('books').select('*')
      )
      setBookList(res)
    }
    fetchData()
  }, [])
  return (
    <>
      <Button
          startIcon={<Add />}
          variant="outlined"
          onClick={() => setOpenDialog(true)}
        >
          Create Stock
        </Button>
        <Dialog
          open={OpenDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth={true}
        >
          <form onSubmit={createBook}>
            <DialogTitle>Create Book Stocks</DialogTitle>
            <DialogContent>
              <Stack direction={'column'} spacing={2}>
                <TextField
                  id="quantity"
                  label="Stock"
                  type="number"
                  value={quantity}
                  fullWidth
                  required
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Autocomplete
                  value={assignedBook}
                  inputProps={{
                    required: true
                  }}
                  options={bookList.sort((a, b) => {
                    const nameB =
                      b.grade.toUpperCase()
                    const nameA =
                      a.grade.toUpperCase()
                    if (nameA < nameB) {
                      return -1
                    }
                    if (nameA > nameB) {
                      return 1
                    }
                    return 0
                  })}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, newValue) => {
                    setAssignedBook(newValue)
                  }}
                  groupBy={(option) => option.grade}
                  getOptionLabel={(option) => {
                    return option?.title || ''
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Books" required />
                  )}
                />
                
              </Stack>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button  type="submit">Create</Button>
            </DialogActions>
          </form>
        </Dialog>
    </>
  )
}
