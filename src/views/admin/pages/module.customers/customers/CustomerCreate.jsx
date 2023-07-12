import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentInput, ComponentDraw, ComponentSelect } from '../../../../../components';
import { useForm, useUserStore } from '../../../../../hooks';
import { Grid } from '@mui/material';
import { TypeDocumentTable } from '../typeDocuments/TypeDocumentTable';
import { useTypeDocumentStore } from '../../../../../hooks/module.customer/useTypeDocumentStore';
import { useCustomerStore } from '../../../../../hooks/module.customer/useCustomerStore';

const formFields = {
    name: '',
    lastName: '',
    email: '',
    roleId: '',
    typeUserId: '',
    warehouses: '',
}

export const CustomerCreate = React.memo(({ open, handleClose, item }) => {
    useEffect(() => {
        if (Object.keys(item).length !== 0) {
            // setTypeDocumentSelect(item.roleId)
            // setTypeUserSelect(item.typeUserId)
        } else {
            setTypeDocumentSelect({ name: 'Tipo de documento' })
        }
    }, [item])

    //llamar post or put 
    const { postCustomer, putCustomer } = useCustomerStore();
    const { typeDocuments = [] } = useSelector((state) => state.customers);
    //controlador del formulario
    const { name, email, phone, numberDocument, onInputChange, onResetForm } = useForm(Object.keys(item).length === 0 ? formFields : item);


    //crear o editar
    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();
        Object.keys(item).length === 0 ?
            postCustomer({
                name,
                email,
                phone,
                numberDocument,
                typeDocumentId: typeDocumentSelect.id,
            }) :
            putCustomer({
                ...item,
                name,
                email,
                phone,
                numberDocument,
                typeDocumentId: typeDocumentSelect.id,
            });
        onResetForm();
    };

    //variable para abrir o cerrar el drawer

    const [typeDocumentSelect, setTypeDocumentSelect] = useState({ name: '' });
    const [openDrawerTypeDocument, setOpenDrawerTypeDocument] = useState(false);

    const handleDrawerTypeDocument = useCallback((value) => {
        setOpenDrawerTypeDocument(value);
    }, []);


    const selectTypeDocument = useCallback((value) => {
        console.log(value)
        setTypeDocumentSelect(value);
        setOpenDrawerTypeDocument(false);
    }, [])

    return (
        <>
            {
                openDrawerTypeDocument ?
                    <ComponentDraw
                        stateSelect={true}
                        stateMultiple={false}
                        title='Tipos de Documentos'
                        list={typeDocuments}
                        opendrawer={openDrawerTypeDocument}
                        handleDrawer={handleDrawerTypeDocument}
                        itemSelect={selectTypeDocument}
                    >
                        <TypeDocumentTable />
                    </ComponentDraw> :
                    <></>
            }
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{Object.keys(item).length === 0 ? 'Nuevo Usuario' : item.name}</DialogTitle>
                <form onSubmit={sendSubmit}>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentInput type="text" label="Nombre Completo" name="name" value={name} onChange={onInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentInput type="email" label="Correo" name="email" value={email} onChange={onInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentInput type="text" label="Teléfono" name="phone" value={phone} onChange={onInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    title={typeDocumentSelect.name}
                                    onPressed={() => handleDrawerTypeDocument(true)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentInput type="text" label="Número de documento" name="numberDocument" value={numberDocument} onChange={onInputChange} />
                            </Grid>
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
