import { CalendarMonth, ChecklistOutlined, CompareArrowsOutlined, DiningOutlined, Dns, Event, Hail, IndeterminateCheckBox, ListAltOutlined, MenuOutlined, MergeType, PermIdentity, PermIdentitySharp, Person2Outlined, PointOfSaleOutlined, PortraitOutlined, RollerShades, StoreOutlined, TypeSpecimen, TypeSpecimenTwoTone, Wifi, Work } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

export const items = (data) => {
    console.log(data)
    const permissions = () => {
        return data ? data.roleId.permisionIds : [];
    };
    const isSuperUser = () => {
        return data ? data.isSuperUser : false;
    };
    return [
        {
            title: 'Principal',
            subitems: [
                {
                    title: 'Descipción General',
                    path: '/dashboardView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <Wifi />
                        </SvgIcon>
                    ),
                },
            ],
        },


        // Filtrar y generar elementos basados en las condiciones
        (isSuperUser() || permissions().filter(
            (e) =>
                e.category === 'Sucursales' ||
                e.category === 'Unidades de medida' ||
                e.category === 'Categorias'
        ).length > 0) && {
            title: 'Gestión de Inventario',
            subitems: [
                (isSuperUser() || permissions().filter((e) => e.category === 'Sucursales').length > 0) && {
                    title: 'Sucursales',
                    path: '/warehousesView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <StoreOutlined />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Productos').length > 0) && {
                    title: 'Gestión de Productos',
                    path: '/productsView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <IndeterminateCheckBox />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Productos').length > 0) && {
                    title: 'Movimientos de productos',
                    path: '/movementsView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <CompareArrowsOutlined />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Productos').length > 0) && {
                    title: 'Punto de venta',
                    path: '/salesView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <PointOfSaleOutlined />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Productos').length > 0) && {
                    title: 'Pedidos',
                    path: '/ordersView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <ListAltOutlined />
                        </SvgIcon>
                    ),
                },
            ].filter(Boolean),
        },
        (isSuperUser() || permissions().filter(
            (e) =>
                e.category === 'Usuarios' ||
                e.category === 'Tipos de usuario' ||
                e.category === 'Roles' ||
                e.category === 'Permisos'
        ).length > 0) && {
            title: 'Gestión de Clientes',
            subitems: [
                (isSuperUser() || permissions().filter((e) => e.category === 'Usuarios').length > 0) && {
                    title: 'Clientes',
                    path: '/customersView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <Person2Outlined />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Tipos de usuario').length > 0) && {
                    title: 'Creditos',
                    path: '/creditsView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <PortraitOutlined />
                        </SvgIcon>
                    ),
                },
            ].filter(Boolean),
        },
        (isSuperUser() || permissions().filter(
            (e) =>
                e.category === 'Usuarios' ||
                e.category === 'Tipos de usuario' ||
                e.category === 'Roles' ||
                e.category === 'Permisos'
        ).length > 0) && {
            title: 'Gestión de Personal',
            subitems: [
                (isSuperUser() || permissions().filter((e) => e.category === 'Usuarios').length > 0) && {
                    title: 'Usuarios',
                    path: '/usersView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <Person2Outlined />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Tipos de usuario').length > 0) && {
                    title: 'Tipos de usuario',
                    path: '/typeUsersView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <PortraitOutlined />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Roles').length > 0) && {
                    title: 'Roles',
                    path: '/rolesView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <Work />
                        </SvgIcon>
                    ),
                },
            ].filter(Boolean),
        },

        (isSuperUser() || permissions().filter((e) =>
            e.category === 'Reportes'
        ).length > 0) && {
            title: 'Reportes',
            subitems: [
                (isSuperUser() || permissions().filter((e) => e.category === 'Reportes').length > 0) && {
                    title: 'Reportes',
                    path: '/reportsView',
                    icon: (
                        <SvgIcon fontSize="small">
                            <MenuOutlined />
                        </SvgIcon>
                    ),
                },
            ].filter(Boolean),
        },
    ].filter(Boolean);
}

