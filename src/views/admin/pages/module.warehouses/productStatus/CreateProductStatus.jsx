import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { useForm, useProductStatusStore } from '../../../../../hooks';
import { ComponentInput, MaterialUISwitch } from '../../../../../components';
import { Grid, Stack, Typography } from '@mui/material';


const formFields = {
    name: '',
    price: '0',
    discount: '0'
}

export const CreateProductStatus = React.memo(({ open, handleClose, item }) => {
    const { postProductStatus, putProductStatus } = useProductStatusStore();
    const { name, price, discount, onInputChange, onResetForm } = useForm(

        Object.keys(item).length === 0 || item.product ?
            formFields : item.itemEdit ?
                item.itemEdit : item

    );

    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();
        Object.keys(item).length === 0 || item.product ?
            postProductStatus({
                productId: item.product.id,
                name,
                price,
                discount,
                typeDiscount,
            }) : putProductStatus({
                ...item.itemEdit,
                name,
                price,
                discount,
                typeDiscount,
                userId: item.itemEdit.userId.id,
            });
        onResetForm();
    }
    const [typeDiscount, setTypeDiscount] = useState('Monto')
    useEffect(() => {
        if (item && item.itemEdit) {
            setTypeDiscount(item.itemEdit.typeDiscount)
        }
    }, [item])


    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            {
                (item.product || item.itemEdit) && <DialogTitle >
                    {Object.keys(item).length === 0 || item.product ? `Nuevo Estado de: ${item.product.name}` : item.itemEdit.name}
                </DialogTitle>
            }



            <form onSubmit={sendSubmit} >
                <DialogContent >
                    <Grid container>
                        <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                            <ComponentInput
                                type="text"
                                label="Estado"
                                name="name"
                                value={name}
                                onChange={onInputChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                            <ComponentInput
                                type="text"
                                label="Precio de referencia"
                                name="price"
                                value={price}
                                onChange={onInputChange}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                            <ComponentInput
                                type="text"
                                label="Descuento"
                                name="discount"
                                value={discount}
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                            <Stack direction="row" alignItems="center" justifyContent="center">
                                <Typography>Monto</Typography>
                                <MaterialUISwitch
                                    checked={typeDiscount == 'Monto' ? false : true}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setTypeDiscount('Porcentaje')
                                        } else {
                                            setTypeDiscount('Monto')
                                        }
                                    }}
                                />
                                <Typography>Porcentaje</Typography>
                            </Stack>
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button
                        type="submit"
                    >
                        {Object.keys(item).length === 0 || item.product ? 'CREAR' : 'EDITAR'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
});
