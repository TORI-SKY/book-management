"use client"
import React, { useState, useEffect } from 'react'
import Add from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { useSupabaseWrapper } from '@/app/hook/useSupabaseWrapper'
import { supabaseBrowser } from "@/lib/supabase/browser";
import CalendarPIcker from "@/components/CalendarPicker";


export default function AddDialog({ books, setBooks }) {

  const { supabaseActionWrapper } = useSupabaseWrapper()
  const supabase = supabaseBrowser();
  const [bookList, setBookList] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [assignedBook, setAssignedBook] = useState(null)
  const [school, setSchool] = useState('')
  const [orderDate, setOrderDate] = useState()
  const [paymentDate, setPaymentDate] = useState()
  const [deliveredDate, setDeliveredDate] = useState()


  const [OpenDialog, setOpenDialog] = useState(false)
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const createPurchaseOrder = async (e) => {
    e.preventDefault()
    const newBook = await supabaseActionWrapper(
      () => supabase
      .from('purchase_order')
      .insert([
        { book_id: assignedBook.id, quantity, school, order_date: orderDate, payment_date: paymentDate, delivered_date: deliveredDate },
      ])
      .select()
    )
    // setBooks([...books, newBook])
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
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Add Purchase
        </Button>
        <Dialog
          open={OpenDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth={true}
        >
          <form onSubmit={createPurchaseOrder}>
            <DialogTitle>Add Purchase</DialogTitle>
            <DialogContent>
              <Stack direction={'column'} spacing={2}>
                <Select
                  labelId="select-location-label"
                  id="select-location-select"
                  value={school}
                  label="Location"
                  placeholder="Location"
                  onChange={(e) => setSchool(e.target.value)}
                >
                  <MenuItem value={"WESTLAND"} >Westland</MenuItem>
                  <MenuItem value={"goLink"}>Go Link</MenuItem>
                  <MenuItem value={"WESTBIRDGE"}>Westbridge</MenuItem>
                  <MenuItem value={"VIENNAM"}>Vietnam</MenuItem>
                </Select>
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
                <TextField
                  id="quantity"
                  label="Stock"
                  type="number"
                  value={quantity}
                  fullWidth
                  required
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <h1>Order Date</h1>
                <CalendarPIcker date={orderDate} setDate={setOrderDate}/>
                <h1>Delivery Date</h1>
                <CalendarPIcker date={deliveredDate} setDate={setDeliveredDate}/>
                <h1>Payment Date</h1>
                <CalendarPIcker date={paymentDate} setDate={setPaymentDate}/>
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
