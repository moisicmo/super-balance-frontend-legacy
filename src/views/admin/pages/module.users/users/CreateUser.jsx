import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentInput, ComponentDraw, ComponentSelect } from '../../../../../components';
import { useForm, useUserStore } from '../../../../../hooks';
import { RoleTable } from '../roles';
import { TypeUserTable } from '../typeUsers/TypeUserTable';
import { Grid } from '@mui/material';
import { WarehouseTable } from '../../module.warehouses/warehouses';

const formFields = {
    name: '',
    lastName: '',
    email: '',
    roleId: '',
    typeUserId: '',
    warehouses: '',
}

export const CreateUser = React.memo(({ open, handleClose, item }) => {
    const [rolSelect, setRolSelect] = useState({ name: '' });
    const [typeUserSelect, setTypeUserSelect] = useState({ name: '' })
    useEffect(() => {
        if (Object.keys(item).length !== 0) {
            setRolSelect(item.roleId)
            setTypeUserSelect(item.typeUserId)
        } else {
            setRolSelect({ name: 'Rol' })
            setTypeUserSelect({ name: 'Tipo de usuario' });
        }
    }, [item])

    //llamar post or put 
    const { postUser, putUser } = useUserStore();
    //obtener todas las carreras
    const { roles = [], typeUsers = [] } = useSelector((state) => state.users);
    const { warehouses = [] } = useSelector((state) => state.warehouses);
    //controladores de seleccion
    const { selection = [] } = useSelector((state) => state.selections);
    //controlador del formulario
    const { name, lastName, email, onInputChange, onResetForm } = useForm(Object.keys(item).length === 0 ? formFields : item);


    //crear o editar
    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();
        Object.keys(item).length === 0 ?
            postUser({
                name,
                lastName,
                email,
                roleId: rolSelect.id,
                typeUserId: typeUserSelect.id,
                warehouses: selection
            }) :
            putUser({
                ...item,
                name,
                lastName,
                email,
                roleId: rolSelect.id,
                typeUserId: typeUserSelect.id,
                warehouses: selection,
                responsibleId: item.responsibleId.id
            });
        onResetForm();
    };

    //variable para abrir o cerrar el drawer
    const [openDrawerWarehouse, setOpenDrawerWarehouse] = useState(false);
    const [opendrawerRol, setOpenDrawerRol] = useState(false);
    const [opendrawerTypeUser, setOpenDrawerTypeUser] = useState(false);

    //controlador de abrir o cerrar drawer
    const handleDrawerWarehouse = useCallback((value) => {
        setOpenDrawerWarehouse(value);
    }, []);
    const handleDrawerRol = useCallback((value) => {
        setOpenDrawerRol(value);
    }, []);
    const handleDrawerTypeUser = useCallback((value) => {
        setOpenDrawerTypeUser(value);
    }, []);


    const selectRol = useCallback((value) => {
        setRolSelect(value);
        setOpenDrawerRol(false);
    }, [])
    const selectTypeUser = useCallback((value) => {
        setTypeUserSelect(value);
        setOpenDrawerTypeUser(false);
    }, [])

    return (
        <>
            {
                openDrawerWarehouse ?
                    <ComponentDraw
                        stateSelect={true}
                        stateMultiple={true}
                        title='Sucursales'
                        list={warehouses}
                        opendrawer={openDrawerWarehouse}
                        handleDrawer={handleDrawerWarehouse}
                    >
                        <WarehouseTable />
                    </ComponentDraw> :
                    <></>
            }
            {
                opendrawerRol ?
                    <ComponentDraw
                        stateSelect={true}
                        stateMultiple={false}
                        title='Roles'
                        list={roles.filter((e) => e.state)}
                        opendrawer={opendrawerRol}
                        handleDrawer={handleDrawerRol}
                        itemSelect={selectRol}
                    >
                        <RoleTable />
                    </ComponentDraw> :
                    <></>
            }
            {
                opendrawerTypeUser ?
                    <ComponentDraw
                        stateSelect={true}
                        stateMultiple={false}
                        title='Tipos de usuario'
                        list={typeUsers.filter((e) => e.state)}
                        opendrawer={opendrawerTypeUser}
                        handleDrawer={handleDrawerTypeUser}
                        itemSelect={selectTypeUser}
                    >
                        <TypeUserTable />
                    </ComponentDraw> :
                    <></>
            }
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{Object.keys(item).length === 0 ? 'Nuevo Usuario' : item.name}</DialogTitle>
                <form onSubmit={sendSubmit}>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentInput type="text" label="Nombre" name="name" value={name} onChange={onInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentInput type="text" label="Apellido" name="lastName" value={lastName} onChange={onInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInput type="email" label="Correo" name="email" value={email} onChange={onInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    title={rolSelect.name}
                                    onPressed={() => handleDrawerRol(true)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    title={typeUserSelect.name}
                                    onPressed={() => handleDrawerTypeUser(true)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item sx={{ padding: '5px' }}>
                            <ComponentSelect
                                labelChip={['name']}
                                items={warehouses}
                                title="Sucursales"
                                onPressed={() => handleDrawerWarehouse(true)} />
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit">
                            {Object.keys(item).length === 0 ? 'CREAR' : 'EDITAR'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
});
