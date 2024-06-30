"use client"
import React, { useState, useEffect } from 'react'
import Add from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { useSupabaseWrapper } from '@/app/hook/useSupabaseWrapper'
import { supabaseBrowser } from "@/lib/supabase/browser";
import CalendarPIcker from "@/components/CalendarPicker";



export default function AddDialog({ refresh }) {

  const { supabaseActionWrapper } = useSupabaseWrapper()
  const supabase = supabaseBrowser();
  const [quantity, setQuantity] = useState(0)

  const [stockAction, setStockAction] = useState("STOCK_IN")
  const [location, setLocation] = useState("")

  const [actionDate, setActionDate] = useState()
  const [stockBooks, setStockBooks] = useState([])
  const [selectedStockBook, setSelectedStockBook] = useState('')


  const [OpenDialog, setOpenDialog] = useState(false)
  const handleCloseDialog = () => {
    setStockAction('')
    setLocation('')
    setActionDate('')
    setSelectedStockBook('')
    setOpenDialog(false)
  }

  const createBook = async (e) => {
    e.preventDefault()
    const newBook = await supabaseActionWrapper(
      () => supabase
      .from('stock_action')
      .insert([
        { quantity, action_type: stockAction, action_date: actionDate, stock_book_id: selectedStockBook.id },
      ])
      .select()
    )
    refresh()
    setOpenDialog(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await supabaseActionWrapper(
        () => supabase.from('book_stocks').select(`
          id,
          quantity,
          initial_stock,
          books (
            id,
            title
          )
        `)
      )
      setStockBooks(res)
    }
    fetchData()
  }, [])
  return (
    <>
      <Button
          // startIcon={<Add />}
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Stock IN/OUT
        </Button>
        <Dialog
          open={OpenDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth={true}
        >
          <form onSubmit={createBook}>
            <DialogTitle>Stock In/Stock Out</DialogTitle>
            <DialogContent>
              <Stack direction={'column'} spacing={2}>
                <Select
                  labelId="action-select-label"
                  id="action-simple-select"
                  value={stockAction}
                  label="Stock Action"
                  onChange={(e) => setStockAction(e.target.value)}
                >
                  <MenuItem value={"STOCK_IN"} >Stock In</MenuItem>
                  <MenuItem value={"STOCK_OUT"}>Stock Out</MenuItem>
                </Select>
                {stockAction === 'STOCK_OUT' && (
                  <Select
                    labelId="select-location-label"
                    id="select-location-select"
                    value={location}
                    label="Location"
                    placeholder="Location"
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <MenuItem value={"WESTLAND"} >Westland</MenuItem>
                    <MenuItem value={"goLink"}>Go Link</MenuItem>
                    <MenuItem value={"WESTBIRDGE"}>Westbridge</MenuItem>
                    <MenuItem value={"VIENNAM"}>Vietnam</MenuItem>
                  </Select>
                )}
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
                  value={selectedStockBook}
                  inputProps={{
                    required: true
                  }}
                  options={stockBooks.sort((a, b) => {
                    const nameB =
                      b?.books?.grade
                    const nameA =
                      a?.books?.grade
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
                    setSelectedStockBook(newValue)
                  }}
                  groupBy={(option) => option?.books?.grade}
                  getOptionLabel={(option) => {
                    return option?.books?.title || ''
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Book Stock" required />
                  )}
                />
                <CalendarPIcker date={actionDate} setDate={setActionDate}/>
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
