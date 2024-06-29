"use client"
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
	TableContainer,
	Paper,
	Table,
	TableBody,
	TableRow,
	TableCell,
  TablePagination
} from '@mui/material'

import TableHeadSortable, { getComparator } from '@/components/common/TableHeadSort'
import ConfirmDialog from '@/components/common/ConfirmDialog'

import { supabaseBrowser } from "@/lib/supabase/browser";
import { useSupabaseWrapper } from '@/app/hook/useSupabaseWrapper'


export default function Page() {
  const { supabaseActionWrapper } = useSupabaseWrapper()
  const [books, setBooks] = React.useState([])
  const supabase = supabaseBrowser();

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
			<div className=" flex justify-between">
				<h1 className=" text-xl">Books</h1>
				<Dialog>
					<DialogTrigger>Add New Book</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Book</DialogTitle>
						</DialogHeader>
						<div>
							<p>form here</p>
						</div>
					</DialogContent>
				</Dialog>
			</div>
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
