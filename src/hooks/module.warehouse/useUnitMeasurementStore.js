import { useDispatch } from 'react-redux';
import { cafeApi } from '../../services';
import {
    setMeasurementUnits,
    setAddUnitMeasurement,
    setUpdateUnitMeasurement,
    setDeleteUnitMeasurement,
} from '../../store/warehouse/warehouseSlices';
import Swal from 'sweetalert2';

export const useUnitMeasurementStore = () => {

    const dispatch = useDispatch();

    const getMeasurementUnits = async () => {
        const { data } = await cafeApi.get('/unitMeasurement/');
        console.log(data)
        dispatch(setMeasurementUnits({ measurementUnits: data.measurementUnits }));
    }
    const postUnitMeasurement = async (info) => {
        try {
            const { data } = await cafeApi.post('/unitMeasurement/', info);
            console.log(data)
            dispatch(setAddUnitMeasurement({ unitMeasurement: data.unitMeasurement }));
            Swal.fire('Unidad de medida creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putUnitMeasurement = async (info) => {
        try {
            const { data } = await cafeApi.put(`/unitMeasurement/${info.id}`, info);
            console.log(data)
            dispatch(setUpdateUnitMeasurement({ unitMeasurement: data.unitMeasurement }));
            Swal.fire('Unidad de medida editado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const deleteUnitMeasurement = async (id) => {
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
                    const { data } = await cafeApi.delete(`/unitMeasurement/${id}`);
                    console.log(data)
                    dispatch(setDeleteUnitMeasurement({ id }));
                    Swal.fire(
                        'Eliminado',
                        'Unidad de medida eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'La Unidad de medida esta a salvo :)',
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
        getMeasurementUnits,
        postUnitMeasurement,
        putUnitMeasurement,
        deleteUnitMeasurement,
    }

}