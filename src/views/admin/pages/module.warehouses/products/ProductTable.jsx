import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardMedia,
    Checkbox,
    Collapse,
    IconButton,
    Stack,
    SvgIcon,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { useProductStatusStore, useSelectorStore } from '../../../../../hooks';
import { SeverityPill } from '../../../../../components';
import { Add, DeleteOutline, EditOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { CreateProductStatus } from '../productStatus/CreateProductStatus';
import imagelogo from './../../../../../assets/images/no-image.webp';

export const ProductTable = React.memo((props) => {
    const {
        stateSelect = false,
        stateMultiple = true,
        allItems = [],
        items = [],
        onPageChange = () => { },
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
        selected = [],
        onEdit,
        handleEdit,
        onDelete,
        itemSelect,
    } = props;

    const { selection = [] } = useSelector((state) => state.selections);
    const { selectAll, selectOne, deselectAll, deselectOne } = useSelectorStore();
    const { data } = useSelector((state) => state.auth);
    const permisions = () => {
        return data ? data.roleId.permisionIds : [];
    };

    const [openIndex, setOpenIndex] = useState(null);
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState({});

    const handleDialog = useCallback((value, product, itemEdit) => {
        if (itemEdit) {
            setItemEdit({ itemEdit });
        } else {
            setItemEdit({ product });
        }
        setopenDialog(value);
    }, []);
    //
    const { putProductStatus, deleteProductStatus } = useProductStatusStore();

    return (
        <Card>
            <TableContainer>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    stateSelect
                                    && <TableCell padding="checkbox">
                                        {stateMultiple && <Checkbox
                                            checked={allItems.map(e => e.id).every(id => selection.includes(id))}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    selectAll?.(allItems.map(e => e.id));
                                                } else {
                                                    deselectAll?.(allItems.map(e => e.id));
                                                }
                                            }}
                                        />}
                                    </TableCell>
                                }
                                <TableCell>
                                    Estados del producto
                                </TableCell>
                                <TableCell>
                                    Código
                                </TableCell>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                <TableCell>
                                    Imagen
                                </TableCell>
                                <TableCell>
                                    Cod. barras
                                </TableCell>
                                <TableCell>
                                    Categoria
                                </TableCell>

                                <TableCell>
                                    Und. de medida
                                </TableCell>
                                {
                                    !stateSelect && <TableCell>
                                        Visible
                                    </TableCell>
                                }
                                {
                                    !stateSelect && <TableCell>
                                        Estado
                                    </TableCell>
                                }
                                {
                                    !stateSelect && <TableCell>
                                        Acciones
                                    </TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((product) => {

                                const isSelected = selected.includes(product.id);
                                return (
                                    <React.Fragment key={product.id} >
                                        <TableRow
                                            style={{
                                                backgroundColor: (openIndex == product.id) ? '#D2D6DB' : '#fff',
                                            }}
                                            hover
                                            key={product.id}
                                        >
                                            {
                                                stateSelect && <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onChange={(value) => {
                                                            if (stateMultiple) {
                                                                if (value.target.checked) {
                                                                    selectOne?.(value.id);
                                                                } else {
                                                                    deselectOne?.(value.id);
                                                                }
                                                            } else {
                                                                itemSelect(product)
                                                            }
                                                        }}
                                                    />
                                                </TableCell>
                                            }
                                            <TableCell>
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
                                            <TableCell component="th" scope="row">
                                                {product.code}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {product.name}
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        height: 100,
                                                        width: 100,
                                                    }}
                                                    alt={product.name}
                                                    src={product.image ?? imagelogo}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                SADSADD
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {product.categoryId.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {product.unitMeasurementId.name}
                                            </TableCell>
                                            {
                                                !stateSelect && <TableCell>
                                                    <Switch
                                                        checked={product.visible}
                                                        onChange={(event) => onEdit({
                                                            ...product,
                                                            visible: event.target.checked,
                                                            categoryId: product.categoryId.id,
                                                            unitMeasurementId: product.unitMeasurementId.id,
                                                            userId: product.userId.id,
                                                        })}
                                                        color="success"
                                                        size="small"
                                                    // disabled={permisions().filter((e) => e.name === 'Eliminar tipos de usuario').length == 0}
                                                    />
                                                </TableCell>
                                            }

                                            {
                                                !stateSelect && <TableCell>
                                                    <SeverityPill color={product.state ? 'success' : 'error'}>
                                                        {product.state ? 'Activo' : 'Inactivo'}
                                                    </SeverityPill>
                                                </TableCell>
                                            }
                                            {
                                                !stateSelect && <TableCell>
                                                    <Stack
                                                        alignItems="center"
                                                        direction="row"
                                                        spacing={2}
                                                    >
                                                        <IconButton
                                                            onClick={() => handleEdit(product)}
                                                            disabled={permisions().filter((e) => e.name === 'Editar tipos de usuario').length == 0}
                                                        >
                                                            <EditOutlined color="info" />
                                                        </IconButton>
                                                        <Switch
                                                            checked={product.state}
                                                            onChange={(event) => onEdit({
                                                                ...product,
                                                                state: event.target.checked,
                                                                categoryId: product.categoryId.id,
                                                                unitMeasurementId: product.unitMeasurementId.id,
                                                                userId: product.userId.id,
                                                            })}
                                                            // id: user.id, state: event.target.checked, responsibleId: user.responsibleId.id
                                                            color="success"
                                                            size="small"
                                                            disabled={permisions().filter((e) => e.name === 'Eliminar tipos de usuario').length == 0}
                                                        />
                                                        <IconButton
                                                            onClick={() => onDelete(product.id)}
                                                            disabled={permisions().filter((e) => e.name === 'Eliminar tipos de usuario').length == 0}
                                                        >
                                                            <DeleteOutline color="error" />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
                                            }
                                        </TableRow>
                                        <TableRow

                                            style={{
                                                backgroundColor: (openIndex == product.id) ? '#f2f2f2' : '#fff',
                                            }}>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                                                <Collapse in={openIndex == product.id} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Stack direction="row" justifyContent="space-between">
                                                            <Stack spacing={1}>
                                                                <Typography>Estados del producto: {product.name}</Typography>
                                                            </Stack>
                                                            <div>
                                                                <Button
                                                                    onClick={() => handleDialog(true, product)}
                                                                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                                                                    variant="contained"
                                                                // disabled={permisions().filter((e) => e.name === 'Crear producto').length == 0}
                                                                >
                                                                    Nuevo estado
                                                                </Button>
                                                            </div>
                                                        </Stack>

                                                        <Table size="small" aria-label="purchases">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Estado</TableCell>
                                                                    <TableCell>Precio referencia</TableCell>
                                                                    <TableCell>Descuento</TableCell>
                                                                    <TableCell>Tipo Descuento</TableCell>
                                                                    <TableCell>Estado</TableCell>
                                                                    <TableCell>Acciones</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {product.productStatus.map((productStatus) => (
                                                                    <TableRow key={productStatus.id}>
                                                                        <TableCell component="th" scope="row">
                                                                            {productStatus.name}
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row">
                                                                            {productStatus.price}
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row">
                                                                            {productStatus.discount}
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row">
                                                                            {productStatus.typeDiscount}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <SeverityPill color={productStatus.state ? 'success' : 'error'}>
                                                                                {productStatus.state ? 'Activo' : 'Inactivo'}
                                                                            </SeverityPill>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Stack
                                                                                alignItems="center"
                                                                                direction="row"
                                                                                spacing={2}
                                                                            >
                                                                                <IconButton
                                                                                    onClick={() => handleDialog(true, {}, productStatus)}
                                                                                    disabled={permisions().filter((e) => e.name === 'Editar tipos de usuario').length == 0}
                                                                                >
                                                                                    <EditOutlined color="info" />
                                                                                </IconButton>
                                                                                <Switch
                                                                                    checked={productStatus.state}
                                                                                    onChange={(event) => putProductStatus({
                                                                                        ...productStatus,
                                                                                        state: event.target.checked,
                                                                                        userId: productStatus.userId.id,
                                                                                    })}
                                                                                    // id: user.id, state: event.target.checked, responsibleId: user.responsibleId.id
                                                                                    color="success"
                                                                                    size="small"
                                                                                // disabled={permisions().filter((e) => e.name === 'Eliminar tipos de usuario').length == 0}
                                                                                />
                                                                                <IconButton
                                                                                    onClick={() => deleteProductStatus(productStatus.id)}
                                                                                // disabled={permisions().filter((e) => e.name === 'Eliminar tipos de usuario').length == 0}
                                                                                >
                                                                                    <DeleteOutline color="error" />
                                                                                </IconButton>
                                                                            </Stack>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                        {
                                            openIndex == product.id &&
                                            <CreateProductStatus
                                                open={openDialog}
                                                handleClose={() => handleDialog(false, product)}
                                                item={itemEdit}
                                            />
                                        }
                                    </React.Fragment>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </TableContainer>
            <TablePagination
                component="div"
                count={allItems.length}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
});

ProductTable.propTypes = {
    allItems: PropTypes.array,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};