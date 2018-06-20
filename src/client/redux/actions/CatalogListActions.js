
import { API, HTTP_STATUS_CODES } from '../../constants';
import api from '../../api';

export const CATALOG_LIST = 'CATALOG_LIST.action';
export const CATALOG_LIST_CREATE = 'CATALOG_LIST.create';
export const CATALOG_LIST_FETCHING = 'CATALOG_LIST.fetching';
export const CATALOG_LIST_ERROR = 'CATALOG_LIST.error';
export const CATALOG_LIST_CLEAR = 'CATALOG_LIST.clear';

export const PRODUCT_CREATE = 'PRODUCT.create';
export const PRODUCT_UPDATE = 'PRODUCT.update';

export function getCatalogList(url = API.CATALOG_LIST, query = null) {
    return (dispatch) => {
        dispatch({ type: CATALOG_LIST_FETCHING });

        const onError = (response) => {
            console.error('getCatalogList()', 'onError([ response ])', response);
            dispatch({ type: CATALOG_LIST_ERROR, response });
        };
        const onSuccess = (response) => {
            const { status, data } = response;
            if (status === HTTP_STATUS_CODES.OK) {
                dispatch({ type: CATALOG_LIST, data });
            } else {
                onError({ message: 'Error: Incorrect http status code or dataset is empty' });
            }
        };

        return api.get(url, query).then(onSuccess).catch(onError);
    };
}

export function addProduct(catalogId, product) {
    return (dispatch) => {
        dispatch({ type: PRODUCT_CREATE, catalogId, product});
    };
}

export function editProduct(catalogId, key, columnName, value) {
    return (dispatch) => {
        dispatch({ type: PRODUCT_UPDATE, catalogId, key, columnName, value});
    };
}