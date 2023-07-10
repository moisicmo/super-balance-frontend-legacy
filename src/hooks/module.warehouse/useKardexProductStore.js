import { useDispatch } from 'react-redux';
import { cafeApi } from '../../services';
import {
    setKardexProduct,
} from '../../store/warehouse/warehouseSlices';

export const useKardexProductStore = () => {

    const dispatch = useDispatch();

    const getAllKardexProducts = async () => {
        const { data } = await cafeApi.get('/kardexProduct/');
        console.log(data)
        dispatch(setKardexProduct({ kardexProducts: data.kardexProducts }));
    }
    const getKardexProductByProduct = async (id) => {
        const { data } = await cafeApi.get(`/kardexProduct/${id}`);
        console.log(data)
        dispatch(setKardexProduct({ kardexProducts: data.kardexProducts }));
    }


    return {
        //* Métodos
        getAllKardexProducts,
        getKardexProductByProduct
    }

}