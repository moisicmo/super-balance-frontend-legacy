import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from '../../services';
import {
    setCategories,
    setAddCategory,
    setUpdateCategory,
    setDeleteCategory,
} from '../../store/warehouse/warehouseSlices';
import Swal from 'sweetalert2';

export const useCategoryStore = () => {

    const dispatch = useDispatch();

    const getCategories = async () => {
        const { data } = await cafeApi.get('/category/');
        console.log(data)
        dispatch(setCategories({ categories: data.categories }));
    }
    const postCategory = async (info) => {
        try {
            const { data } = await cafeApi.post('/category/', info);
            console.log(data)
            dispatch(setAddCategory({ category: data.category }));
            Swal.fire('Categoria creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putCategory = async (info) => {
        try {
            const { data } = await cafeApi.put(`/category/${info.id}`, info);
            console.log(data)
            dispatch(setUpdateCategory({ category: data.category }));
            Swal.fire('Categoria edutado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const deleteCategory = async (id) => {
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
                    const { data } = await cafeApi.delete(`/category/${id}`);
                    console.log(data)
                    dispatch(setDeleteCategory({ id }));
                    Swal.fire(
                        'Eliminado',
                        'Categoria eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'La categoria esta a salvo :)',
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
        getCategories,
        postCategory,
        putCategory,
        deleteCategory,
    }

}