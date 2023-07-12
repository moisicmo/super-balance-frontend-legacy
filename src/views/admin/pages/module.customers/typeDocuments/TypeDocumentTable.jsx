import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { useSelectorStore } from '../../../../../hooks';
import React from 'react';
import { useSelector } from 'react-redux';

export const TypeDocumentTable = React.memo((props) => {
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
                                    Nombre
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((typeDocument) => {
                                const isSelected = selected.includes(typeDocument.id);
                                return (
                                    <TableRow
                                        hover
                                        key={typeDocument.id}
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
                                                            itemSelect(typeDocument)
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>
                                            {typeDocument.name}
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

TypeDocumentTable.propTypes = {
    allItems: PropTypes.array,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};