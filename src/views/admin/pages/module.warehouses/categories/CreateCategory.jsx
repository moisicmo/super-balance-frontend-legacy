import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentInput } from '../../../../../components';
import React from 'react';
import { useCategoryStore, useForm } from '../../../../../hooks';


const formFields = {
    name: '',
}

export const CreateCategory = React.memo(({ open, handleClose, item }) => {
    const { postCategory, putCategory } = useCategoryStore();
    const { name, onInputChange, onResetForm } = useForm(Object.keys(item).length === 0 ? formFields : item);

    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();
        Object.keys(item).length === 0 ? postCategory({ name }) : putCategory({ ...item, name, userId: item.userId.id });
        onResetForm();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            style={{ zIndex: 9998 }}
        >
            <DialogTitle >
                {Object.keys(item).length === 0 ? "Nueva Categoria" : item.name}
            </DialogTitle>


            <form onSubmit={sendSubmit} >
                <DialogContent >
                    <ComponentInput
                        type="text"
                        label="Categoria"
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
