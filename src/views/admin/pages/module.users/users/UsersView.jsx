import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, SvgIcon, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { Add } from "@mui/icons-material";
import { UserTable, CreateUser } from "./";
import { applyPagination } from "../../../../../utils/applyPagination";
import { useSelector } from "react-redux";
import { useRoleStore, useSelectorStore, useTypeUserStore, useUserStore, useWarehouseStore } from "../../../../../hooks";
import { ComponentInput } from "../../../../../components";
import { ShowWarehouses } from "./ShowWarehouses";

export const Usersview = () => {
    const { selectAll, clearSelect } = useSelectorStore();
    const { getUser, putUser, deleteUser } = useUserStore();
    const { getRole } = useRoleStore();
    const { getTypeUser } = useTypeUserStore();
    const { getWarehouses } = useWarehouseStore();

    const { users = [] } = useSelector((state) => state.users);
    // Obtener los tipos de usuarios
    useEffect(() => {
        getUser();
        getRole();
        getTypeUser();
        getWarehouses();
    }, []);
    // Obtener la lista paginada de typeUsers utilizando el hook useMemo
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [userList, setUserList] = useState([]);

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
        clearSelect();
        setItemEdit({});
        setopenDialog(value);
    }, []);

    // Definir el callback para editar un tipo de usuario
    const handleEdit = useCallback((item) => {
        clearSelect();
        selectAll(item.warehouses.map((e) => e.id));
        setopenDialog(true);
        setItemEdit(item);
    }, []);

    // Definir el estado y el callback para la búsqueda
    const [search, setSearch] = useState("");
    const onInputChange = useCallback(({ target }) => {
        setSearch(target.value.trim());
        setPage(0);
    }, []);

    // Actualizar la lista de users cuando cambie la búsqueda, la página o las filas por página
    useEffect(() => {
        if (search && search.trim() !== "") {
            const filteredUsers = users.filter((e) =>
                e.name.includes(search.trim())
            );
            const updateUserList = applyPagination(
                filteredUsers,
                page,
                rowsPerPage
            );
            setUserList(updateUserList);
        } else {
            const defaultUserList = applyPagination(
                users,
                page,
                rowsPerPage
            );
            setUserList(defaultUserList);
        }
    }, [users, page, rowsPerPage, search]);

    const [opendrawer, setOpendrawer] = useState({ state: false, items: [] });
    const handleWarehouses = useCallback((state, items) => {
        setOpendrawer({ state, items })
    }, [],
    )
    const { data } = useSelector((state) => state.auth);
    const permisions = () => {
        return data ? data.roleId.permisionIds : [];
    };
    return (
        <>
            <Box
                component="main"
            >
                <Container maxWidth="xl">
                    <Stack spacing={1}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Stack spacing={1}>
                                <Typography variant="h5">
                                    Usuarios
                                </Typography>
                            </Stack>
                            <div>
                                <Button
                                    onClick={() => handleDialog(true)}
                                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                                    variant="contained"
                                    disabled={permisions().filter((e) => e.name === 'Crear usuarios').length == 0}
                                >
                                    Nuevo usuario
                                </Button>
                            </div>
                        </Stack>
                        <ComponentInput
                            type="text"
                            label="Buscar Usuario"
                            name="search"
                            value={search}
                            onChange={onInputChange}
                        />
                        <UserTable
                            count={users.length}
                            items={userList}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleEdit={handleEdit}
                            onEdit={putUser}
                            onDelete={deleteUser}
                            onviewWarehouses={(items) => handleWarehouses(true, items)}
                        />
                    </Stack>
                </Container>
            </Box>
            <CreateUser
                open={openDialog}
                handleClose={() => handleDialog(false)}
                item={itemEdit}
            />
            <ShowWarehouses
                open={opendrawer.state}
                handleClose={() => handleWarehouses(false, [])}
                items={opendrawer.items}
            />
        </>
    )
}
