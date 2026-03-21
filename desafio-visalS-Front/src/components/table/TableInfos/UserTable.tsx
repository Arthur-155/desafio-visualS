import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserTablePagination from './UserTablePagination';
import TableHead from '@mui/material/TableHead';
import { Box } from '@mui/material';
import './userTable.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

function createData(selected: boolean, name: string, email: string, cellPhone: string, city: string, id?: number) {
  return { selected, name, email, cellPhone, city };
}

//setando o checkbox
const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };



export default function UserTable() {

  const [rows, setRows] = React.useState([
    {
      selected: false,
      name: 'Arthur',
      email: 'arthur.bergamo@db1.com.br',
      cellPhone: '(44)99840-3304',
      city: 'Maringá'
    }
  ])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelect = rows.some(user => user.selected);

  return (
    <Box className='containerTable'>
      <Stack spacing={2} direction="row-reverse" width={"48%"}>
        <Button variant="contained">Adicionar Usuário</Button>
        <Button variant="text" color='error' className={isSelect ? 'showButton' : 'hiddenButton'}>Deletar Usuário</Button>
        <Button variant="outlined" className={isSelect ? 'showButton' : 'hiddenButton'}>Editar Usuário</Button>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{ width: 900 }}
      >
        <Table>
          <TableHead>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Nome</TableCell>
            <TableCell align="center">E-mail</TableCell>
            <TableCell align="center">Telefone</TableCell>
            <TableCell align="center">Cidade</TableCell>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={row.name}>
                <TableCell><Checkbox {...label} checked={row.selected} onChange={(e) => {
                  const newRows = [...rows];
                  newRows[index].selected = e.target.checked;
                  setRows(newRows);
                }} /></TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.cellPhone}</TableCell>
                <TableCell align="center">{row.city}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={UserTablePagination}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer >
    </Box >
  );
}