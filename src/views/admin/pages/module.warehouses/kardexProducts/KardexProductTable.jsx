import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Checkbox,
    IconButton,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { useSelectorStore } from '../../../../../hooks';
import { SeverityPill } from '../../../../../components';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';

export const KardexProductTable = React.memo((props) => {
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
    return (
        <Card>
            <TableContainer>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table aria-label="a dense table">

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
                                    Sucursal
                                </TableCell>
                                <TableCell>
                                    Razón
                                </TableCell>
                                <TableCell>
                                    Producto
                                </TableCell>
                                <TableCell>
                                    Estado
                                </TableCell>
                                <TableCell>
                                    Detalle
                                </TableCell>
                                <TableCell>
                                    Cantidad
                                </TableCell>
                                <TableCell>
                                    Precio
                                </TableCell>
                                <TableCell>
                                    Stock
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((kardexProduct) => {
                                const isSelected = selected.includes(kardexProduct.id);
                                return (
                                    <TableRow
                                        hover
                                        key={kardexProduct.id}
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
                                                            itemSelect(kardexProduct)
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>
                                            {kardexProduct.warehouseId.name}
                                        </TableCell>
                                        <TableCell>
                                            {kardexProduct.modelRef == 'Inputs' ? 'Entrada' : 'Salida'}
                                        </TableCell>
                                        <TableCell>
                                            {kardexProduct.detail}
                                        </TableCell>
                                        <TableCell>
                                            {kardexProduct.inputOrOutput.productStatusId.productId.name}
                                        </TableCell>
                                        <TableCell>
                                            {kardexProduct.inputOrOutput.productStatusId.name}
                                        </TableCell>
                                        <TableCell>
                                            {kardexProduct.inputOrOutput.quatity}
                                        </TableCell>
                                        <TableCell>
                                            {kardexProduct.inputOrOutput.price}
                                        </TableCell>
                                        <TableCell>
                                            {kardexProduct.stock}
                                        </TableCell>


                                    </TableRow>
                                );
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

KardexProductTable.propTypes = {
    allItems: PropTypes.array,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};