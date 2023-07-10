import { useDispatch } from 'react-redux';
import { cafeApi } from '../../services';
import {
    setProductStatus,
    setAddProductStatus,
    setUpdateProductStatus,
    setDeleteProductStatus,
} from '../../store/warehouse/warehouseSlices';
import Swal from 'sweetalert2';

export const useProductStatusStore = () => {

    const dispatch = useDispatch();

    const getProductStatus = async () => {
        const { data } = await cafeApi.get('/productStatus/');
        console.log(data)
        dispatch(setProductStatus({ productStatus: data.productStatus }));
    }
    const postProductStatus = async (info) => {
        try {
            const { data } = await cafeApi.post('/productStatus/', info);
            console.log(data)
            dispatch(setAddProductStatus({ product: data.product }));
            Swal.fire('Estado del Producto creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putProductStatus = async (info) => {
        try {
            const { data } = await cafeApi.put(`/productStatus/${info.id}`, info);
            console.log(data)
            dispatch(setUpdateProductStatus({ product: data.product }));
            Swal.fire('Estado del Producto editado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const deleteProductStatus = async (id) => {
        try {
            Swal.fire({
                title: '¿Estas seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!',
                cancelButtonText: '¡No, cancelar!',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await cafeApi.delete(`/productStatus/${id}`);
                    console.log(data)
                    dispatch(setDeleteProductStatus({ product: data.product }));
                    Swal.fire(
                        'Eliminado',
                        'Estado del Producto eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'El estado del Producto esta a salvo :)',
                        'error'
                    )
                }
            });
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }


    return {
        //* Métodos
        getProductStatus,
        postProductStatus,
        putProductStatus,
        deleteProductStatus,
    }

}