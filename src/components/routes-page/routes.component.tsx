import * as React from 'react';
import {FC} from 'react';
import './routes.styles.css'
import { Grid, Paper, Button,AppBar,Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Logo from '../images/bamx-oficial.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  id: number,
  ruta: string,
) {
  return {id, ruta};
}

const rows = [
  createData(1, 'Frozen yoghurt'),
  createData(2, 'Frozen yoghurt'),
  createData(3, 'Frozen yoghurt'),
  createData(4, 'Frozen yoghurt'),
  createData(5, 'Frozen yoghurt'),
  createData(6, 'Frozen yoghurt'),
  createData(7, 'Frozen yoghurt'),
  createData(8, 'Frozen yoghurt'),
  createData(9, 'Frozen yoghurt'),
  createData(10, 'Frozen yoghurt'),
  createData(11, 'Frozen yoghurt'),
  createData(11, 'Frozen yoghurt'),
  createData(12, 'Frozen yoghurt'),
  createData(13, 'Frozen yoghurt'),

];

export const RoutesComponent: FC = (): JSX.Element => {
    const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
    return(
        <Grid container>
            <AppBar position="static" style={{background: '#F9F6FB', height: '25vh'} }>
                <Toolbar>
                    <Grid container xs={3} sm={3} md = {3} lg = {2}>
                        <img src = {Logo} width='100%'/> 
                    </Grid>

                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} color='#FF9300' align='center'>
                        Coordinador
                    </Typography>
                    <Button style = {{color: '#542463'}} size="medium">Cerrar sesión <ExitToAppIcon/></Button>
                </Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color='#000' align='center' id='title'>
                        RUTAS
                </Typography>
            </AppBar>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow >
                            <StyledTableCell id='encabezado'>ID RUTA</StyledTableCell>
                            <StyledTableCell align="center" id='encabezado'>Descripción</StyledTableCell>
                            <StyledTableCell align="center" id='encabezado'></StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row" >
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.ruta}</StyledTableCell>
                            <StyledTableCell align="center">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value='{age}'
                                label="Age"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </StyledTableCell>
                            </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}