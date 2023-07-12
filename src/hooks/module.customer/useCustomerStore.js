import { useDispatch } from 'react-redux';
import { cafeApi } from '../../services';
import { setCustomers, sedAddCustomer, setUpdateCustomer, setDeleteCustomer } from '../../store/customer/customerSlices';
import Swal from 'sweetalert2';

export const useCustomerStore = () => {

    const dispatch = useDispatch();

    const getCustomers = async () => {
        const { data } = await cafeApi.get('/customer');
        console.log(data)
        dispatch(setCustomers({ customers: data.customers }))
    }
    const postCustomer = async (info) => {
        try {
            const { data } = await cafeApi.post('/customer/', info);
            console.log(data)
            dispatch(sedAddCustomer({ customer: data.customer }));
            Swal.fire('Cliente creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const putCustomer = async (info) => {
        try {
            const { data } = await cafeApi.put(`/customer/${info.id}`, info);
            console.log(data)
            dispatch(setUpdateCustomer({ customer: data.customer }));
            Swal.fire('Cliente editado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const deleteCustomer = async (id) => {
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
                    const { data } = await cafeApi.delete(`/customer/${id}`);
                    console.log(data)
                    dispatch(setDeleteCustomer({ id }));
                    Swal.fire(
                        'Eliminado',
                        'Cliente eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'El Cliente esta a salvo :)',
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
        getCustomers,
        postCustomer,
        putCustomer,
        deleteCustomer,
    }

}