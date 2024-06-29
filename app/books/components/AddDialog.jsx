"use client"
import React, { useState } from 'react'
import Add from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { useSupabaseWrapper } from '@/app/hook/useSupabaseWrapper'
import { supabaseBrowser } from "@/lib/supabase/browser";


export default function AddDialog({ books, setBooks }) {

  const { supabaseActionWrapper } = useSupabaseWrapper()
  const supabase = supabaseBrowser();

  const [title, setTitle] = useState('')
  const [grade, setGrade] = useState('')
  const [author, setAuthor] = useState('')
  const [publisher, setPublisher] = useState('')

  const [OpenDialog, setOpenDialog] = useState(false)
  const handleCloseDialog = () => {
    setTitle('')
    setOpenDialog(false)
  }

  const createBook = async () => {
    const newBook = await supabaseActionWrapper(
      () => supabase
      .from('books')
      .insert([
        { title, grade, author, publisher },
      ])
      .select()
    )
    setBooks([...books, newBook])
  }
  return (
    <>
      <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Add Book
        </Button>
        <Dialog
          open={OpenDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth={true}
        >
          <form onSubmit={createBook}>
            <DialogTitle>Add Book</DialogTitle>
            <DialogContent>
              <Stack direction={'column'} spacing={2}>
                <TextField
                  autoFocus
                  id="title"
                  label="Book Title"
                  type="title"
                  value={title}
                  fullWidth
                  variant="outlined"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  autoFocus
                  id="grade"
                  label="Grade"
                  type="grade"
                  value={grade}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setGrade(e.target.value)}
                />
                <TextField
                  autoFocus
                  id="author"
                  label="Book Author"
                  type="author"
                  value={author}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField
                  autoFocus
                  id="publisher"
                  label="Book Publisher"
                  type="publisher"
                  value={publisher}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setPublisher(e.target.value)}
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
