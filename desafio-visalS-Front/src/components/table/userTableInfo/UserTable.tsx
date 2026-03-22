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
import type { User } from '../user/User';
import { findAll, deleteById } from '../userService/userService';
import { useNavigate } from 'react-router-dom';
import logoVisualSoftware from '../../../assets/teste.png'
import Typography from '@mui/material/Typography';


//setando o checkbox
const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };


export default function UserTable() {

  //=================================================================
  //                    setando os estados
  const [rows, setRows] = React.useState<User[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //=================================================================
  //      Função para carregar os usuários, baseado no GET do backend

  React.useEffect(() => {
    async function loadUsers() {
      try {
        const users = await findAll();
        setRows(users);
      } catch (error) {
        throw new Error("Houve algum problema ao puxar usuários do backend!")
      }
    }
    loadUsers();
  }, []);

  //=================================================================
  //                         deleteById

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  //=================================================================
  //                         deleteById

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //=================================================================
  // método para conseguir identificar a linha selecionada(checkbox)

  const handleSelectedRow = (id: number | undefined, checked: boolean) => {
    const newRows = rows.map((users) => users.id === id ? {
      ...users, selected: checked
    } : users);

    setRows(newRows);
  }

  //=================================================================
  //                         deleteById

  const handleDeleteSelected = async () => {
    try {
      const selectedUsers = rows.filter((user) => user.selected);

      for (const user of selectedUsers) {
        if (user.id != null) {
          await deleteById(user.id);
        }
      }
      const updatedTable = await findAll();
      setRows(updatedTable);
    } catch (error) {
      throw new Error("Houve erro ao deletar um usuário!")
    }
  }

  //=================================================================
  //                         deleteById

  const paginatedRows = rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows;

  //=================================================================
  //                         deleteById

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //=================================================================
  //                         deleteById

  const isSelect = rows.some(user => user.selected);

  //=================================================================
  //                         deleteById

  const selectedUser = rows.find((user) => user.selected);

  const navigate = useNavigate();

  return (
    <Box className='containerTable'>
      <img src={logoVisualSoftware} alt="Logo Visual Software" style={{width: '100%',maxWidth: '220px',height: 'auto'}}/>
      <Typography variant="h5" gutterBottom>
        Usuários Registrados
      </Typography>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row-reverse' }}sx={{width: '100%',maxWidth: 1100}}>
        <Button variant="contained" onClick={() => navigate('/register')}>Adicionar Usuário</Button>
        <Button variant="text" color="error" className={isSelect ? 'showButton' : 'hiddenButton'} onClick={handleDeleteSelected}>Deletar Usuário</Button>
        <Button variant="outlined" className={isSelect ? 'showButton' : 'hiddenButton'} onClick={() => {
          if (selectedUser?.id != null) {
            navigate('/Edit', { state: { id: selectedUser.id } });
          }
        }}>Editar Usuário</Button>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          maxWidth: 1100,
          overflowX: 'auto'
        }}
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
            {paginatedRows.map((row) => (
              <TableRow key={row.id ?? row.email}>
                <TableCell>
                  <Checkbox
                    {...label}
                    checked={row.selected}
                    onChange={(e) => handleSelectedRow(row.id, e.target.checked)}
                  />
                </TableCell>
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