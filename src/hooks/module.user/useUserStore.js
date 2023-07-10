import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from '../../services';
import { setUsers, setAddUser, setUpdateUser, setDeleteUser } from '../../store/user/userSlices';
import Swal from 'sweetalert2';

export const useUserStore = () => {

    const dispatch = useDispatch();

    const getUser = async () => {
        const { data } = await cafeApi.get('/user');
        console.log(data)
        dispatch(setUsers({ users: data.users }))
    }
    const postUser = async (info) => {
        try {
            const { data } = await cafeApi.post('/user/', info);
            console.log(data)
            dispatch(setAddUser({ user: data.user }));
            Swal.fire('Usuario creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const putUser = async (info) => {
        try {
            const { data } = await cafeApi.put(`/user/${info.id}`, info);
            console.log(data)
            dispatch(setUpdateUser({ user: data.user }));
            Swal.fire('Usuario editado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const deleteUser = async (id) => {
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
                    const { data } = await cafeApi.delete(`/user/${id}`);
                    console.log(data)
                    dispatch(setDeleteUser({ id }));
                    Swal.fire(
                        'Eliminado',
                        'Usuario eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'El uusario esta a salvo :)',
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
        getUser,
        postUser,
        putUser,
        deleteUser,
    }

}