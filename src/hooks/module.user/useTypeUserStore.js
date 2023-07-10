import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from '../../services';
import { setTypeUsers, setAddTypeUser, setUpdateTypeUser, setDeleteTypeUser } from '../../store/user/userSlices';
import Swal from 'sweetalert2';

export const useTypeUserStore = () => {
    const dispatch = useDispatch();

    const getTypeUser = async () => {
        const { data } = await cafeApi.get('/typeuser/');
        console.log(data)
        dispatch(setTypeUsers({ typeUsers: data.typeUsers }));
    }
    const postTypeUser = async (info) => {
        try {
            const { data } = await cafeApi.post(`/typeuser/`, info);
            console.log(data)
            dispatch(setAddTypeUser({ typeUser: data.typeUser }));
            Swal.fire('Tipo de usuario creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putTypeUser = async (info) => {
        try {
            const { data } = await cafeApi.put(`/typeuser/${info.id}`, info);
            console.log(data)
            dispatch(setUpdateTypeUser({ typeUser: data.typeUser }));
            Swal.fire('Se modifico el tipo de usuario', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const deleteTypeUser = async (id) => {
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
                    const { data } = await cafeApi.delete(`/typeuser/${id}`);
                    console.log(data)
                    dispatch(setDeleteTypeUser({ id }));
                    Swal.fire(
                        'Eliminado',
                        'Tipo de usuario eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'El tipo de usuario esta a salvo :)',
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
        getTypeUser,
        postTypeUser,
        putTypeUser,
        deleteTypeUser,
    }

}