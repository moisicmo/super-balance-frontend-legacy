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

export const UserTable = (props) => {
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
                                    Apellido
                                </TableCell>
                                <TableCell>
                                    Correo
                                </TableCell>
                                <TableCell>
                                    Rol
                                </TableCell>
                                <TableCell>
                                    Tipo de usuario
                                </TableCell>
                                <TableCell>
                                    Sucursales
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
                            {items.map((user) => {
                                return (
                                    <TableRow
                                        hover
                                        key={user.id}
                                    >
                                        <TableCell>
                                            {user.name}
                                        </TableCell>
                                        <TableCell>
                                            {user.lastName}
                                        </TableCell>
                                        <TableCell>
                                            {user.email}
                                        </TableCell>
                                        <TableCell>
                                            {user.roleId.name}
                                        </TableCell>
                                        <TableCell>
                                            {user.typeUserId.name}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => onviewWarehouses(user.warehouses)}
                                            >
                                                <RemoveRedEyeOutlined color="info" />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <SeverityPill color={user.state ? 'success' : 'error'}>
                                                {user.state ? 'Activo' : 'Inactivo'}
                                            </SeverityPill>
                                        </TableCell>
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton
                                                    onClick={() => handleEdit(user)}
                                                    disabled={permisions().filter((e) => e.name === 'Editar usuarios').length == 0}
                                                >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <Switch
                                                    checked={user.state}
                                                    onChange={(event) => onEdit({ id: user.id, state: event.target.checked, responsibleId: user.responsibleId.id })}
                                                    color="success"
                                                    size="small"
                                                    disabled={permisions().filter((e) => e.name === 'Eliminar usuarios').length == 0}
                                                />
                                                <IconButton
                                                    onClick={() => onDelete(user.id)}
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

UserTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
};
