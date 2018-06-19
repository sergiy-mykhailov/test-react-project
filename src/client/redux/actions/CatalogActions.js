
import { API, HTTP_STATUS_CODES } from '../../constants';
import api from '../../api';

export const CATALOG = 'CATALOG.action';
export const CATALOG_CREATE = 'CATALOG.create';
export const CATALOG_FETCHING = 'CATALOG.fetching';
export const CATALOG_ERROR = 'CATALOG.error';
export const CATALOG_CLEAR = 'CATALOG.clear';

export function getCatalog(url = API.CATALOG, query = null) {
    return (dispatch) => {
        dispatch({ type: CATALOG_FETCHING });

        const onError = (response) => {
            console.error('getCatalog()', 'onError([ response ])', response);
            dispatch({ type: CATALOG_ERROR, response });
        };
        const onSuccess = (response) => {
            const { status, data } = response;
            if (status === HTTP_STATUS_CODES.OK) {
                dispatch({ type: CATALOG, data });
            } else {
                onError({ message: 'Error: Incorrect http status code or dataset is empty' });
            }
        };

        return api.get(url, query).then(onSuccess).catch(onError);
    };
}
