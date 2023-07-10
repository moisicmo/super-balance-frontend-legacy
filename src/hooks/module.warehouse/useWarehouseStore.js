import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from '../../services';
import {
    setWarehouses,
    sedAddWarehouse,
    setUpdateWarehouse,
    setDeleteWarehouse,
} from '../../store/warehouse/warehouseSlices';
import Swal from 'sweetalert2';

export const useWarehouseStore = () => {

    const dispatch = useDispatch();

    const getWarehouses = async () => {
        const { data } = await cafeApi.get('/warehouse/');
        console.log(data)
        dispatch(setWarehouses({ warehouses: data.warehouses }));
    }
    const postWarehouse = async (info) => {
        try {
            const { data } = await cafeApi.post('/warehouse/', info);
            console.log(data)
            dispatch(sedAddWarehouse({ warehouse: data.warehouse }));
            Swal.fire('Sucursal creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putWarehouse = async (info) => {
        try {
            const { data } = await cafeApi.put(`/warehouse/${info.id}`, info);
            console.log(data)
            dispatch(setUpdateWarehouse({ warehouse: data.warehouse }));
            Swal.fire('Sucursal edutado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const deleteWarehouse = async (id) => {
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
                    const { data } = await cafeApi.delete(`/warehouse/${id}`);
                    dispatch(setDeleteWarehouse({ id }));
                    console.log(data)
                    Swal.fire(
                        'Eliminado',
                        'Sucursal eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'El sucursal esta a salvo :)',
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
        getWarehouses,
        postWarehouse,
        putWarehouse,
        deleteWarehouse
    }

}