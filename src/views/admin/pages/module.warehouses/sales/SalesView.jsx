import { useEffect, useState } from "react";
import { Button, Card, Grid, IconButton, Paper, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Add, AddShoppingCartOutlined, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useProductStore } from "../../../../../hooks";
import { ComponentInput } from "../../../../../components";
import { useCustomerStore } from "../../../../../hooks/module.customer/useCustomerStore";
import { setAddCartProduct } from "../../../../../store";

const formFields = {
    name: '',
    lastName: '',
    email: '',
    roleId: '',
    typeUserId: '',
    warehouses: '',
    search: '',
    quantity: ''
}

export const SalesView = () => {
    const { name, search, onInputChange, onResetForm } = useForm(formFields);

    const { getProducts } = useProductStore();
    const { getCustomers } = useCustomerStore();

    const { customers = [] } = useSelector((state) => state.customers);
    const { products = [], cartProducts = [] } = useSelector((state) => state.warehouses);
    // Obtener los tipos de usuarios
    useEffect(() => {
        getProducts();
        getCustomers();
    }, []);

    function Row({ product }) {
        const [open, setOpen] = useState(false);
        const { quantity, onInputChange, onResetForm } = useForm(formFields);
        const dispatch = useDispatch();

        const AddItem = (product) => {
            console.log(quantity)
            const newProduct = { ...product, quantity }
            // product.quantity = quantity;

            console.log(newProduct)
            dispatch(setAddCartProduct({ product: newProduct }))

        }
        return (
            <>
                <TableRow key={product.id} style={{ height: '50px' }}>
                    <TableCell component="th">
                        {product.name}
                    </TableCell>
                    <TableCell component="th" >
                        <ComponentInput type="text" label="" name="quantity" value={quantity} onChange={(v) => onInputChange(v, false, true)} />
                    </TableCell>
                    <TableCell component="th">
                        <IconButton
                            onClick={() => AddItem(product)}
                        >
                            <AddShoppingCartOutlined color="error" />
                        </IconButton>
                    </TableCell>
                </TableRow>
            </>
        );
    }
    return (
        <Grid container>
            <Grid item xs={12} sm={7} sx={{ padding: '5px' }}>
                <Stack spacing={1}>
                    <Typography variant="h5">Punto de venta</Typography>
                </Stack>

                <TableContainer component={Paper}>
                    <div style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white', padding: '10px' }}>
                        <ComponentInput
                            type="text"
                            label="Buscar Producto"
                            name="search"
                            value={search}
                            onChange={(v) => onInputChange(v, true)}
                        />
                    </div>

                    <div style={{ overflowY: 'auto', maxHeight: 300 }}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '50%' }}>
                                        Nombre
                                    </TableCell>
                                    <TableCell style={{ width: '15%' }}>
                                        Cantidad
                                    </TableCell>
                                    <TableCell style={{ width: '15%' }}>
                                        Acción
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products
                                    .filter(product => !cartProducts.map(e => e.id).includes(product.id))
                                    .filter((product) => search !== "" && (
                                        (product.name.trim().toUpperCase().includes(search.trim().toUpperCase())) ||
                                        (product.code.trim().toUpperCase().includes(search.trim().toUpperCase()))
                                    )
                                    )
                                    .map((product) => (
                                        <Row key={product.id} product={product} />
                                    )
                                    )}
                            </TableBody>
                        </Table>
                    </div>

                </TableContainer>
            </Grid>
            <Grid item xs={12} sm={5} sx={{ padding: '5px' }}>
                <Card >
                    <Stack spacing={1}>
                        <Typography >Carrito de compras</Typography>
                    </Stack>
                    <TableContainer component={Paper} style={{ overflowY: 'auto' }} sx={{ padding: '5px' }}>
                        <Table size="small" aria-label="a dense table">
                            <TableBody>
                                {cartProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell component="th" >
                                            {product.name}
                                        </TableCell>
                                        <TableCell component="th" >
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton
                                                    onClick={() => handleEdit(rol)}
                                                >
                                                    <Remove color="info" />
                                                </IconButton>
                                                {product.quantity}
                                                <IconButton
                                                    onClick={() => onDelete(rol.id)}
                                                >
                                                    <Add color="error" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Grid>
        </Grid >

    )
}