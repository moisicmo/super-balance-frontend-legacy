import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from '../../services';
import { setPermissions } from '../../store/user/userSlices';

export const usePermisionStore = () => {

    const dispatch = useDispatch();

    const getPermisions = async () => {
        const { data } = await cafeApi.get('/permision/');
        console.log(data)
        dispatch(setPermissions({ permissions: data.permissions }));
    }


    return {
        //* Métodos
        getPermisions,
    }

}