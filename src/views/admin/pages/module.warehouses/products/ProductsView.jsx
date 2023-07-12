import React, { useCallback, useEffect, useState } from "react";
import { Button, SvgIcon, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { Add } from "@mui/icons-material";
import { ProductTable } from ".";
import { applyPagination } from "../../../../../utils/applyPagination";
import { useSelector } from "react-redux";
import { CreateProduct } from ".";
import { useCategoryStore, useProductStore, useUnitMeasurementStore } from "../../../../../hooks";
import { ComponentInput } from "../../../../../components";

export const ProductsView = () => {
    // Acceder a las funciones getTypeUser y putTypeUser desde el custom hook useTypeUserStore
    const { getProducts, putProduct, deleteProduct } = useProductStore();
    const { getCategories } = useCategoryStore();
    const { getMeasurementUnits } = useUnitMeasurementStore();

    // Obtener la lista de typeUsers del estado global usando useSelector
    const { products = [] } = useSelector((state) => state.warehouses);
    // Obtener los tipos de usuarios
    useEffect(() => {
        getProducts();
        getCategories();
        getMeasurementUnits();
    }, []);
    // Obtener la lista paginada de typeUsers utilizando el hook useMemo
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [productList, setProductList] = useState([]);

    // Definir los callbacks para el cambio de página y el cambio de filas por página
    const handlePageChange = useCallback((_, value) => {
        setPage(value);
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
    }, []);

    // Definir los estados para el diálogo de edición y el tipo de usuario a editar
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState({});

    // Definir los callbacks para abrir y cerrar el diálogo de edición
    const handleDialog = useCallback((value) => {
        setItemEdit({});
        setopenDialog(value);
    }, []);

    // Definir el callback para editar un tipo de usuario
    const handleEdit = useCallback((item) => {
        setopenDialog(true);
        setItemEdit({ ...item, price: '0', discount: '0' });
    }, []);

    // Definir el estado y el callback para la búsqueda
    const [search, setSearch] = useState("");
    const onInputChange = useCallback(({ target }) => {
        setSearch(target.value.trim());
        setPage(0);
    }, []);

    // Actualizar la lista de typeUsers cuando cambie la búsqueda, la página o las filas por página
    useEffect(() => {
        if (search && search.trim() !== "") {
            const filteredProducts = products.filter((e) =>
                e.name.includes(search.trim())
            );
            const updatedProductList = applyPagination(
                filteredProducts,
                page,
                rowsPerPage
            );
            setProductList(updatedProductList);
        } else {
            const defaultProductList = applyPagination(
                products,
                page,
                rowsPerPage
            );
            setProductList(defaultProductList);
        }
    }, [products, page, rowsPerPage, search]);

    const { data } = useSelector((state) => state.auth);
    const permisions = () => {
        return data ? data.roleId.permisionIds : [];
    };

    return (
        <>
            {/* Renderizar el componente principal */}
            <Box component="main">
                <Container maxWidth="xl">
                    <Stack spacing={1}>
                        {/* Renderizar el encabezado */}
                        <Stack direction="row" justifyContent="space-between">
                            <Stack spacing={1}>
                                <Typography variant="h5">Productos</Typography>
                            </Stack>
                            <div>
                                <Button
                                    onClick={() => handleDialog(true)}
                                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                                    variant="contained"
                                // disabled={permisions().filter((e) => e.name === 'Crear producto').length == 0}
                                >
                                    Nuevo producto
                                </Button>
                            </div>
                        </Stack>
                        {/* Renderizar el campo de búsqueda */}
                        <ComponentInput
                            type="text"
                            label="Buscar producto"
                            name="search"
                            value={search}
                            onChange={onInputChange}
                        />
                        {/* Renderizar la tabla de tipos de usuario */}
                        <ProductTable
                            allItems={products}
                            items={productList}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleEdit={handleEdit}
                            onEdit={putProduct}
                            onDelete={deleteProduct}
                        />
                    </Stack>
                </Container>
            </Box>
            {/* Renderizar el diálogo de creación/edición de tipo de usuario */}
            <CreateProduct
                open={openDialog}
                handleClose={() => handleDialog(false)}
                item={itemEdit}
            />
        </>
    );
};
