import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from '../../services';
import { setRoles, setAddRole, setUpdateRole, setDeleteRole } from '../../store/user/userSlices';
import Swal from 'sweetalert2';

export const useRoleStore = () => {
    const dispatch = useDispatch();

    const getRole = async () => {
        const { data } = await cafeApi.get('/role');
        console.log(data)
        dispatch(setRoles({ roles: data.roles }));
    }
    const postRole = async (info) => {
        try {
            const { data } = await cafeApi.post(`/role/`, info);
            dispatch(setAddRole({ role: data.role }));
            Swal.fire('Rol creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const putRole = async (info) => {
        try {
            console.log(info)
            const { data } = await cafeApi.put(`/role/${info.id}`, info);
            dispatch(setUpdateRole({ role: data.role }));
            Swal.fire('Rol editado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const deleteRole = async (id) => {
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
                    const { data } = await cafeApi.delete(`/role/${id}`);
                    console.log(data)
                    dispatch(setDeleteRole({ id }));
                    Swal.fire(
                        'Eliminado',
                        'Rol eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'El rol esta a salvo :)',
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
        getRole,
        postRole,
        putRole,
        deleteRole,
    }

}