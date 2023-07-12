
import React, { useCallback, useEffect, useState } from "react";
import { Button, Chip, Grid, SvgIcon, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useSelector } from "react-redux";
import { ComponentDraw, ComponentDateRange } from "../../../../../components";
import { Add } from "@mui/icons-material";
import { useKardexProductStore, useProductStore, useWarehouseStore } from "../../../../../hooks";
import { WarehouseTable } from "../warehouses";
import { applyPagination } from "../../../../../utils/applyPagination";
import { KardexProductTable } from "./KardexProductTable";
import { CreateReceptionProduct } from "./CreateReceptionProduct";

export const KardexProductsView = () => {
    const { getProducts } = useProductStore();
    const { getAllKardexProducts, getKardexProductByProduct } = useKardexProductStore();
    const { getWarehouses } = useWarehouseStore();

    const { kardexProducts = [], warehouses = [], products = [] } = useSelector((state) => state.warehouses);

    // const { reports = [] } = useSelector((state) => state.reports);
    const { selection = [] } = useSelector((state) => state.selections);

    useEffect(() => {
        getAllKardexProducts();
        getWarehouses();
        getProducts();
    }, []);
    // Obtener la lista paginada de typeUsers utilizando el hook useMemo
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [kardexProductList, setKardexProductList] = useState([])

    // Definir los callbacks para el cambio de página y el cambio de filas por página
    const handlePageChange = useCallback((_, value) => {
        setPage(value);
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
    }, []);


    // Actualizar la lista de typeUsers cuando cambie la búsqueda, la página o las filas por página
    useEffect(() => {
        const defaultKardexProductList = applyPagination(
            kardexProducts,
            page,
            rowsPerPage
        );
        setKardexProductList(defaultKardexProductList);
    }, [kardexProducts, page, rowsPerPage]);

    const [opendrawer, setOpendrawer] = useState({ state: false, items: [] });
    const handleCarrers = useCallback((state, items) => {
        setOpendrawer({ state, items })
    }, [],
    )

    const { sedes = [], modalities = [], carrers = [] } = useSelector((state) => state.users);

    //categoria
    const { categories = [] } = useSelector((state) => state.events);

    const [opendrawerCategorie, setOpenDrawerCategorie] = useState(false);
    const handleDrawerCategorie = useCallback((value) => {
        setOpenDrawerCategorie(value);
        if (!value) {
            setFilter()
        }
    }, [selection]);

    //calendar range
    const [dateRange, onChangeDateRange] = useState([]);
    useEffect(() => {
        if (dateRange.length > 0) {
            setFilter()
        }
    }, [dateRange])

    const setFilter = () => {
        let dataCarrers = null;
        let dataCategories = null;
        let dataModalities = null;
        let start = dateRange.length > 0 ? dateRange[0] : null;
        let end = dateRange.length > 0 ? dateRange[1] : null;
        if ([...carrers.filter(e => selection.includes(e.id))].length > 0) {
            dataCarrers = [...carrers.filter(e => selection.includes(e.id))].map(e => e.id)
        }
        if ([...categories.filter(e => selection.includes(e.id))].length > 0) {
            dataCategories = [...categories.filter(e => selection.includes(e.id))].map(e => e.id)
        }
        if ([...modalities.filter(e => selection.includes(e.name))].length > 0) {
            dataModalities = [...modalities.filter(e => selection.includes(e.name))].map(e => e.name)
        }
        getReport(
            {
                carrers: dataCarrers,
                categories: dataCategories,
                modality: dataModalities,
                start: start,
                end: end,
            }
        );
    }

    const [openDialog, setopenDialog] = useState(false);
    const handleDialog = useCallback((value) => {
        // setItemEdit({});
        setopenDialog(value);
    }, []);

    return (
        <>
            {
                opendrawerCategorie &&
                <ComponentDraw
                    stateEdit={false}
                    stateSelect={true}
                    stateMultiple={true}
                    title='Sucursales'
                    list={categories}
                    opendrawer={opendrawerCategorie}
                    handleDrawer={handleDrawerCategorie}
                >

                    <WarehouseTable />
                </ComponentDraw>
            }
            <Box component="main">
                <Container maxWidth="xl">
                    <Stack spacing={1}>

                        <Stack direction="row" justifyContent="space-between">
                            <Stack spacing={1}>
                                <Typography variant="h5">Movimientos de productos</Typography>
                            </Stack>
                            <div>
                                <Button
                                    onClick={() => handleDialog(true)}
                                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                                    variant="contained"
                                >
                                    Nueva Recepción
                                </Button>
                            </div>
                        </Stack>
                        <Grid container justifyContent="center">
                            <Grid item xs={12} sm={3} sx={{ padding: '5px' }}>
                                {/* <ComponentSelect
                                    labelChip={['name']}
                                    title={rolSelect.name}
                                    onPressed={() => handleDrawerRol(true)}
                                /> */}
                            </Grid>
                            <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                                <ComponentDateRange
                                    value={dateRange}
                                    onChange={onChangeDateRange}
                                />
                            </Grid>
                        </Grid>

                        <KardexProductTable
                            stateEdit={false}
                            allItems={kardexProducts}
                            items={kardexProductList}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onViewCarrers={(items) => handleCarrers(true, items)}
                        />
                    </Stack>
                </Container>
            </Box>
            {/* <ShowCarrers
                open={opendrawer.state}
                handleClose={() => handleCarrers(false, [])}
                items={opendrawer.items}
            /> */}
            <CreateReceptionProduct
                open={openDialog}
                handleClose={() => handleDialog(false)}
            // item={itemEdit}
            />
        </>
    );
};
