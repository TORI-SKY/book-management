"use client"
import React, { useState, useEffect } from "react";

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
      .from('books')
      .delete()
      .eq('id', id),
      { showMessage: true }
    )
    setBooks(books.filter(x => x.id !== id))
  }

  const headCells = [
		// {
    //   id: 'cover',
    //   label: 'Cover',
    // },
    {
      id: 'title',
      label: 'Title',
    },
		{
      id: 'grade',
      label: 'Grade',
    },
		{
      id: 'author',
      label: 'Author',
    },
		{
      id: 'publisher',
      label: 'Publisher',
    },
    {
      id: 'empty',
      diabledSort: true,
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
       const data = await supabaseActionWrapper(
        () => supabase
        .from('books')
        .select("*"),
      )
      console.log(data)
      setBooks(data || [])
    }
    fetchData()
  }, [])
	return (
		<div>
			<Stack direction="row" spacing={2} justifyContent="space-between">
        <div className="text-primary font-bold text-2xl">Books</div>
        <AddDialog books={books} setBooks={setBooks}/>
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
                      <TableRow key={row.id}>
                        {/* <TableCell component="th" scope="row">
                          {row.cover}
                        </TableCell> */}
												<TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
												<TableCell component="th" scope="row">
                          {row.grade}
                        </TableCell>
												<TableCell component="th" scope="row">
                          {row.author}
                        </TableCell>
												<TableCell component="th" scope="row">
                          {row.publisher}
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
