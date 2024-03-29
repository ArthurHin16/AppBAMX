import { FC, useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material'
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { IGrocery } from '../../models/grocery.model'
import { useSnackbar } from 'notistack';
import { HeaderComponent } from '../header/header.component';
//***Importación de las librerías para el aspecto de seguridad
import { AuthContext } from '../../auth-context';
import { useContext } from 'react';


export const AdminAddUserComponent: FC = (): JSX.Element => {
    //***Se importa el contexto para el aspecto de seguridad
    const context = useContext(AuthContext);

    useEffect(() => { //SE CONSUME
        if(!context.userState) {
            history.push('/');     
        } 
     },)
     
    let history = useHistory();

    function handleClick1() {
        history.push("/admin-user");
    }

    $(document).ready(function() {
        $('#rolEmpresa').change(function(e) {
            if ($(this).val() === "Operador") {
                $('#unidad').prop("disabled", false);
                $('#almacen').prop("disabled", true);
              }
            else if ($(this).val() === "Almacenista") {
                $('#almacen').prop("disabled", false);
                $('#unidad').prop("disabled", true);
            }
            else {
            $('#unidad').prop("disabled", true);
            $('#almacen').prop("disabled", true);
          }
        })
      });

    //Implementación del API, para los usuarios
    const [user, setUser] = useState({
        nombre: '', 
        apellidoPaterno: '', 
        apellidoMaterno: '',
        telefonoCasa: '',
        telefonoCelular: '', 
        username: '', 
        contrasena: '',
        puesto: '',
        placaVehiculo: '',
        idBodega: '',
    });

    const baseUrl = "http://localhost:5000/admin/crear-empleado";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setUser({
            ...user, //Mantener todo lo que ya esta en la constante body
            [e.target.name]: e.target.value
        })
    };

    // Variable for show alerts
    const   { enqueueSnackbar }  = useSnackbar();

    const editData = () => {
        axios.post(baseUrl, user)
            .then(response => {
                console.log('res from server: ', response)
                enqueueSnackbar('Usuario Creado!', { 
                    variant: 'success',
                    resumeHideDuration: 2000,
                    anchorOrigin:
                        { horizontal: 'right', vertical: 'bottom' }
            });
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar('Error!', { 
                    variant: 'error',
                    resumeHideDuration: 2000,
                    anchorOrigin:
                        { horizontal: 'right', vertical: 'bottom' }
            });
            })
    }

    //REST API GET de los almacenes
  const [groceries, setGroceries] = useState<IGrocery[]>([]);

  const fetchGrocery = async() => {
    const res = await fetch("http://localhost:5000/admin/ver-bodegas");
    const items = await res.json();
    const arr: IGrocery[] = [];
    for (let item of items.data) {
      arr.push(item);
    }
    setGroceries(arr);
  }

   useEffect(() => {
    fetchGrocery();       
         
  },[groceries])

    return(
       <Grid container>
            <Grid>
                <HeaderComponent/>
            </Grid>
            <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                xs = { 12 } md = { 12 } lg = { 12 }>
                <Grid spacing = { 2 }>
                    <br></br>
                    <Typography variant="body1">
                        Datos del usuario:
                    </Typography>
                    <Form xs={12} md={12} lg={12}>
                        <Row>
                            <Col xs = { 4 } md = { 4 } lg = { 4 }>
                                <Label for="id_input">ID Empleado</Label>
                                <Input type="text" name="id_input" id="id" disabled/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs = { 4 } md = { 4 } lg = { 4 }>
                                <FormGroup>
                                    <Label for="nombre">Nombre</Label>
                                    <Input type="text" name="nombre" id="name" onChange = { handleChange }/>
                                </FormGroup>
                            </Col>
                            <Col xs = { 4 } md = { 4 } lg = { 4 }>
                                <FormGroup>
                                    <Label for="paterno">Apellido paterno</Label>
                                    <Input type="text" name="apellidoPaterno" id="Apaterno" onChange = { handleChange }/>
                                </FormGroup>
                            </Col>
                            <Col xs = { 4 } md = { 4 } lg = { 4 }>
                                <FormGroup>
                                    <Label for="materno">Apellido materno</Label>
                                    <Input type="text" name="apellidoMaterno" id="Amaterno" onChange = { handleChange }/>
                                </FormGroup>  
                            </Col>
                        </Row>
                        <Row>
                            <Col xs = { 4 } md = { 4 } lg = { 4 }>
                                <FormGroup>
                                    <Label for="user_email">Correo</Label>
                                    <Input type="email" name="correo" id="email" onChange = { handleChange }/>
                                </FormGroup>
                            </Col>
                            <Col xs = { 4 } md = { 4 } lg = { 4 }>
                                <FormGroup>
                                    <Label for="user_tel">Teléfono de casa</Label>
                                    <Input type="tel" name="telefonoCasa" id="telephone" onChange = { handleChange }/>
                                </FormGroup>
                            </Col>
                            <Col xs = { 4 } md = { 4 } lg = { 4 }>
                                <FormGroup>
                                    <Label for="user_cellphone">Teléfono celular</Label>
                                    <Input type="tel" name="telefonoCelular" id="cellphone" onChange = { handleChange }/>
                                </FormGroup>  
                            </Col>
                        </Row>
                        <Row>
                            <Col xs = { 6 } md = { 6 } lg = { 6 }>
                                <FormGroup>
                                    <Label for="user_name">Usuario</Label>
                                    <Input type="text" name="username" id="name_user" onChange = { handleChange }/>
                                </FormGroup>
                            </Col>
                            <Col xs = { 6 } md = { 6 } lg = { 6 }>
                                <FormGroup>
                                    <Label for="user_password">Contraseña</Label>
                                    <Input type="password" name="contrasena" id="password" onChange = { handleChange }/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs = { 4 } md = { 4 } lg = { 4 }>
                                <FormGroup>
                                    <Label for="exampleSelect">Selecciona Rol</Label>
                                    <Input type="select" name="puesto" id="rolEmpresa" onChange = { handleChange }>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Operador">Operador</option>
                                    <option value="Almacenista">Almacenista</option>
                                    <option value="Coordinador">Coordinador</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs = { 4 } md = { 4 } lg = { 4 }>
                                <FormGroup>
                                    <Label for="auto_unidad">Unidad que maneja</Label>
                                    <Input type="text" name="placaVehiculo" id="unidad" placeholder="Placas de unidad" onChange = { handleChange } disabled/>
                                </FormGroup>
                            </Col>
                            <Col xs = { 4 } md = { 4 } lg = { 4 }>
                                <FormGroup>
                                    <Label for="almacen_user">Almacen</Label>
                                    <Input type="select" name="idBodega" id="almacen" onChange = { handleChange }  disabled >
                                    <option>Seleccione almacén</option>
                                    
                                        {groceries && groceries.map((grocery: any) => (
                                            <option key = {grocery.id} value = {grocery.id}>
                                                {grocery.nombre}
                                            </option>
                                        ))
                                        }            
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <br></br>
                        <Grid 
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center">
                            <Button variant="contained" onClick = { handleClick1 } style = {{backgroundColor:"#542463", marginRight: "40px"}}>Cancelar</Button>
                            <Button variant="contained" style = {{backgroundColor:"#F3071E"}} onClick={editData}>Guardar</Button>
                        </Grid>        
                    </Form>
                </Grid>
            </Grid>
       </Grid>
    );
}