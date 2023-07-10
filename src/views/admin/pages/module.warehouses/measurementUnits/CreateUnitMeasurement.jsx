import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentInput } from '../../../../../components';
import React from 'react';
import { useForm, useUnitMeasurementStore } from '../../../../../hooks';


const formFields = {
    name: '',
}

export const CreateUnitMeasurement = React.memo(({ open, handleClose, item }) => {
    const { postUnitMeasurement, putUnitMeasurement } = useUnitMeasurementStore();
    const { name, onInputChange, onResetForm } = useForm(Object.keys(item).length === 0 ? formFields : item);

    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();
        Object.keys(item).length === 0 ? postUnitMeasurement({ name }) : putUnitMeasurement({ ...item, name, userId: item.userId.id });
        onResetForm();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            style={{ zIndex: 9998 }}
        >
            <DialogTitle >
                {Object.keys(item).length === 0 ? "Nueva Unidad de medida" : item.name}
            </DialogTitle>


            <form onSubmit={sendSubmit} >
                <DialogContent >
                    <ComponentInput
                        type="text"
                        label="Unidad de medida"
                        name="name"
                        value={name}
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
