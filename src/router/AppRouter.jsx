import { useEffect } from 'react';
import { useAuthStore } from '../hooks';
import { Layout } from '../views/admin/Layout';
import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardView } from '../views/admin/pages/dashboard';
import { ReportsView } from '../views/admin/pages/reports';
import { AuthPage } from '../views/admin/auth/AuthPage';

//module users
import { RolesView } from '../views/admin/pages/module.users/roles';
import { TypeUsersView } from '../views/admin/pages/module.users/typeUsers';
import { Usersview } from '../views/admin/pages/module.users/users';

//module warehouses
import { ProductsView } from '../views/admin/pages/module.warehouses/products';
import { WarehousesView } from '../views/admin/pages/module.warehouses/warehouses';
import { KardexProductsView } from '../views/admin/pages/module.warehouses/kardexProducts/KardexProductsView';
import { CustomersView } from '../views/admin/pages/module.customers/customers/CustomersView';
import { SalesView } from '../views/admin/pages/module.warehouses/sales/SalesView';
import { OrdersView } from '../views/admin/pages/module.warehouses/orders/OrdersView';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    };

    return (
        (status === 'not-authenticated') ?
            <AuthPage /> :
            <Layout>
                <Routes>
                    <Route path="/dashboardView" element={<DashboardView />} />
                    <Route path="/reportsView" element={<ReportsView />} />
                    {/* module warehouses */}
                    <Route path="/warehousesView" element={<WarehousesView />} />
                    <Route path="/productsView" element={<ProductsView />} />
                    <Route path="/movementsView" element={<KardexProductsView />} />
                    <Route path="/salesView" element={<SalesView />} />
                    <Route path="/ordersView" element={<OrdersView />} />
                    {/* module customers */}
                    <Route path="/customersView" element={<CustomersView />} />
                    <Route path="/creditsView" element={<TypeUsersView />} />
                    {/* module users */}
                    <Route path="/usersView" element={<Usersview />} />
                    <Route path="/typeUsersView" element={<TypeUsersView />} />
                    <Route path="/rolesView" element={<RolesView />} />

                    {/*  */}
                    <Route path="/*" element={<Navigate to={"/dashboardView"} />} />
                </Routes>
            </Layout>
    )
}
