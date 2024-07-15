"use client"
import React, { useState, useEffect } from "react";
import * as moment from 'moment'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import TableHeadSortable, { getComparator } from '@/components/common/TableHeadSort'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import AddDialog from './components/AddDialog'


import { supabaseBrowser } from "@/lib/supabase/browser";
import { useSupabaseWrapper } from '@/app/hook/useSupabaseWrapper'


export default function Page() {
  const { supabaseActionWrapper } = useSupabaseWrapper()
  const supabase = supabaseBrowser();

  const [books, setBooks] = React.useState([])

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('title')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)

	const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const onDelete = async (id) => {
    await supabaseActionWrapper(
      () => supabase
      .from('purchase_order')
      .delete()
      .eq('id', id),
      { showMessage: true }
    )
    setBooks(books.filter(x => x.id !== id))
  }

  const headCells = [
		{
      id: 'school',
      label: 'School',
    },
    {
      id: 'books.title',
      label: 'Book Title',
    },
		{
      id: 'books.grade',
      label: 'Grade',
    },
    {
      id: 'books.ISBN',
      label: 'ISBN',
    },
    {
      id: 'quantity',
      label: 'Quantity',
    },
    {
      id: 'order_date',
      label: 'Order Date',
    },
    {
      id: 'delivered_date',
      label: 'Delivery Date',
    },
    {
      id: 'payment_date',
      label: 'Payment Date',
    },
    {
      id: 'empty',
      diabledSort: true,
    },
  ]

  const fetchData = async () => {
    const data = await supabaseActionWrapper(
     () => supabase
     .from('purchase_order')
     .select(`
       id,
       quantity,
       order_date,
       delivered_date,
       payment_date,
       school,
       status,
       books (
         id,
         title,
         grade,
         ISBN,
         publisher
       )
     `),
   )
   setBooks(data || [])
 }
  useEffect(() => {
    fetchData()
  }, [])
	return (
		<div>
			<Stack direction="row" spacing={2} justifyContent="space-between">
        <div className="font-bold text-2xl">Purchase Order</div>
        <div className="flex space-x-2">
          <AddDialog books={books} setBooks={setBooks} />
        </div>
      </Stack>
			<Paper>
          <TableContainer>
            <Table>
              <TableHeadSortable
                onRequestSort={handleRequestSort}
                order={order}
                headCells={headCells}
                orderBy={orderBy}
              />
              <TableBody>
                {books.length > 0 ? (
                  books
                    .slice()
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={"purchasepage" + row.id}>
                        <TableCell component="th" scope="row">
                          {row.school}
                        </TableCell>
												<TableCell component="th" scope="row">
                          {row.books.title}
                        </TableCell>
												<TableCell component="th" scope="row">
                          {row.books.grade}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.books.ISBN}
                        </TableCell>
												<TableCell component="th" scope="row">
                          {row.quantity}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.order_date && moment(row.order_date).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.delivered_date && moment(row.delivered_date).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.payment_date && moment(row.payment_date).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell scope="row" align="right">
                          <ConfirmDialog callback={() => onDelete(row.id)} />
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={headCells.length} align="center">
                      No data to show
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <TablePagination
          component="div"
          rowsPerPageOptions={[25, 50]}
          rowsPerPage={rowsPerPage}
          count={books.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
		</div>
	);
}
