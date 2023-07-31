import { useEffect, useState } from "react";
import { Box, Button, Card, Collapse, Grid, IconButton, Paper, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Add, AddShoppingCartOutlined, DeleteOutline, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, Remove, RemoveCircleOutline } from "@mui/icons-material";
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



    function RowProductStatus({ product, productStatus }) {

        const dispatch = useDispatch();
        const { quantity, onInputChange, onResetForm } = useForm(formFields);
        const AddItem = (product) => {
            const newProductStatus = { ...productStatus, quantity }
            const newProduct = { ...product, productStatus: newProductStatus }
            console.log(newProduct)
            dispatch(setAddCartProduct({ product: newProduct }))

        }
        return (
            <>
                <TableRow >
                    <TableCell component="th" scope="row">
                        {productStatus.name}
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
        )
    }
    function Row({ product }) {
        const [openIndex, setOpenIndex] = useState(null);
        return (
            <>
                <TableRow key={product.id} >
                    <TableCell component="th">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                                if (openIndex == product.id) {
                                    setOpenIndex(null)
                                } else {

                                    setOpenIndex(product.id);
                                }
                            }}
                        >
                            {openIndex == product.id ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th">
                        {product.name}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={openIndex == product.id} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Stack spacing={1}>
                                        <Typography>Estados del producto: {product.name}</Typography>
                                    </Stack>
                                </Stack>

                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>Cantidad</TableCell>
                                            <TableCell>Acción</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {product.productStatus.map((productStatus) => (
                                            <RowProductStatus key={productStatus.id} product={product} productStatus={productStatus} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }
    return (
        <Grid container>
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
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
                            <TableBody>
                                {products
                                    .filter((product) => search !== "" && (
                                        (product.name.trim().toUpperCase().includes(search.trim().toUpperCase())) ||
                                        (product.code.trim().toUpperCase().includes(search.trim().toUpperCase()))
                                    )
                                    )
                                    .map((product) => {
                                        const newProduct = {
                                            ...product,
                                            productStatus: [...product.productStatus.filter(e => !cartProducts.map(e => e.productStatus.id).includes(e.id))]
                                        };
                                        return newProduct.productStatus.length > 0 && (
                                            <Row key={newProduct.id} product={newProduct} />
                                        )
                                    }
                                    )}
                            </TableBody>
                        </Table>
                    </div>

                </TableContainer>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <Card >
                    <Stack spacing={1}>
                        <Typography >Carrito de compras</Typography>
                    </Stack>
                    <TableContainer component={Paper} style={{ overflowY: 'auto' }} sx={{ padding: '5px' }}>
                        <Table size="small" aria-label="a dense table">
                            <TableBody>
                                {cartProducts.map((product) => (
                                    <TableRow key={product.productStatus.id}>
                                        <TableCell component="th" >
                                            {product.name} - {product.productStatus.name}
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
                                                {product.productStatus.quantity}
                                                <IconButton
                                                    onClick={() => onDelete(rol.id)}
                                                >
                                                    <Add color="error" />
                                                </IconButton>

                                            </Stack>
                                        </TableCell>
                                        <TableCell component="th" >
                                            <IconButton
                                                onClick={() => onDelete(rol.id)}
                                            >
                                                <DeleteOutline color="error" />
                                            </IconButton>
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