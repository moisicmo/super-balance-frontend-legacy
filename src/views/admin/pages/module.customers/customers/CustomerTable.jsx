import PropTypes from 'prop-types';
import {
    Box,
    Card,
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
import { SeverityPill } from '../../../../../components';
import { DeleteOutline, EditOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export const CustomerTable = (props) => {
    const {
        count = 0,
        items = [],
        onPageChange = () => { },
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
        handleEdit,
        onEdit,
        onDelete,
        onviewWarehouses,
    } = props;

    const { data } = useSelector((state) => state.auth);
    const permisions = () => {
        return data ? data.roleId.permisionIds : [];
    };
    return (
        <Card>
            <TableContainer>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                <TableCell>
                                    Correo
                                </TableCell>
                                <TableCell>
                                    Teléfono
                                </TableCell>
                                <TableCell>
                                    Tipo de documento
                                </TableCell>
                                <TableCell>
                                    Num. documento
                                </TableCell>
                                <TableCell>
                                    Estado
                                </TableCell>
                                <TableCell>
                                    Acciones
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((customer) => {
                                return (
                                    <TableRow
                                        hover
                                        key={customer.id}
                                    >
                                        <TableCell>
                                            {customer.name}
                                        </TableCell>
                                        <TableCell>
                                            {customer.email}
                                        </TableCell>
                                        <TableCell>
                                            {customer.phone}
                                        </TableCell>
                                        <TableCell>
                                            {customer.typeDocumentId.name}
                                        </TableCell>
                                        <TableCell>
                                            {customer.numberDocument}
                                        </TableCell>
                                        <TableCell>
                                            <SeverityPill color={customer.state ? 'success' : 'error'}>
                                                {customer.state ? 'Activo' : 'Inactivo'}
                                            </SeverityPill>
                                        </TableCell>
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton
                                                    onClick={() => handleEdit(customer)}
                                                    disabled={permisions().filter((e) => e.name === 'Editar usuarios').length == 0}
                                                >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <Switch
                                                    checked={customer.state}
                                                    onChange={(event) => onEdit({ id: customer.id, state: event.target.checked, responsibleId: customer.responsibleId.id })}
                                                    color="success"
                                                    size="small"
                                                    disabled={permisions().filter((e) => e.name === 'Eliminar usuarios').length == 0}
                                                />
                                                <IconButton
                                                    onClick={() => onDelete(customer.id)}
                                                    disabled={permisions().filter((e) => e.name === 'Eliminar usuarios').length == 0}
                                                >
                                                    <DeleteOutline color="error" />
                                                </IconButton>
                                            </Stack>
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
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

CustomerTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
};
