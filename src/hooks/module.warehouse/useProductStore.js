import { useDispatch } from 'react-redux';
import { cafeApi } from '../../services';
import {
    setProducts,
    setAddProduct,
    setUpdateProduct,
    setDeleteProduct,
} from '../../store/warehouse/warehouseSlices';
import Swal from 'sweetalert2';

export const useProductStore = () => {

    const dispatch = useDispatch();

    const getProducts = async () => {
        const { data } = await cafeApi.get('/product/');
        console.log(data)
        dispatch(setProducts({ products: data.products }));
    }
    const postProduct = async (info) => {
        try {
            const { data } = await cafeApi.post('/product/', info);
            console.log(data)
            dispatch(setAddProduct({ product: data.product }));
            Swal.fire('Producto creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putProduct = async (info) => {
        try {
            const { data } = await cafeApi.put(`/product/${info.id}`, info);
            console.log(data)
            dispatch(setUpdateProduct({ product: data.product }));
            Swal.fire('Producto editado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const deleteProduct = async (id) => {
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
                    const { data } = await cafeApi.delete(`/product/${id}`);
                    console.log(data)
                    dispatch(setDeleteProduct({ id }));
                    Swal.fire(
                        'Eliminado',
                        'El producto eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'El producto esta a salvo :)',
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
        getProducts,
        postProduct,
        putProduct,
        deleteProduct,
    }

}