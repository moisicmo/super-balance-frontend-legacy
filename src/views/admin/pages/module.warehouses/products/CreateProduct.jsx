import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentDraw, ComponentInput, ComponentSelect, MaterialUISwitch } from '../../../../../components';
import React, { useCallback, useEffect, useState } from 'react';
import { useCategoryStore, useForm, useProductStore, useUnitMeasurementStore } from '../../../../../hooks';
import { useSelector } from 'react-redux';
import { CategoryTable } from '../categories/CategoryTable';
import { UnitMeasurementTable } from '../measurementUnits/UnitMeasurementTable';
import { Grid, Stack, Typography } from '@mui/material';
import { CreateCategory } from '../categories';
import { CreateUnitMeasurement } from '../measurementUnits/CreateUnitMeasurement';


const formFields = {
    name: '',
    price: '0',
    discount: '0',
}

export const CreateProduct = React.memo(({ open, handleClose, item }) => {
    const [categoryselect, setCategorySelect] = useState({ name: '' });
    const [unitMeasurementSelect, setUnitMeasurementSelect] = useState({ name: '' })
    const { categories = [], measurementUnits = [] } = useSelector((state) => state.warehouses);

    const { postProduct, putProduct } = useProductStore();
    const { name, price, discount, onInputChange, onResetForm } =
        useForm(Object.keys(item).length === 0 ?
            formFields :
            item
        );

    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();
        Object.keys(item).length === 0 ?
            postProduct({
                name,
                categoryId: categoryselect.id,
                unitMeasurementId: unitMeasurementSelect.id,
                price,
                discount,
                typeDiscount,
            }) : putProduct({
                ...item,
                name,
                categoryId: categoryselect.id,
                unitMeasurementId: unitMeasurementSelect.id,
                userId: item.userId.id,
            });
        onResetForm();
    }
    const [typeDiscount, setTypeDiscount] = useState('Monto')
    useEffect(() => {
        if (Object.keys(item).length !== 0) {
            setCategorySelect(item.categoryId)
            setUnitMeasurementSelect(item.unitMeasurementId)
        } else {
            setCategorySelect({ name: 'Categoria' })
            setUnitMeasurementSelect({ name: 'Unidad de medida' });
        }
    }, [item])




    const [openDrawerCategory, setOpenDrawerCategory] = useState(false);
    const [openDrawerUnitMeasurement, setOpenDrawerUnitMeasurement] = useState(false);

    const handleDrawerCategory = useCallback((value) => {
        setOpenDrawerCategory(value);
    }, []);
    const handleDrawerUnitMeasurement = useCallback((value) => {
        setOpenDrawerUnitMeasurement(value);
    }, []);


    const selectCategory = useCallback((value) => {
        setCategorySelect(value);
        setOpenDrawerCategory(false);
    }, [])
    const selectUnitMeasurement = useCallback((value) => {
        setUnitMeasurementSelect(value);
        setOpenDrawerUnitMeasurement(false);
    }, [])



    //create Category
    const { putCategory, deleteCategory } = useCategoryStore();

    const [openDialogCategory, setopenDialogCategory] = useState(false);
    const [itemEditCategory, setItemEditCategory] = useState({});

    // Definir los callbacks para abrir y cerrar el diálogo de edición
    const handleDialogCategory = useCallback((value, item) => {
        // handleClose();
        setItemEditCategory(item);
        setopenDialogCategory(value);
    }, []);


    //create Unit Measurement
    const { putUnitMeasurement, deleteUnitMeasurement } = useUnitMeasurementStore();
    const [openDialogUnitMeasurement, setopenDialogUnitMeasurement] = useState(false);
    const [itemEditUnitMeasurement, setItemEditUnitMeasurement] = useState({});

    // Definir los callbacks para abrir y cerrar el diálogo de edición
    const handleDialogUnitMeasurement = useCallback((value, item) => {
        // handleClose();
        setItemEditUnitMeasurement(item);
        setopenDialogUnitMeasurement(value);
    }, []);


    return (
        <>
            {
                openDrawerCategory ?
                    <ComponentDraw
                        stateSelect={true}
                        stateMultiple={false}
                        title='Categorias'
                        list={categories}
                        opendrawer={openDrawerCategory}
                        handleDrawer={handleDrawerCategory}
                        itemSelect={selectCategory}
                        titleButton='Nueva Categoria'
                        onClickButton={() => handleDialogCategory(true, {})}
                    >
                        <CategoryTable
                            handleEdit={(item) => handleDialogCategory(true, item)}
                            onEdit={putCategory}
                            onDelete={deleteCategory}
                        />
                    </ComponentDraw> :
                    <></>
            }
            {
                openDrawerUnitMeasurement ?
                    <ComponentDraw
                        stateSelect={true}
                        stateMultiple={false}
                        title='Unidades de medida'
                        list={measurementUnits}
                        opendrawer={openDrawerUnitMeasurement}
                        handleDrawer={handleDrawerUnitMeasurement}
                        itemSelect={selectUnitMeasurement}
                        titleButton='Nueva Unidad de Medida'
                        onClickButton={() => { handleDialogUnitMeasurement(true, {}) }}
                    >
                        <UnitMeasurementTable
                            handleEdit={(item) => handleDialogUnitMeasurement(true, item)}
                            onEdit={putUnitMeasurement}
                            onDelete={deleteUnitMeasurement} />
                    </ComponentDraw> :
                    <></>
            }


            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle >
                    {Object.keys(item).length === 0 ? "Nuevo producto" : item.name}
                </DialogTitle>


                <form onSubmit={sendSubmit} >
                    <DialogContent >
                        <Grid container>
                            <Grid item xs={12} sm={Object.keys(item).length === 0 ? 6 : 12} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Nombre del producto"
                                    name="name"
                                    value={name}
                                    onChange={onInputChange}

                                />
                            </Grid>
                            {
                                Object.keys(item).length === 0 &&
                                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                    <ComponentInput
                                        type="text"
                                        label="Precio de referencia"
                                        name="price"
                                        value={price}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            }
                            {
                                Object.keys(item).length === 0 &&
                                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                    <ComponentInput
                                        type="text"
                                        label="Descuento"
                                        name="discount"
                                        value={discount}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            }
                            {
                                Object.keys(item).length === 0 &&
                                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                    <Stack direction="row" alignItems="center" justifyContent="center">
                                        <Typography>Monto</Typography>
                                        <MaterialUISwitch
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
                            }
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    title={categoryselect.name}
                                    onPressed={() => handleDrawerCategory(true)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    title={unitMeasurementSelect.name}
                                    onPressed={() => handleDrawerUnitMeasurement(true)}
                                />
                            </Grid>
                        </Grid>


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
            <CreateCategory
                open={openDialogCategory}
                handleClose={() => handleDialogCategory(false, {})}
                item={itemEditCategory}
            />
            <CreateUnitMeasurement
                open={openDialogUnitMeasurement}
                handleClose={() => handleDialogUnitMeasurement(false, {})}
                item={itemEditUnitMeasurement}
            />
        </>
    );
});
