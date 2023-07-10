import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentDate, ComponentDraw, ComponentInput, ComponentSelect } from '../../../../../components';
import { useForm, useInputStore, useTypeUserStore } from '../../../../../hooks';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormControlLabel, Grid, Switch, Typography } from '@mui/material';
import { ProductTable } from '../products';
import { WarehouseTable } from '../warehouses';
import { ProductStatusTable } from '../productStatus/ProductStatusTable';


const formFields = {
    detail: '',
    quatity: '0',
    price: '0'
}

export const CreateReceptionProduct
    = React.memo(({ open, handleClose }) => {
        const [productSelect, setProductSelect] = useState(null);
        const [productStatusSelect, setProductStatusSelect] = useState({ name: 'Producto' });
        const [warehouseSelect, setWarehouseSelect] = useState({ name: 'Sucursal' });

        const { warehouses = [], products = [] } = useSelector((state) => state.warehouses);
        const [formValues, setFormValues] = useState(formFields);


        const { postInput } = useInputStore();
        const { detail, quatity, price, onInputChange, onResetForm } = useForm(formFields);

        const sendSubmit = (event) => {
            handleClose();
            event.preventDefault();
            postInput({
                productStatusId: productStatusSelect.id,
                warehouseId: warehouseSelect.id,
                detail,
                quatity,
                price,
                dueDate: dueDate
            });
            onResetForm();
        }
        //warehouse
        const [opendrawerWarehouse, setOpenDrawerWarehouse] = useState(false);

        const handleDrawerWarehouse = useCallback((value) => {
            setOpenDrawerWarehouse(value);
        }, []);

        const selectWarehouse = useCallback((value) => {
            setWarehouseSelect(value);
            setOpenDrawerWarehouse(false);
        }, [])
        //product
        const [opendrawerProduct, setOpenDrawerProduct] = useState(false);
        const [opendrawerProductStatus, setOpendrawerProductStatus] = useState(false)

        const handleDrawerProduct = useCallback((value) => {
            setOpenDrawerProduct(value);
        }, []);

        const handleDrawerProductStatus = useCallback((value) => {
            setOpendrawerProductStatus(value);
        }, []);
        const selectProduct = useCallback((value) => {
            setProductSelect(value);
            setOpenDrawerProduct(false);
            setOpendrawerProductStatus(true);
        }, [])

        const selectProductStatus = useCallback((value) => {
            setProductStatusSelect(value);
            setOpendrawerProductStatus(false);
        }, [])
        //Due date
        const [stateDueDate, setStateDueDate] = useState(false)

        const handleDueDate = (event) => {
            setStateDueDate(event.target.checked)
        };
        const [dueDate, setDueDate] = useState(null)
        const onDateChanged = (event, changing) => {
            console.log('changee', event)

            setFormValues({
                ...formValues,
                [changing]: event
            })
            setDueDate(event)
        }
        return (
            <>
                {
                    opendrawerWarehouse ?
                        <ComponentDraw
                            stateSelect={true}
                            stateMultiple={false}
                            title='Sucursales'
                            list={warehouses.filter((e) => e.state)}
                            opendrawer={opendrawerWarehouse}
                            handleDrawer={handleDrawerWarehouse}
                            itemSelect={selectWarehouse}
                        >
                            <WarehouseTable />
                        </ComponentDraw> :
                        <></>
                }
                {
                    opendrawerProduct ?
                        <ComponentDraw
                            stateSelect={true}
                            stateMultiple={false}
                            title='Productos'
                            list={products.filter((e) => e.state && e.visible)}
                            opendrawer={opendrawerProduct}
                            handleDrawer={handleDrawerProduct}
                            itemSelect={selectProduct}
                        >
                            <ProductTable />
                        </ComponentDraw> :
                        <></>
                }
                {
                    opendrawerProductStatus ?
                        <ComponentDraw
                            stateSelect={true}
                            stateMultiple={false}
                            title={productSelect ? `Estados del producto: ${productSelect.name}` : ''}
                            list={products.find((e) => e.id == productSelect.id).productStatus.filter((e) => e.state)}
                            opendrawer={opendrawerProductStatus}
                            handleDrawer={handleDrawerProductStatus}
                            itemSelect={selectProductStatus}
                        >
                            <ProductStatusTable />
                        </ComponentDraw> :
                        <></>
                }
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle >
                        {productSelect ? `Nuvea recepción del producto: ${productSelect.name}` : 'Nueva Recepción de productos'}
                    </DialogTitle>


                    <form onSubmit={sendSubmit} >
                        <DialogContent >
                            <Grid container>
                                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                    <ComponentSelect
                                        labelChip={['name']}
                                        title={warehouseSelect.name}
                                        onPressed={() => handleDrawerWarehouse(true)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>

                                    <ComponentSelect
                                        labelChip={['name']}
                                        title={productStatusSelect.name}
                                        onPressed={() => handleDrawerProduct(true)}
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    title={typeUserSelect.name}
                                    onPressed={() => handleDrawerTypeUser(true)}
                                />
                            </Grid> */}
                                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                    <ComponentInput
                                        type="text"
                                        label="Cantidad"
                                        name="quatity"
                                        value={quatity}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                    <ComponentInput
                                        type="text"
                                        label="Precio"
                                        name="price"
                                        value={price}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                    <ComponentInput
                                        type="text"
                                        label="Detalle"
                                        name="detail"
                                        value={detail}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>

                                    <FormControlLabel
                                        control={
                                            <Switch checked={stateDueDate} onChange={handleDueDate} name="jason" />
                                        }
                                        label="Fecha de vencimiento"
                                    />
                                </Grid>
                                {
                                    stateDueDate &&
                                    <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                        <ComponentDate
                                            value={dueDate}
                                            title="Fecha de vencimiento"
                                            onChange={(event) => onDateChanged(event)}
                                        />
                                    </Grid>
                                }
                            </Grid>


                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button
                                type="submit"
                            >
                                CREAR
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </>
        );
    });
