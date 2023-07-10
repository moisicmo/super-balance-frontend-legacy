import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentInput } from '../../../../../components';
import React from 'react';
import { useForm, useWarehouseStore } from '../../../../../hooks';


const formFields = {
    name: '',
    address: '',
    phone: ''
}

export const CreateWarehouse = React.memo(({ open, handleClose, item }) => {
    const { postWarehouse, putWarehouse } = useWarehouseStore();
    const { name, address, phone, onInputChange, onResetForm } = useForm(Object.keys(item).length === 0 ? formFields : item);

    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();
        Object.keys(item).length === 0 ? postWarehouse({ name, address, phone }) : putWarehouse({ ...item, name, address, phone, userId: item.userId.id, userIds: item.userIds.map(e => e.id) });
        onResetForm();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle >
                {Object.keys(item).length === 0 ? "Nueva Sucursal" : item.name}
            </DialogTitle>


            <form onSubmit={sendSubmit} >
                <DialogContent >
                    <ComponentInput
                        type="text"
                        label="Nombre de la sucursal"
                        name="name"
                        value={name}
                        onChange={onInputChange}

                    />
                    <ComponentInput
                        type="text"
                        label="Dirección"
                        name="address"
                        value={address}
                        onChange={onInputChange}

                    />
                    <ComponentInput
                        type="number"
                        label="Telefono"
                        name="phone"
                        value={phone}
                        onChange={onInputChange}

                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button
                        type="submit"
                    >
                        {Object.keys(item).length === 0 ? 'CREAR' : 'EDITAR'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
});
