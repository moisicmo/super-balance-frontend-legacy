import { useDispatch } from 'react-redux';
import { cafeApi } from '../../services';
import { setTypeDocuments } from '../../store/customer/customerSlices';
export const useTypeDocumentStore = () => {

    const dispatch = useDispatch();

    const getTypeDocuments = async () => {
        const { data } = await cafeApi.get('/typeDocument');
        console.log(data)
        dispatch(setTypeDocuments({ typeDocuments: data.typeDocuments }))
    }

    return {
        //* Métodos
        getTypeDocuments,
    }

}