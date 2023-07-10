import { createSlice } from '@reduxjs/toolkit';

export const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState: {
        categories: [],
        warehouses: [],
        measurementUnits: [],
        products: [],
        productStatus: [],
        kardexProducts: [],
    },
    reducers: {
        //warehouse
        setWarehouses: (state, action) => {
            state.warehouses = action.payload.warehouses;
        },
        sedAddWarehouse: (state, action) => {
            state.warehouses = [...state.warehouses, action.payload.warehouse];
        },
        setUpdateWarehouse: (state, action) => {
            state.warehouses = [...state.warehouses.map((e) => {
                if (e.id === action.payload.warehouse.id) {
                    return {
                        ...action.payload.warehouse
                    }
                }
                return e
            })];
        },
        setDeleteWarehouse: (state, action) => {
            state.warehouses = [...state.warehouses.filter(e => e.id != action.payload.id)];
        },
        //measurement units
        setMeasurementUnits: (state, action) => {
            state.measurementUnits = action.payload.measurementUnits;
        },
        setAddUnitMeasurement: (state, action) => {
            state.measurementUnits = [...state.measurementUnits, action.payload.unitMeasurement];
        },
        setUpdateUnitMeasurement: (state, action) => {
            state.measurementUnits = [...state.measurementUnits.map((e) => {
                if (e.id === action.payload.unitMeasurement.id) {
                    return {
                        ...action.payload.unitMeasurement
                    }
                }
                return e
            })];
        },
        setDeleteUnitMeasurement: (state, action) => {
            state.measurementUnits = [...state.measurementUnits.filter(e => e.id != action.payload.id)];
        },
        //categories
        setCategories: (state, action) => {
            state.categories = action.payload.categories;
        },
        setAddCategory: (state, action) => {
            state.categories = [...state.categories, action.payload.category];
        },
        setUpdateCategory: (state, action) => {
            state.categories = [...state.categories.map((e) => {
                if (e.id === action.payload.category.id) {
                    return {
                        ...action.payload.category
                    }
                }
                return e
            })];
        },
        setDeleteCategory: (state, action) => {
            state.categories = [...state.categories.filter(e => e.id != action.payload.id)];
        },
        //products
        setProducts: (state, action) => {
            state.products = action.payload.products;
        },
        setAddProduct: (state, action) => {
            state.products = [...state.products, action.payload.product];
        },
        setUpdateProduct: (state, action) => {
            state.products = [...state.products.map((e) => {
                if (e.id === action.payload.product.id) {
                    return {
                        ...action.payload.product
                    }
                }
                return e
            })];
        },
        setDeleteProduct: (state, action) => {
            state.products = [...state.products.filter(e => e.id != action.payload.id)];
        },
        //product status
        setProductStatus: (state, action) => {
            state.productStatus = action.payload.productStatus;
        },
        setAddProductStatus: (state, action) => {
            state.products = [...state.products.map((e) => {
                if (e.id === action.payload.product.id) {
                    return {
                        ...action.payload.product
                    }
                }
                return e
            })];
        },
        setUpdateProductStatus: (state, action) => {
            state.products = [...state.products.map((e) => {
                if (e.id === action.payload.product.id) {
                    return {
                        ...action.payload.product
                    }
                }
                return e
            })];
        },
        setDeleteProductStatus: (state, action) => {
            state.products = [...state.products.map((e) => {
                if (e.id === action.payload.product.id) {
                    return {
                        ...action.payload.product
                    }
                }
                return e
            })];
        },
        //inputs
        //outputs
        //kardex products
        setKardexProduct: (state, action) => {
            state.kardexProducts = action.payload.kardexProducts;
        },
        setAddKardexProduct: (state, action) => {
            state.kardexProducts = [...state.kardexProducts, action.payload.kardexProduct];
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    //warehouses
    setWarehouses,
    sedAddWarehouse,
    setUpdateWarehouse,
    setDeleteWarehouse,
    //measurement units
    setMeasurementUnits,
    setAddUnitMeasurement,
    setUpdateUnitMeasurement,
    setDeleteUnitMeasurement,
    //categories
    setCategories,
    setAddCategory,
    setUpdateCategory,
    setDeleteCategory,
    //products
    setProducts,
    setAddProduct,
    setUpdateProduct,
    setDeleteProduct,
    //product status
    setProductStatus,
    setAddProductStatus,
    setUpdateProductStatus,
    setDeleteProductStatus,
    //kardex
    setKardexProduct,
    setAddKardexProduct,

} = warehouseSlice.actions;