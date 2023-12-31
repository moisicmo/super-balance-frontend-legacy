import { configureStore } from '@reduxjs/toolkit';
import { selectionSlice, authSlice, uiSlice, eventSlice, userSlice, reportSlice, warehouseSlice, customerSlice } from './';

export const store = configureStore({
    reducer: {
        selections: selectionSlice.reducer,

        auth: authSlice.reducer,

        ui: uiSlice.reducer,
        events: eventSlice.reducer,
        users: userSlice.reducer,
        warehouses: warehouseSlice.reducer,
        customers: customerSlice.reducer,
        reports: reportSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})