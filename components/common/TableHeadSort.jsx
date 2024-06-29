import _ from 'lodash'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

function isDateTime(dateString) {
  // Attempt to create a Date object from the string
  const date = new Date(dateString);

  // eslint-disable-next-line no-restricted-globals
  return !isNaN(date.getTime()) && dateString.trim() !== '';
}
function descendingComparator(a, b, orderBy) {
  const valueA = _.get(a, orderBy);
  const valueB = _.get(b, orderBy);
  if (typeof valueA === 'string' && typeof valueB === 'string' && !isDateTime(valueA)) {
    return valueA.localeCompare(valueB, 'en')
  }
  if (valueA === undefined || valueA === null) {
    return 1; // Treat undefined or null values as greater than other values
  }

  if (valueB === undefined || valueB === null) {
    return -1; // Treat undefined or null values as less than other values
  }
  if (valueA < valueB) {
    return -1;
  }

  if (valueA > valueB) {
    return 1;
  }

  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => -descendingComparator(a, b, orderBy)
    : (a, b) => descendingComparator(a, b, orderBy)
}

function TableHeadSortable({ order, orderBy, onRequestSort, headCells }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (headCell.diabledSort ? (
          <TableCell key={`${headCell.id}-label`}>
            {headCell.label}
          </TableCell>
        ) : (
          <TableCell
            key={`${headCell.id}-lebel`}
            align={headCell.alignment || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )))}
      </TableRow>
    </TableHead>
  )
}
TableHeadSortable.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: PropTypes.array.isRequired,
}

export default TableHeadSortable
