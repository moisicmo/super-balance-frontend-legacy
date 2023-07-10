import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from '../../services';
import {
    setAddKardexProduct,
} from '../../store/warehouse/warehouseSlices';
import Swal from 'sweetalert2';

export const useInputStore = () => {

    const dispatch = useDispatch();

    const postInput = async (info) => {
        try {
            const { data } = await cafeApi.post('/input/', info);
            console.log(data)
            dispatch(setAddKardexProduct({ kardexProduct: data.input }));
            Swal.fire('Recepción creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }


    return {
        //* Métodos
        postInput,
    }

}