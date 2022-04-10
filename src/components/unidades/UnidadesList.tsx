import React, { useEffect, useState } from "react";
// import { makeStyles } from '@material-ui/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';

import ButtonGroup from '@mui/material/ButtonGroup';
import Link from 'next/link'
import { useRouter } from 'next/router'

// const useStyles = makeStyles((theme: any) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
//   container: {
//     marginTop: theme.spacing(2),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     color: theme.palette.text.secondary,
//   },
// }));

interface User {
  id: number,
  fname: string,
  lname: string,
  username: string,
  avatar: string
}
export default function UnidadesList() {
  // const classes = useStyles();
  const router = useRouter()
  const initialUsers: User[] = []
  const [users, setUsers] = useState(initialUsers);
  useEffect(() => {
    UsersGet()
  }, [])

  const UsersGet = () => {
    fetch("https://www.mecallapi.com/api/users")
      .then(res => res.json())
      .then(
        (result: User[]) => {
          setUsers(result)
        }
      )
  }

  const UpdateUser = (id: number) => {

    router.push('/unidades/' + id)
   // window.location = '/update/' + id
  }

  const UserDelete = (id: number) => {
    var data = {
      'id': id
    }
    fetch('https://www.mecallapi.com/api/users/delete', {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(
        (result) => {
          alert(result['message'])
          if (result['status'] === 'ok') {
            UsersGet();
          }
        }
      )
  }

  return (
    <div >
      <Container maxWidth="lg" >

        <Box display="flex" sx={{pb: 1}}>
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                USERS
              </Typography>
            </Box>
            <Box>
            <Link href="/unidades/create" passHref>
                <Button variant="contained" color="primary">
                  Adicionar
                </Button>
              </Link>
            <Button variant="contained" sx={{ml: 1}} color="success">
              Exportar
            </Button>
            </Box>
          </Box>
        <TableContainer component={Paper} sx={{ maxHeight: '72vh' }}>
          <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="left">First</TableCell>
                  <TableCell align="left">Last</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="right">{user.id}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center">
                        <Avatar src={user.avatar} />
                      </Box>
                    </TableCell>
                    <TableCell align="left">{user.fname}</TableCell>
                    <TableCell align="left">{user.lname}</TableCell>
                    <TableCell align="left">{user.username}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button onClick={() => UpdateUser(user.id)}>Edit</Button>
                        <Button onClick={() => UserDelete(user.id)}>Del</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Container>
    </div>

  );
}
